package com.chocolates.web.controller.publicapi;

import com.chocolates.web.dto.request.EventRequest;
import com.chocolates.web.dto.response.ApiResponse;
import com.chocolates.web.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/events/public")
@RequiredArgsConstructor
public class EventPublicController {

    private final EventService eventService;

    @GetMapping
    public ResponseEntity<ApiResponse> listEvents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String type) {
        return ResponseEntity.ok(ApiResponse.success(eventService.getPublishedEvents(page, size, type)));
    }

    @GetMapping("/upcoming")
    public ResponseEntity<ApiResponse> getUpcoming() {
        return ResponseEntity.ok(ApiResponse.success(eventService.getPublishedEvents(0, 10, null)));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse> getBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.success(eventService.getEventBySlug(slug)));
    }

    @PostMapping("/{eventId}/register")
    public ResponseEntity<ApiResponse> register(@PathVariable Long eventId) {
        return ResponseEntity.ok(ApiResponse.success("Registro exitoso"));
    }
}
