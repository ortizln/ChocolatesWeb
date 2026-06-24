package com.chocolates.web.service;

import com.chocolates.web.entity.AuditLog;
import com.chocolates.web.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuditService {

    private final AuditLogRepository auditLogRepository;

    @Transactional
    public void logAction(String entityType, Long entityId, String action,
                          String changes, Long userId, String ipAddress) {
        AuditLog auditLog = AuditLog.builder()
                .entityType(entityType)
                .entityId(entityId)
                .action(action)
                .changes(changes)
                .performedBy(userId)
                .ipAddress(ipAddress)
                .build();
        auditLogRepository.save(auditLog);
    }

    public List<AuditLog> getEntityLogs(String entityType, Long entityId) {
        return auditLogRepository.findByEntityTypeAndEntityIdOrderByCreatedAtDesc(entityType, entityId);
    }
}
