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
public class CarouselItemResponse {
    private Long id;
    private Long carouselId;
    private String title;
    private String subtitle;
    private String description;
    private String imageUrl;
    private String videoUrl;
    private String linkUrl;
    private String linkText;
    private Integer sortOrder;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
