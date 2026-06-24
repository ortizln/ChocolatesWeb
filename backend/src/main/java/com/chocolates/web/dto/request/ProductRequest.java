package com.chocolates.web.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequest {
    @NotBlank
    private String name;

    @NotBlank
    private String code;

    private Long categoryId;

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

    private List<Long> tagIds;
}
