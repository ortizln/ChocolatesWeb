package com.chocolates.web.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TestimonialRequest {
    @NotBlank
    private String clientName;

    private String clientTitle;

    private String clientCompany;

    private String clientPhoto;

    @NotBlank
    private String content;

    @Min(1)
    @Max(5)
    private Integer rating;

    private Integer sortOrder;

    private Boolean active;
}
