package com.chocolates.web.service;

import com.chocolates.web.dto.request.PostRequest;
import com.chocolates.web.dto.response.PagedResponse;
import com.chocolates.web.dto.response.PostResponse;
import com.chocolates.web.entity.Post;
import com.chocolates.web.entity.PostVersion;
import com.chocolates.web.repository.PostRepository;
import com.chocolates.web.repository.PostVersionRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {

    private final PostRepository postRepository;
    private final PostVersionRepository postVersionRepository;

    public PagedResponse<PostResponse> getPublishedPosts(int page, int size, String type) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "publishedAt"));
        Specification<Post> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            predicates.add(cb.equal(root.get("status"), "PUBLISHED"));
            if (type != null && !type.isBlank()) {
                predicates.add(cb.equal(root.get("postType"), type));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
        Page<Post> postPage = postRepository.findAll(spec, pageable);
        return toPagedResponse(postPage);
    }

    @Transactional
    public PostResponse getPostBySlug(String slug) {
        Post post = postRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Post no encontrado con slug: " + slug));
        post.setViewsCount(post.getViewsCount() == null ? 1 : post.getViewsCount() + 1);
        postRepository.save(post);
        return toPostResponse(post);
    }

    public List<PostResponse> getTopReadPosts(int limit) {
        Pageable pageable = PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "viewsCount"));
        return postRepository.findAll(pageable).stream()
                .map(this::toPostResponse)
                .collect(Collectors.toList());
    }

    public PagedResponse<PostResponse> getAllPosts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Post> postPage = postRepository.findAll(pageable);
        return toPagedResponse(postPage);
    }

    @Transactional
    public PostResponse createPost(PostRequest request) {
        Post post = Post.builder()
                .title(request.getTitle())
                .slug(request.getSlug() != null ? request.getSlug() :
                        request.getTitle().toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("^-|-$", ""))
                .summary(request.getSummary())
                .content(request.getContent())
                .postType(request.getPostType() != null ? request.getPostType() : "ARTICLE")
                .featuredImage(request.getFeaturedImage())
                .videoUrl(request.getVideoUrl())
                .status(request.getStatus() != null ? request.getStatus() : "DRAFT")
                .scheduledAt(request.getScheduledAt())
                .viewsCount(0)
                .likesCount(0)
                .build();
        if ("PUBLISHED".equals(post.getStatus())) {
            post.setPublishedAt(LocalDateTime.now());
        }
        Post saved = postRepository.save(post);
        saveVersion(saved, "Versión inicial", saved.getAuthorId());
        return toPostResponse(saved);
    }

    @Transactional
    public PostResponse updatePost(Long id, PostRequest request) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post no encontrado con id: " + id));
        String oldContent = post.getContent();
        post.setTitle(request.getTitle());
        post.setSlug(request.getSlug());
        post.setSummary(request.getSummary());
        post.setContent(request.getContent());
        post.setPostType(request.getPostType());
        post.setFeaturedImage(request.getFeaturedImage());
        post.setVideoUrl(request.getVideoUrl());
        post.setStatus(request.getStatus());
        post.setScheduledAt(request.getScheduledAt());
        if ("PUBLISHED".equals(post.getStatus()) && post.getPublishedAt() == null) {
            post.setPublishedAt(LocalDateTime.now());
        }
        Post saved = postRepository.save(post);
        if (!oldContent.equals(request.getContent())) {
            saveVersion(saved, "Actualización de contenido", saved.getAuthorId());
        }
        return toPostResponse(saved);
    }

    @Transactional
    public void deletePost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post no encontrado con id: " + id));
        postRepository.delete(post);
    }

    @Transactional
    public PostResponse archivePost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post no encontrado con id: " + id));
        post.setStatus("ARCHIVED");
        Post saved = postRepository.save(post);
        return toPostResponse(saved);
    }

    @Transactional
    public PostResponse schedulePost(Long id, LocalDateTime scheduledAt) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post no encontrado con id: " + id));
        post.setScheduledAt(scheduledAt);
        post.setStatus("SCHEDULED");
        Post saved = postRepository.save(post);
        return toPostResponse(saved);
    }

    public List<PostResponse> getPostVersions(Long postId) {
        List<PostVersion> versions = postVersionRepository.findByPostIdOrderByVersionNumberDesc(postId);
        return versions.stream().map(v -> PostResponse.builder()
                .id(v.getPostId())
                .content(v.getContent())
                .build()).collect(Collectors.toList());
    }

    private void saveVersion(Post post, String changeNotes, Long savedBy) {
        List<PostVersion> existingVersions = postVersionRepository.findByPostIdOrderByVersionNumberDesc(post.getId());
        int nextVersion = existingVersions.isEmpty() ? 1 : existingVersions.get(0).getVersionNumber() + 1;
        PostVersion version = PostVersion.builder()
                .postId(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .summary(post.getSummary())
                .changeNotes(changeNotes)
                .versionNumber(nextVersion)
                .savedBy(savedBy)
                .build();
        postVersionRepository.save(version);
    }

    private PagedResponse<PostResponse> toPagedResponse(Page<Post> page) {
        List<PostResponse> content = page.getContent().stream()
                .map(this::toPostResponse)
                .collect(Collectors.toList());
        return PagedResponse.<PostResponse>builder()
                .content(content)
                .page(page.getNumber())
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .last(page.isLast())
                .build();
    }

    private PostResponse toPostResponse(Post post) {
        String authorName = post.getAuthor() != null
                ? post.getAuthor().getFirstName() + " " + post.getAuthor().getLastName()
                : null;
        return PostResponse.builder()
                .id(post.getId())
                .title(post.getTitle())
                .slug(post.getSlug())
                .summary(post.getSummary())
                .content(post.getContent())
                .postType(post.getPostType())
                .featuredImage(post.getFeaturedImage())
                .videoUrl(post.getVideoUrl())
                .status(post.getStatus())
                .authorId(post.getAuthorId())
                .authorName(authorName)
                .commentCount(post.getComments() != null ? (long) post.getComments().size() : 0L)
                .scheduledAt(post.getScheduledAt())
                .publishedAt(post.getPublishedAt())
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt())
                .build();
    }
}
