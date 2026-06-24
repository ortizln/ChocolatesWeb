package com.chocolates.web.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostRequest {
    @NotBlank
    private String title;

    private String slug;

    private String summary;

    private String content;

    private String postType;

    private String featuredImage;

    private String videoUrl;

    private String status;

    private LocalDateTime scheduledAt;
}
