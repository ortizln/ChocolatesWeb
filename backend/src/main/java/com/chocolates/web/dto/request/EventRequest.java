package com.chocolates.web.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventRequest {
    @NotBlank
    private String title;

    private String slug;

    private String eventType;

    private String description;

    @NotNull
    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private String location;

    private String address;

    private Double latitude;

    private Double longitude;

    private String featuredImage;

    private String status;
}
