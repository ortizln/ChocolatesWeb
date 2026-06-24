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
public class CarouselRequest {
    @NotBlank
    private String name;

    private String location;

    private Boolean autoPlay;

    private Integer intervalMs;

    private Boolean active;
}
