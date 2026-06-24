package com.chocolates.web.controller.admin;

import com.chocolates.web.dto.request.CarouselItemRequest;
import com.chocolates.web.dto.request.CarouselRequest;
import com.chocolates.web.dto.response.ApiResponse;
import com.chocolates.web.service.CarouselService;
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

@RestController
@RequestMapping("/api/v1/admin/carousels")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN', 'EDITOR', 'MARKETING')")
public class CarouselAdminController {

    private final CarouselService carouselService;

    @GetMapping
    public ResponseEntity<ApiResponse> list() {
        return ResponseEntity.ok(ApiResponse.success(carouselService.getAll()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(carouselService.getActiveByLocation(id.toString())));
    }

    @PostMapping
    public ResponseEntity<ApiResponse> create(@Valid @RequestBody CarouselRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Carrusel creado exitosamente", carouselService.create(request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> update(@PathVariable Long id, @Valid @RequestBody CarouselRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Carrusel actualizado exitosamente", carouselService.update(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> delete(@PathVariable Long id) {
        carouselService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Carrusel eliminado exitosamente"));
    }

    @PostMapping("/{carouselId}/items")
    public ResponseEntity<ApiResponse> addItem(@PathVariable Long carouselId, @Valid @RequestBody CarouselItemRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Item agregado exitosamente", carouselService.addItem(carouselId, request)));
    }

    @PutMapping("/items/{itemId}")
    public ResponseEntity<ApiResponse> updateItem(@PathVariable Long itemId, @Valid @RequestBody CarouselItemRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Item actualizado exitosamente", carouselService.updateItem(itemId, request)));
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<ApiResponse> removeItem(@PathVariable Long itemId) {
        carouselService.removeItem(itemId);
        return ResponseEntity.ok(ApiResponse.success("Item eliminado exitosamente"));
    }
}
