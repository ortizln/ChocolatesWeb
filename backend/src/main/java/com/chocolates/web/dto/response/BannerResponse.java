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
public class BannerResponse {
    private Long id;
    private String name;
    private String bannerType;
    private String imageUrl;
    private String mobileImageUrl;
    private String videoUrl;
    private String title;
    private String subtitle;
    private String description;
    private String linkUrl;
    private String linkText;
    private Integer sortOrder;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
