package com.chocolates.web.service;

import com.chocolates.web.dto.request.ContactRequest;
import com.chocolates.web.dto.request.MessageReplyRequest;
import com.chocolates.web.dto.response.ContactMessageResponse;
import com.chocolates.web.dto.response.MessageReplyResponse;
import com.chocolates.web.entity.ContactMessage;
import com.chocolates.web.entity.MessageReply;
import com.chocolates.web.repository.ContactMessageRepository;
import com.chocolates.web.repository.MessageReplyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;
    private final MessageReplyRepository messageReplyRepository;

    @Transactional
    public ContactMessageResponse saveMessage(ContactRequest request) {
        ContactMessage message = ContactMessage.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .subject(request.getSubject())
                .message(request.getMessage())
                .status("UNREAD")
                .build();
        ContactMessage saved = contactMessageRepository.save(message);
        return toMessageResponse(saved);
    }

    public List<ContactMessageResponse> getAllMessages(String status) {
        List<ContactMessage> messages;
        if (status != null && !status.isBlank()) {
            messages = contactMessageRepository.findByStatusOrderByCreatedAtDesc(status);
        } else {
            messages = contactMessageRepository.findAll();
        }
        return messages.stream()
                .map(this::toMessageResponse)
                .collect(Collectors.toList());
    }

    public ContactMessageResponse getMessageDetail(Long id) {
        ContactMessage message = contactMessageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mensaje no encontrado con id: " + id));
        return toMessageResponse(message);
    }

    @Transactional
    public ContactMessageResponse replyToMessage(Long id, MessageReplyRequest request, Long userId) {
        ContactMessage message = contactMessageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mensaje no encontrado con id: " + id));
        MessageReply reply = MessageReply.builder()
                .messageId(id)
                .reply(request.getReply())
                .repliedBy(userId)
                .build();
        messageReplyRepository.save(reply);
        message.setStatus("REPLIED");
        message.setRepliedAt(LocalDateTime.now());
        contactMessageRepository.save(message);
        return toMessageResponse(message);
    }

    @Transactional
    public ContactMessageResponse updateMessageStatus(Long id, String status) {
        ContactMessage message = contactMessageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mensaje no encontrado con id: " + id));
        message.setStatus(status);
        ContactMessage saved = contactMessageRepository.save(message);
        return toMessageResponse(saved);
    }

    private ContactMessageResponse toMessageResponse(ContactMessage message) {
        List<MessageReplyResponse> replies = message.getReplies() != null
                ? message.getReplies().stream().map(r -> MessageReplyResponse.builder()
                .id(r.getId())
                .contactMessageId(r.getMessageId())
                .reply(r.getReply())
                .repliedBy(r.getRepliedBy())
                .repliedByName(r.getRepliedByUser() != null
                        ? r.getRepliedByUser().getFirstName() + " " + r.getRepliedByUser().getLastName()
                        : null)
                .createdAt(r.getCreatedAt())
                .build()).collect(Collectors.toList())
                : Collections.emptyList();
        return ContactMessageResponse.builder()
                .id(message.getId())
                .fullName(message.getFullName())
                .email(message.getEmail())
                .phone(message.getPhone())
                .subject(message.getSubject())
                .message(message.getMessage())
                .status(message.getStatus())
                .createdAt(message.getCreatedAt())
                .updatedAt(message.getUpdatedAt())
                .replies(replies)
                .build();
    }
}
