package com.chocolates.web.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryRequest {
    @NotBlank
    private String name;

    private String slug;

    private String description;

    private Long parentId;

    private String imageUrl;

    private String icon;

    private Integer sortOrder;

    private Boolean active;
}
