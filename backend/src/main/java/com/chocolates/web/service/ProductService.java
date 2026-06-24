package com.chocolates.web.service;

import com.chocolates.web.dto.request.ProductRequest;
import com.chocolates.web.dto.response.PagedResponse;
import com.chocolates.web.dto.response.ProductImageResponse;
import com.chocolates.web.dto.response.ProductResponse;
import com.chocolates.web.dto.response.TagResponse;
import com.chocolates.web.entity.Category;
import com.chocolates.web.entity.Product;
import com.chocolates.web.entity.ProductImage;
import com.chocolates.web.entity.Tag;
import com.chocolates.web.repository.CategoryRepository;
import com.chocolates.web.repository.ProductImageRepository;
import com.chocolates.web.repository.ProductRepository;
import com.chocolates.web.repository.TagRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;
    private final ProductImageRepository productImageRepository;

    @Value("${app.upload.dir:uploads}")
    private String uploadDir;

    public PagedResponse<ProductResponse> getPublicProducts(int page, int size, Long categoryId, String search) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Specification<Product> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            predicates.add(cb.equal(root.get("status"), "ACTIVE"));
            if (categoryId != null) {
                predicates.add(cb.equal(root.get("categoryId"), categoryId));
            }
            if (search != null && !search.isBlank()) {
                String pattern = "%" + search.toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("name")), pattern),
                        cb.like(cb.lower(root.get("shortDescription")), pattern),
                        cb.like(cb.lower(root.get("fullDescription")), pattern)
                ));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
        Page<Product> productPage = productRepository.findAll(spec, pageable);
        return toPagedResponse(productPage);
    }

    @Transactional
    public ProductResponse getProductBySlug(String slug) {
        Product product = productRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con slug: " + slug));
        product.setViewsCount(product.getViewsCount() == null ? 1 : product.getViewsCount() + 1);
        productRepository.save(product);
        return toProductResponse(product);
    }

    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));
        return toProductResponse(product);
    }

    public List<ProductResponse> getFeaturedProducts() {
        List<Product> products = productRepository.findByIsFeaturedTrueAndStatus("ACTIVE");
        return products.stream().map(this::toProductResponse).collect(Collectors.toList());
    }

    public List<ProductResponse> getTopLikedProducts(int limit) {
        Pageable pageable = PageRequest.of(0, limit);
        return productRepository.findAll(pageable).stream()
                .filter(p -> "ACTIVE".equals(p.getStatus()))
                .sorted((a, b) -> Integer.compare(
                        b.getLikesCount() == null ? 0 : b.getLikesCount(),
                        a.getLikesCount() == null ? 0 : a.getLikesCount()))
                .limit(limit)
                .map(this::toProductResponse)
                .collect(Collectors.toList());
    }

    public List<ProductResponse> getTopViewedProducts(int limit) {
        List<Product> products = productRepository.findTop10ByOrderByViewsCountDesc();
        return products.stream()
                .filter(p -> "ACTIVE".equals(p.getStatus()))
                .limit(limit)
                .map(this::toProductResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public ProductResponse likeProduct(Long productId, String sessionId, String ipAddress, Long userId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + productId));
        int currentLikes = product.getLikesCount() == null ? 0 : product.getLikesCount();
        product.setLikesCount(currentLikes + 1);
        productRepository.save(product);
        return toProductResponse(product);
    }

    public List<ProductResponse> getRelatedProducts(Long productId, int limit) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + productId));
        if (product.getCategoryId() == null) {
            return Collections.emptyList();
        }
        List<Product> related = productRepository.findByCategoryId(product.getCategoryId());
        return related.stream()
                .filter(p -> !p.getId().equals(productId) && "ACTIVE".equals(p.getStatus()))
                .limit(limit)
                .map(this::toProductResponse)
                .collect(Collectors.toList());
    }

    public PagedResponse<ProductResponse> getAllProducts(int page, int size, String status) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Product> productPage;
        if (status != null && !status.isBlank()) {
            productPage = productRepository.findAll((Specification<Product>) (root, query, cb) ->
                    cb.equal(root.get("status"), status), pageable);
        } else {
            productPage = productRepository.findAll(pageable);
        }
        return toPagedResponse(productPage);
    }

    @Transactional
    public ProductResponse createProduct(ProductRequest request) {
        if (productRepository.findByCode(request.getCode()).isPresent()) {
            throw new RuntimeException("Ya existe un producto con el código: " + request.getCode());
        }
        Product product = Product.builder()
                .name(request.getName())
                .code(request.getCode())
                .slug(request.getName().toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("^-|-$", ""))
                .categoryId(request.getCategoryId())
                .shortDescription(request.getShortDescription())
                .fullDescription(request.getFullDescription())
                .ingredients(request.getIngredients())
                .nutritionalInfo(withJsonbDefault(request.getNutritionalInfo()))
                .referencePrice(request.getReferencePrice())
                .discountPrice(request.getDiscountPrice())
                .currency(request.getCurrency() != null ? request.getCurrency() : "PEN")
                .stock(request.getStock() != null ? request.getStock() : 0)
                .weightGrams(request.getWeightGrams())
                .isFeatured(request.getIsFeatured() != null ? request.getIsFeatured() : false)
                .status(request.getStatus() != null ? request.getStatus() : "DRAFT")
                .videoUrl(request.getVideoUrl())
                .metaTitle(request.getMetaTitle())
                .metaDescription(request.getMetaDescription())
                .likesCount(0)
                .viewsCount(0)
                .salesCount(0)
                .build();
        if (request.getTagIds() != null) {
            Set<Tag> tags = new HashSet<>(tagRepository.findAllById(request.getTagIds()));
            product.setTags(tags);
        }
        Product saved = productRepository.save(product);
        return toProductResponse(saved);
    }

    @Transactional
    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));
        product.setName(request.getName());
        product.setCode(request.getCode());
        product.setCategoryId(request.getCategoryId());
        product.setShortDescription(request.getShortDescription());
        product.setFullDescription(request.getFullDescription());
        product.setIngredients(request.getIngredients());
        product.setNutritionalInfo(withJsonbDefault(request.getNutritionalInfo()));
        product.setReferencePrice(request.getReferencePrice());
        product.setDiscountPrice(request.getDiscountPrice());
        product.setCurrency(request.getCurrency());
        product.setStock(request.getStock());
        product.setWeightGrams(request.getWeightGrams());
        product.setIsFeatured(request.getIsFeatured());
        product.setStatus(request.getStatus());
        product.setVideoUrl(request.getVideoUrl());
        product.setMetaTitle(request.getMetaTitle());
        product.setMetaDescription(request.getMetaDescription());
        if (request.getTagIds() != null) {
            Set<Tag> tags = new HashSet<>(tagRepository.findAllById(request.getTagIds()));
            product.setTags(tags);
        }
        Product saved = productRepository.save(product);
        return toProductResponse(saved);
    }

    @Transactional
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));
        productRepository.delete(product);
    }

    @Transactional
    public ProductResponse toggleStatus(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));
        if ("ACTIVE".equals(product.getStatus())) {
            product.setStatus("INACTIVE");
        } else {
            product.setStatus("ACTIVE");
            product.setPublishedAt(LocalDateTime.now());
        }
        Product saved = productRepository.save(product);
        return toProductResponse(saved);
    }

    @Transactional
    public ProductImageResponse uploadImage(Long id, MultipartFile file) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));
        String url = saveFile(file);
        ProductImage image = ProductImage.builder()
                .productId(id)
                .url(url)
                .isPrimary(true)
                .sortOrder(0)
                .fileSize(file.getSize())
                .mimeType(file.getContentType())
                .build();
        ProductImage saved = productImageRepository.save(image);
        return ProductImageResponse.builder()
                .id(saved.getId())
                .productId(saved.getProductId())
                .imageUrl(saved.getUrl())
                .altText(saved.getAltText())
                .sortOrder(saved.getSortOrder())
                .isPrimary(saved.getIsPrimary())
                .createdAt(saved.getCreatedAt())
                .build();
    }

    @Transactional
    public List<ProductImageResponse> uploadGalleryImages(Long id, List<MultipartFile> files) {
        productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));
        List<ProductImageResponse> responses = new ArrayList<>();
        int order = 1;
        for (MultipartFile file : files) {
            String url = saveFile(file);
            ProductImage image = ProductImage.builder()
                    .productId(id)
                    .url(url)
                    .isPrimary(false)
                    .sortOrder(order++)
                    .fileSize(file.getSize())
                    .mimeType(file.getContentType())
                    .build();
            ProductImage saved = productImageRepository.save(image);
            responses.add(ProductImageResponse.builder()
                    .id(saved.getId())
                    .productId(saved.getProductId())
                    .imageUrl(saved.getUrl())
                    .altText(saved.getAltText())
                    .sortOrder(saved.getSortOrder())
                    .isPrimary(saved.getIsPrimary())
                    .createdAt(saved.getCreatedAt())
                    .build());
        }
        return responses;
    }

    private String saveFile(MultipartFile file) {
        try {
            String originalFilename = file.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            String filename = UUID.randomUUID() + extension;
            Path uploadPath = Paths.get(uploadDir, "products");
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            Path filePath = uploadPath.resolve(filename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            return "/uploads/products/" + filename;
        } catch (Exception e) {
            throw new RuntimeException("Error al guardar archivo: " + e.getMessage());
        }
    }

    public PagedResponse<ProductResponse> searchProducts(String query, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Specification<Product> spec = (root, queryObj, cb) -> {
            String pattern = "%" + query.toLowerCase() + "%";
            return cb.or(
                    cb.like(cb.lower(root.get("name")), pattern),
                    cb.like(cb.lower(root.get("shortDescription")), pattern),
                    cb.like(cb.lower(root.get("fullDescription")), pattern)
            );
        };
        Page<Product> productPage = productRepository.findAll(spec, pageable);
        return toPagedResponse(productPage);
    }

    private static String withJsonbDefault(String value) {
        return (value != null && !value.isEmpty()) ? value : "{}";
    }

    private PagedResponse<ProductResponse> toPagedResponse(Page<Product> page) {
        List<ProductResponse> content = page.getContent().stream()
                .map(this::toProductResponse)
                .collect(Collectors.toList());
        return PagedResponse.<ProductResponse>builder()
                .content(content)
                .page(page.getNumber())
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .last(page.isLast())
                .build();
    }

    private ProductResponse toProductResponse(Product product) {
        String categoryName = null;
        String categorySlug = null;
        if (product.getCategoryId() != null && product.getCategory() != null) {
            categoryName = product.getCategory().getName();
            categorySlug = product.getCategory().getSlug();
        }
        List<ProductImageResponse> imageResponses = product.getImages() != null
                ? product.getImages().stream().map(img -> ProductImageResponse.builder()
                .id(img.getId())
                .productId(img.getProductId())
                .imageUrl(img.getUrl())
                .altText(img.getAltText())
                .sortOrder(img.getSortOrder())
                .isPrimary(img.getIsPrimary())
                .createdAt(img.getCreatedAt())
                .build()).collect(Collectors.toList())
                : Collections.emptyList();
        List<TagResponse> tagResponses = product.getTags() != null
                ? product.getTags().stream().map(tag -> TagResponse.builder()
                .id(tag.getId())
                .name(tag.getName())
                .slug(tag.getSlug())
                .createdAt(tag.getCreatedAt())
                .build()).collect(Collectors.toList())
                : Collections.emptyList();
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .code(product.getCode())
                .categoryId(product.getCategoryId())
                .categoryName(categoryName)
                .categorySlug(categorySlug)
                .shortDescription(product.getShortDescription())
                .fullDescription(product.getFullDescription())
                .ingredients(product.getIngredients())
                .nutritionalInfo(product.getNutritionalInfo())
                .referencePrice(product.getReferencePrice())
                .discountPrice(product.getDiscountPrice())
                .currency(product.getCurrency())
                .stock(product.getStock())
                .weightGrams(product.getWeightGrams())
                .isFeatured(product.getIsFeatured())
                .status(product.getStatus())
                .videoUrl(product.getVideoUrl())
                .metaTitle(product.getMetaTitle())
                .metaDescription(product.getMetaDescription())
                .likeCount(product.getLikesCount() != null ? product.getLikesCount().longValue() : 0L)
                .viewCount(product.getViewsCount() != null ? product.getViewsCount().longValue() : 0L)
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .images(imageResponses)
                .tags(tagResponses)
                .build();
    }
}
