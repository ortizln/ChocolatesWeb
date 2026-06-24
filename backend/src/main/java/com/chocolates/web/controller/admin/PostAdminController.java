package com.chocolates.web.controller.admin;

import com.chocolates.web.dto.request.PostRequest;
import com.chocolates.web.dto.response.ApiResponse;
import com.chocolates.web.service.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v1/admin/posts")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN', 'EDITOR', 'MARKETING')")
public class PostAdminController {

    private final PostService postService;

    @GetMapping
    public ResponseEntity<ApiResponse> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(ApiResponse.success(postService.getAllPosts(page, size)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(postService.getPostBySlug(id.toString())));
    }

    @PostMapping
    public ResponseEntity<ApiResponse> create(@Valid @RequestBody PostRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Post creado exitosamente", postService.createPost(request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> update(@PathVariable Long id, @Valid @RequestBody PostRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Post actualizado exitosamente", postService.updatePost(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> delete(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.ok(ApiResponse.success("Post eliminado exitosamente"));
    }

    @PostMapping("/{id}/schedule")
    public ResponseEntity<ApiResponse> schedule(@PathVariable Long id, @RequestBody PostRequest request) {
        return ResponseEntity.ok(ApiResponse.success(postService.schedulePost(id, request.getScheduledAt())));
    }

    @PostMapping("/{id}/archive")
    public ResponseEntity<ApiResponse> archive(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(postService.archivePost(id)));
    }

    @GetMapping("/{id}/versions")
    public ResponseEntity<ApiResponse> getVersions(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(postService.getPostVersions(id)));
    }
}
