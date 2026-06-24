package com.chocolates.web.controller.publicapi;

import com.chocolates.web.dto.response.ApiResponse;
import com.chocolates.web.service.GalleryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/gallery/public")
@RequiredArgsConstructor
public class GalleryPublicController {

    private final GalleryService galleryService;

    @GetMapping("/albums")
    public ResponseEntity<ApiResponse> getAlbums() {
        return ResponseEntity.ok(ApiResponse.success(galleryService.getAlbums()));
    }

    @GetMapping("/albums/{id}")
    public ResponseEntity<ApiResponse> getAlbumDetail(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(galleryService.getAlbumDetail(id)));
    }
}
