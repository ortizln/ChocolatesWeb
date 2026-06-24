package com.chocolates.web.controller.admin;

import com.chocolates.web.dto.response.ApiResponse;
import com.chocolates.web.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/tags")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN', 'EDITOR', 'MARKETING')")
public class TagAdminController {

    private final TagService tagService;

    @GetMapping
    public ResponseEntity<ApiResponse> list() {
        return ResponseEntity.ok(ApiResponse.success(tagService.getAll()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse> create(@RequestBody Map<String, String> body) {
        String name = body.get("name");
        return ResponseEntity.ok(ApiResponse.success("Tag creado exitosamente", tagService.create(name)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> delete(@PathVariable Long id) {
        tagService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Tag eliminado exitosamente"));
    }
}
