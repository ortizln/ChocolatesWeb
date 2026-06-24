package com.chocolates.web.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageReplyResponse {
    private Long id;
    private Long contactMessageId;
    private String reply;
    private Long repliedBy;
    private String repliedByName;
    private LocalDateTime createdAt;
}
