package com.chocolates.web.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CarouselItemRequest {
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
}
