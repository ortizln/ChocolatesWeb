package com.chocolates.web.controller.publicapi;

import com.chocolates.web.dto.response.ApiResponse;
import com.chocolates.web.service.BannerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/banners/public")
@RequiredArgsConstructor
public class BannerPublicController {

    private final BannerService bannerService;

    @GetMapping("/{type}")
    public ResponseEntity<ApiResponse> getByType(@PathVariable String type) {
        return ResponseEntity.ok(ApiResponse.success(bannerService.getActiveByType(type)));
    }
}
