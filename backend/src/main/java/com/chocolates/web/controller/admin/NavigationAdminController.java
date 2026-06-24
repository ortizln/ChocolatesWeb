package com.chocolates.web.controller.admin;

import com.chocolates.web.dto.response.ApiResponse;
import com.chocolates.web.service.NavigationService;
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

import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/navigation")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN', 'EDITOR')")
public class NavigationAdminController {

    private final NavigationService navigationService;

    @GetMapping
    public ResponseEntity<ApiResponse> list() {
        return ResponseEntity.ok(ApiResponse.success(navigationService.getAllMenus()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createMenu(@RequestBody Map<String, String> body) {
        return ResponseEntity.ok(ApiResponse.success("Menú creado exitosamente",
                navigationService.createMenu(body.get("name"), body.get("location"))));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateMenu(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(ApiResponse.success("Menú actualizado exitosamente",
                navigationService.updateMenu(id, body.get("name"), body.get("location"))));
    }

    @PostMapping("/{menuId}/items")
    public ResponseEntity<ApiResponse> addItem(@PathVariable Long menuId, @RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(ApiResponse.success("Item agregado exitosamente",
                navigationService.addItem(menuId, body)));
    }

    @PutMapping("/items/{itemId}")
    public ResponseEntity<ApiResponse> updateItem(@PathVariable Long itemId, @RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(ApiResponse.success("Item actualizado exitosamente",
                navigationService.updateItem(itemId, body)));
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<ApiResponse> removeItem(@PathVariable Long itemId) {
        navigationService.removeItem(itemId);
        return ResponseEntity.ok(ApiResponse.success("Item eliminado exitosamente"));
    }
}
