package com.chocolates.web.controller.admin;

import com.chocolates.web.dto.request.MessageReplyRequest;
import com.chocolates.web.dto.response.ApiResponse;
import com.chocolates.web.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/messages")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN', 'EDITOR')")
public class ContactAdminController {

    private final ContactService contactService;

    @GetMapping
    public ResponseEntity<ApiResponse> list(@RequestParam(required = false) String status) {
        return ResponseEntity.ok(ApiResponse.success(contactService.getAllMessages(status)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(contactService.getMessageDetail(id)));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(ApiResponse.success(contactService.updateMessageStatus(id, body.get("status"))));
    }

    @PostMapping("/{id}/reply")
    public ResponseEntity<ApiResponse> reply(@PathVariable Long id, @Valid @RequestBody MessageReplyRequest request, Principal principal) {
        return ResponseEntity.ok(ApiResponse.success(contactService.replyToMessage(id, request, null)));
    }
}
