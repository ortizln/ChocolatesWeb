package com.chocolates.web.controller.publicapi;

import com.chocolates.web.dto.response.ApiResponse;
import com.chocolates.web.service.NavigationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/navigation/public")
@RequiredArgsConstructor
public class NavigationPublicController {

    private final NavigationService navigationService;

    @GetMapping("/{location}")
    public ResponseEntity<ApiResponse> getByLocation(@PathVariable String location) {
        return ResponseEntity.ok(ApiResponse.success(navigationService.getMenuByLocation(location)));
    }
}
