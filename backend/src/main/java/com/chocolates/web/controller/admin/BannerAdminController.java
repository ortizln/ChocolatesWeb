package com.chocolates.web.controller.admin;

import com.chocolates.web.dto.request.BannerRequest;
import com.chocolates.web.dto.response.ApiResponse;
import com.chocolates.web.service.BannerService;
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
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/banners")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN', 'EDITOR', 'MARKETING')")
public class BannerAdminController {

    private final BannerService bannerService;

    @GetMapping
    public ResponseEntity<ApiResponse> list() {
        return ResponseEntity.ok(ApiResponse.success(bannerService.getAll()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(bannerService.getActiveByType(id.toString())));
    }

    @PostMapping
    public ResponseEntity<ApiResponse> create(@Valid @RequestBody BannerRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Banner creado exitosamente", bannerService.create(request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> update(@PathVariable Long id, @Valid @RequestBody BannerRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Banner actualizado exitosamente", bannerService.update(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> delete(@PathVariable Long id) {
        bannerService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Banner eliminado exitosamente"));
    }

    @PostMapping("/reorder")
    public ResponseEntity<ApiResponse> reorder(@RequestBody List<Long> bannerIds) {
        bannerService.reorder(bannerIds);
        return ResponseEntity.ok(ApiResponse.success("Orden actualizado exitosamente"));
    }
}
