package com.chocolates.web.controller.admin;

import com.chocolates.web.dto.response.ApiResponse;
import com.chocolates.web.service.GalleryService;
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

import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/galleries")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN', 'EDITOR', 'MARKETING')")
public class GalleryAdminController {

    private final GalleryService galleryService;

    @GetMapping
    public ResponseEntity<ApiResponse> list() {
        return ResponseEntity.ok(ApiResponse.success(galleryService.getAlbums()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(galleryService.getAlbumDetail(id)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse> create(@RequestBody Map<String, String> body) {
        return ResponseEntity.ok(ApiResponse.success("Álbum creado exitosamente",
                galleryService.createAlbum(body.get("name"), body.get("description"), body.get("coverImageUrl"))));
    }

    @PutMapping("/{id}/add-media")
    public ResponseEntity<ApiResponse> addMedia(@PathVariable Long id, @RequestBody Map<String, Long> body) {
        return ResponseEntity.ok(ApiResponse.success(galleryService.addMedia(id, body.get("mediaId"))));
    }

    @DeleteMapping("/{albumId}/media/{mediaId}")
    public ResponseEntity<ApiResponse> removeMedia(@PathVariable Long albumId, @PathVariable Long mediaId) {
        return ResponseEntity.ok(ApiResponse.success(galleryService.removeMedia(albumId, mediaId)));
    }
}
