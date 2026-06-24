package com.chocolates.web.controller.admin;

import com.chocolates.web.dto.request.TestimonialRequest;
import com.chocolates.web.dto.response.ApiResponse;
import com.chocolates.web.service.TestimonialService;
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
@RequestMapping("/api/v1/admin/testimonials")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN', 'EDITOR', 'MARKETING')")
public class TestimonialAdminController {

    private final TestimonialService testimonialService;

    @GetMapping
    public ResponseEntity<ApiResponse> list() {
        return ResponseEntity.ok(ApiResponse.success(testimonialService.getAll()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(testimonialService.getActive()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse> create(@Valid @RequestBody TestimonialRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Testimonio creado exitosamente", testimonialService.create(request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> update(@PathVariable Long id, @Valid @RequestBody TestimonialRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Testimonio actualizado exitosamente", testimonialService.update(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> delete(@PathVariable Long id) {
        testimonialService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Testimonio eliminado exitosamente"));
    }
}
