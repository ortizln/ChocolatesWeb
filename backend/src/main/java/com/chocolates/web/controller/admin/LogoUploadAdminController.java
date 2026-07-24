package com.chocolates.web.controller.admin;

import com.chocolates.web.dto.response.ApiResponse;
import com.chocolates.web.service.LogoUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/settings/logo")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class LogoUploadAdminController {

    private final LogoUploadService logoUploadService;

    @PostMapping("/upload")
    public ResponseEntity<ApiResponse> upload(
            @RequestParam("file") MultipartFile file,
            @RequestParam("variant") String variant) throws IOException {
        Map<String, String> result = logoUploadService.uploadLogo(file, variant);
        return ResponseEntity.ok(ApiResponse.success("Logo " + variant + " actualizado", result));
    }

    @DeleteMapping("/{variant}")
    public ResponseEntity<ApiResponse> delete(@PathVariable String variant) {
        logoUploadService.deleteLogo(variant);
        return ResponseEntity.ok(ApiResponse.success("Logo " + variant + " eliminado", null));
    }
}