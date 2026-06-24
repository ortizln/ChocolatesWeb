package com.chocolates.web.service;

import com.chocolates.web.dto.response.GalleryAlbumResponse;
import com.chocolates.web.dto.response.MediaResponse;
import com.chocolates.web.entity.GalleryAlbum;
import com.chocolates.web.entity.Media;
import com.chocolates.web.repository.GalleryAlbumRepository;
import com.chocolates.web.repository.MediaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GalleryService {

    private final GalleryAlbumRepository galleryAlbumRepository;
    private final MediaRepository mediaRepository;

    public List<GalleryAlbumResponse> getAlbums() {
        return galleryAlbumRepository.findByActiveTrue().stream()
                .map(this::toAlbumResponse)
                .collect(Collectors.toList());
    }

    public GalleryAlbumResponse getAlbumDetail(Long id) {
        GalleryAlbum album = galleryAlbumRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Álbum no encontrado con id: " + id));
        return toAlbumResponse(album);
    }

    @Transactional
    public GalleryAlbumResponse createAlbum(String name, String description, String coverImageUrl) {
        GalleryAlbum album = GalleryAlbum.builder()
                .name(name)
                .description(description)
                .coverImageUrl(coverImageUrl)
                .active(true)
                .build();
        GalleryAlbum saved = galleryAlbumRepository.save(album);
        return toAlbumResponse(saved);
    }

    @Transactional
    public GalleryAlbumResponse addMedia(Long albumId, Long mediaId) {
        GalleryAlbum album = galleryAlbumRepository.findById(albumId)
                .orElseThrow(() -> new RuntimeException("Álbum no encontrado con id: " + albumId));
        Media media = mediaRepository.findById(mediaId)
                .orElseThrow(() -> new RuntimeException("Archivo no encontrado con id: " + mediaId));
        Set<Media> mediaSet = album.getMedia();
        if (mediaSet != null) {
            mediaSet.add(media);
        }
        galleryAlbumRepository.save(album);
        return toAlbumResponse(album);
    }

    @Transactional
    public GalleryAlbumResponse removeMedia(Long albumId, Long mediaId) {
        GalleryAlbum album = galleryAlbumRepository.findById(albumId)
                .orElseThrow(() -> new RuntimeException("Álbum no encontrado con id: " + albumId));
        if (album.getMedia() != null) {
            album.getMedia().removeIf(m -> m.getId().equals(mediaId));
        }
        galleryAlbumRepository.save(album);
        return toAlbumResponse(album);
    }

    private GalleryAlbumResponse toAlbumResponse(GalleryAlbum album) {
        List<MediaResponse> mediaItems = album.getMedia() != null
                ? album.getMedia().stream().map(m -> MediaResponse.builder()
                .id(m.getId())
                .folderId(m.getFolderId())
                .fileName(m.getOriginalFilename())
                .fileType(m.getMediaType())
                .fileSize(m.getFileSize())
                .url(m.getUrl())
                .thumbnailUrl(m.getThumbnailUrl())
                .createdAt(m.getCreatedAt())
                .build()).collect(Collectors.toList())
                : Collections.emptyList();
        return GalleryAlbumResponse.builder()
                .id(album.getId())
                .name(album.getName())
                .description(album.getDescription())
                .coverImage(album.getCoverImageUrl())
                .active(album.getActive())
                .createdAt(album.getCreatedAt())
                .updatedAt(album.getUpdatedAt())
                .mediaItems(mediaItems)
                .build();
    }
}
