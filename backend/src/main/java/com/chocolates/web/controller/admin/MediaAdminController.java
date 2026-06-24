package com.chocolates.web.controller.admin;

import com.chocolates.web.dto.request.MediaRequest;
import com.chocolates.web.dto.response.ApiResponse;
import com.chocolates.web.service.MediaService;
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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/media")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN', 'EDITOR', 'MARKETING')")
public class MediaAdminController {

    private final MediaService mediaService;

    @GetMapping
    public ResponseEntity<ApiResponse> list(@RequestParam(required = false) String folderId) {
        Long fid = folderId != null ? Long.parseLong(folderId) : null;
        return ResponseEntity.ok(ApiResponse.success(mediaService.getByFolder(fid)));
    }

    @PostMapping("/upload")
    public ResponseEntity<ApiResponse> upload(
            @RequestParam("file") MultipartFile file,
            @RequestPart(required = false) MediaRequest request) {
        if (request == null) {
            request = new MediaRequest();
        }
        return ResponseEntity.ok(ApiResponse.success("Archivo subido exitosamente", mediaService.upload(file, request)));
    }

    @PostMapping("/upload-multiple")
    public ResponseEntity<ApiResponse> uploadMultiple(@RequestParam("files") List<MultipartFile> files) {
        return ResponseEntity.ok(ApiResponse.success("Archivos subidos exitosamente", mediaService.uploadMultiple(files)));
    }

    @PostMapping("/folder")
    public ResponseEntity<ApiResponse> createFolder(@RequestBody Map<String, Object> body) {
        String name = (String) body.get("name");
        Long parentId = body.get("parentId") != null ? ((Number) body.get("parentId")).longValue() : null;
        return ResponseEntity.ok(ApiResponse.success("Carpeta creada exitosamente", mediaService.createFolder(name, parentId)));
    }

    @GetMapping("/folder/{id}")
    public ResponseEntity<ApiResponse> listFolder(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(mediaService.getByFolder(id)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> update(@PathVariable Long id, @RequestBody MediaRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Archivo actualizado exitosamente", mediaService.update(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> delete(@PathVariable Long id) {
        mediaService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Archivo eliminado exitosamente"));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse> search(@RequestParam String q) {
        return ResponseEntity.ok(ApiResponse.success(mediaService.search(q)));
    }
}
