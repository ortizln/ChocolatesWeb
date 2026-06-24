package com.chocolates.web.repository;

import com.chocolates.web.entity.GalleryAlbum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GalleryAlbumRepository extends JpaRepository<GalleryAlbum, Long> {
    List<GalleryAlbum> findByActiveTrue();
}
