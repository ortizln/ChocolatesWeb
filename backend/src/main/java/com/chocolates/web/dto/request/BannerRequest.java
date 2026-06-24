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
public class BannerRequest {
    @NotBlank
    private String name;

    private String bannerType;

    @NotBlank
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
}
