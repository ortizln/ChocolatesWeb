package com.chocolates.web.controller.admin;

import com.chocolates.web.dto.response.ApiResponse;
import com.chocolates.web.service.AuditService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/audit")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AuditAdminController {

    private final AuditService auditService;

    @GetMapping
    public ResponseEntity<ApiResponse> list(
            @RequestParam(required = false) String entityType,
            @RequestParam(required = false) Long entityId) {
        if (entityType != null && entityId != null) {
            return ResponseEntity.ok(ApiResponse.success(auditService.getEntityLogs(entityType, entityId)));
        }
        return ResponseEntity.ok(ApiResponse.success("Parámetros entityType y entityId requeridos"));
    }
}
