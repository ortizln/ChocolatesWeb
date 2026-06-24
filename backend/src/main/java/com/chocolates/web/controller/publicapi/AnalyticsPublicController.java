package com.chocolates.web.controller.publicapi;

import com.chocolates.web.dto.response.ApiResponse;
import com.chocolates.web.service.AnalyticsService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/analytics/public")
@RequiredArgsConstructor
public class AnalyticsPublicController {

    private final AnalyticsService analyticsService;

    @PostMapping("/visit")
    public ResponseEntity<ApiResponse> recordVisit(
            HttpServletRequest request,
            @RequestBody Map<String, Object> body) {
        String pageUrl = (String) body.get("pageUrl");
        String pageType = (String) body.get("pageType");
        Long referenceId = body.get("referenceId") != null
                ? ((Number) body.get("referenceId")).longValue()
                : null;
        String sessionId = (String) body.get("sessionId");
        analyticsService.recordPageVisit(pageUrl, pageType, referenceId, request, sessionId);
        return ResponseEntity.ok(ApiResponse.success("Visita registrada"));
    }
}
