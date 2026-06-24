package com.chocolates.web.controller.publicapi;

import com.chocolates.web.dto.response.ApiResponse;
import com.chocolates.web.service.SettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/settings/public")
@RequiredArgsConstructor
public class SettingsPublicController {

    private final SettingsService settingsService;

    @GetMapping
    public ResponseEntity<ApiResponse> getAll() {
        return ResponseEntity.ok(ApiResponse.success(settingsService.getAllSettings()));
    }
}
