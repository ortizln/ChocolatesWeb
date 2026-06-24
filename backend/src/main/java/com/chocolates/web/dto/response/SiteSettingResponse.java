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
public class SiteSettingResponse {
    private Long id;
    private String settingKey;
    private String settingValue;
    private String groupName;
    private String description;
    private String dataType;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
