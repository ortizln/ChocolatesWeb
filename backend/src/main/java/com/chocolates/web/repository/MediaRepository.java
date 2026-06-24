package com.chocolates.web.repository;

import com.chocolates.web.entity.Media;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MediaRepository extends JpaRepository<Media, Long> {
    List<Media> findByFolderId(Long folderId);
    List<Media> findByMediaType(String mediaType);
    List<Media> findByFilenameContaining(String filename);
    List<Media> findByOriginalFilenameContaining(String filename);
    List<Media> findByAltTextContaining(String altText);
}
