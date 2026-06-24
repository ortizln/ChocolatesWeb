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
public class MediaResponse {
    private Long id;
    private Long folderId;
    private String folderPath;
    private String fileName;
    private String filePath;
    private String fileType;
    private Long fileSize;
    private String altText;
    private String title;
    private String description;
    private Integer width;
    private Integer height;
    private String url;
    private String thumbnailUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
