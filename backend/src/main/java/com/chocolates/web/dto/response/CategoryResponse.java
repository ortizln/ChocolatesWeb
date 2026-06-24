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
public class CategoryResponse {
    private Long id;
    private String name;
    private String slug;
    private String description;
    private Long parentId;
    private String imageUrl;
    private String icon;
    private Integer sortOrder;
    private Boolean active;
    private Integer childCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
