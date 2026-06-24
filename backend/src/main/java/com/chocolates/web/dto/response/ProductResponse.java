package com.chocolates.web.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    private Long id;
    private String name;
    private String code;
    private Long categoryId;
    private String categoryName;
    private String categorySlug;
    private String shortDescription;
    private String fullDescription;
    private String ingredients;
    private String nutritionalInfo;
    private Double referencePrice;
    private Double discountPrice;
    private String currency;
    private Integer stock;
    private Double weightGrams;
    private Boolean isFeatured;
    private String status;
    private String videoUrl;
    private String metaTitle;
    private String metaDescription;
    private Long likeCount;
    private Long viewCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<ProductImageResponse> images;
    private List<TagResponse> tags;
}
