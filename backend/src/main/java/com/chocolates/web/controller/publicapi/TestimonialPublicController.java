package com.chocolates.web.controller.publicapi;

import com.chocolates.web.dto.response.ApiResponse;
import com.chocolates.web.service.TestimonialService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/testimonials/public")
@RequiredArgsConstructor
public class TestimonialPublicController {

    private final TestimonialService testimonialService;

    @GetMapping
    public ResponseEntity<ApiResponse> getActive() {
        return ResponseEntity.ok(ApiResponse.success(testimonialService.getActive()));
    }
}
