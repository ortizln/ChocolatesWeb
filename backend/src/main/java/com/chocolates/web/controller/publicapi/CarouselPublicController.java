package com.chocolates.web.controller.publicapi;

import com.chocolates.web.dto.response.ApiResponse;
import com.chocolates.web.service.CarouselService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/carousels/public")
@RequiredArgsConstructor
public class CarouselPublicController {

    private final CarouselService carouselService;

    @GetMapping("/{location}")
    public ResponseEntity<ApiResponse> getByLocation(@PathVariable String location) {
        return ResponseEntity.ok(ApiResponse.success(carouselService.getActiveByLocation(location)));
    }
}
