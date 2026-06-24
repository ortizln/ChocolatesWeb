package com.chocolates.web.controller.admin;

import com.chocolates.web.dto.response.ApiResponse;
import com.chocolates.web.service.SettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/settings")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class SettingsAdminController {

    private final SettingsService settingsService;

    @GetMapping
    public ResponseEntity<ApiResponse> getAll() {
        return ResponseEntity.ok(ApiResponse.success(settingsService.getAllSettings()));
    }

    @PutMapping("/{key}")
    public ResponseEntity<ApiResponse> update(@PathVariable String key, @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(ApiResponse.success("Configuración actualizada exitosamente", settingsService.updateSetting(key, body.get("value"))));
    }

    @PutMapping("/bulk")
    public ResponseEntity<ApiResponse> updateBulk(@RequestBody Map<String, String> settings) {
        return ResponseEntity.ok(ApiResponse.success("Configuraciones actualizadas exitosamente", settingsService.updateMultiple(settings)));
    }
}
