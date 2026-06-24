package com.chocolates.web.controller.publicapi;

import com.chocolates.web.dto.request.ContactRequest;
import com.chocolates.web.dto.response.ApiResponse;
import com.chocolates.web.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/contact/public")
@RequiredArgsConstructor
public class ContactPublicController {

    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<ApiResponse> submit(@Valid @RequestBody ContactRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Mensaje enviado correctamente", contactService.saveMessage(request)));
    }
}
