package com.chocolates.web.controller.publicapi;

import com.chocolates.web.dto.response.ApiResponse;
import com.chocolates.web.service.ProductService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/products/public")
@RequiredArgsConstructor
public class ProductPublicController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<ApiResponse> listProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) Long category,
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(ApiResponse.success(productService.getPublicProducts(page, size, category, search)));
    }

    @GetMapping("/featured")
    public ResponseEntity<ApiResponse> getFeatured() {
        return ResponseEntity.ok(ApiResponse.success(productService.getFeaturedProducts()));
    }

    @GetMapping("/top-liked")
    public ResponseEntity<ApiResponse> getTopLiked(@RequestParam(defaultValue = "5") int limit) {
        return ResponseEntity.ok(ApiResponse.success(productService.getTopLikedProducts(limit)));
    }

    @GetMapping("/top-viewed")
    public ResponseEntity<ApiResponse> getTopViewed(@RequestParam(defaultValue = "5") int limit) {
        return ResponseEntity.ok(ApiResponse.success(productService.getTopViewedProducts(limit)));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse> getBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.success(productService.getProductBySlug(slug)));
    }

    @PostMapping("/{productId}/like")
    public ResponseEntity<ApiResponse> likeProduct(
            @PathVariable Long productId,
            @RequestParam(required = false) String sessionId,
            HttpServletRequest request) {
        return ResponseEntity.ok(ApiResponse.success(
                productService.likeProduct(productId, sessionId, request.getRemoteAddr(), null)));
    }

    @GetMapping("/{productId}/related")
    public ResponseEntity<ApiResponse> getRelated(@PathVariable Long productId) {
        return ResponseEntity.ok(ApiResponse.success(productService.getRelatedProducts(productId, 5)));
    }
}
