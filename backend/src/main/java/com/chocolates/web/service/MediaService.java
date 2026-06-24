package com.chocolates.web.service;

import com.chocolates.web.dto.request.MediaRequest;
import com.chocolates.web.dto.response.MediaResponse;
import com.chocolates.web.entity.Media;
import com.chocolates.web.entity.MediaFolder;
import com.chocolates.web.repository.MediaFolderRepository;
import com.chocolates.web.repository.MediaRepository;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class MediaService {

    private final MediaRepository mediaRepository;
    private final MediaFolderRepository mediaFolderRepository;
    private MinioClient minioClient;

    public MediaService(MediaRepository mediaRepository, MediaFolderRepository mediaFolderRepository) {
        this.mediaRepository = mediaRepository;
        this.mediaFolderRepository = mediaFolderRepository;
    }

    @Autowired(required = false)
    public void setMinioClient(MinioClient minioClient) {
        this.minioClient = minioClient;
    }

    @Value("${app.minio.bucket:chocolates-media}")
    private String minioBucket;

    @Value("${app.upload.dir:uploads}")
    private String uploadDir;

    @Value("${app.minio.endpoint:}")
    private String minioEndpoint;

    @Transactional
    public MediaResponse upload(MultipartFile file, MediaRequest request) {
        try {
            String originalFilename = file.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            String filename = UUID.randomUUID() + extension;
            String url;
            String storageType;

            if (minioEndpoint != null && !minioEndpoint.isBlank()) {
                try {
                    minioClient.putObject(PutObjectArgs.builder()
                            .bucket(minioBucket)
                            .object(filename)
                            .stream(file.getInputStream(), file.getSize(), -1)
                            .contentType(file.getContentType())
                            .build());
                    url = minioEndpoint + "/" + minioBucket + "/" + filename;
                    storageType = "MINIO";
                } catch (Exception e) {
                    Path uploadPath = Paths.get(uploadDir);
                    if (!Files.exists(uploadPath)) {
                        Files.createDirectories(uploadPath);
                    }
                    Path filePath = uploadPath.resolve(filename);
                    Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                    url = "/uploads/" + filename;
                    storageType = "LOCAL";
                }
            } else {
                Path uploadPath = Paths.get(uploadDir);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }
                Path filePath = uploadPath.resolve(filename);
                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                url = "/uploads/" + filename;
                storageType = "LOCAL";
            }

            Media media = Media.builder()
                    .folderId(request.getFolderId())
                    .filename(filename)
                    .originalFilename(originalFilename)
                    .url(url)
                    .mediaType(file.getContentType() != null ? file.getContentType().split("/")[0] : "unknown")
                    .mimeType(file.getContentType())
                    .fileSize(file.getSize())
                    .altText(request.getAltText())
                    .title(request.getTitle())
                    .description(request.getDescription())
                    .storageType(storageType)
                    .build();
            Media saved = mediaRepository.save(media);
            return toMediaResponse(saved);
        } catch (Exception e) {
            throw new RuntimeException("Error al subir archivo: " + e.getMessage());
        }
    }

    public List<MediaResponse> getByFolder(Long folderId) {
        List<Media> mediaList;
        if (folderId != null) {
            mediaList = mediaRepository.findByFolderId(folderId);
        } else {
            mediaList = mediaRepository.findAll();
        }
        return mediaList.stream()
                .map(this::toMediaResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public MediaFolder createFolder(String name, Long parentId) {
        if (mediaFolderRepository.findByName(name).isPresent()) {
            throw new RuntimeException("Ya existe una carpeta con el nombre: " + name);
        }
        MediaFolder folder = MediaFolder.builder()
                .name(name)
                .parentId(parentId)
                .build();
        return mediaFolderRepository.save(folder);
    }

    @Transactional
    public MediaResponse move(Long mediaId, Long folderId) {
        Media media = mediaRepository.findById(mediaId)
                .orElseThrow(() -> new RuntimeException("Archivo no encontrado con id: " + mediaId));
        media.setFolderId(folderId);
        Media saved = mediaRepository.save(media);
        return toMediaResponse(saved);
    }

    @Transactional
    public void delete(Long id) {
        Media media = mediaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Archivo no encontrado con id: " + id));
        try {
            if ("LOCAL".equals(media.getStorageType())) {
                Path filePath = Paths.get(uploadDir).resolve(media.getFilename());
                Files.deleteIfExists(filePath);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error al eliminar archivo físico: " + e.getMessage());
        }
        mediaRepository.delete(media);
    }

    @Transactional
    public List<MediaResponse> uploadMultiple(List<MultipartFile> files) {
        return files.stream().map(file -> {
            try {
                return upload(file, new MediaRequest());
            } catch (Exception e) {
                throw new RuntimeException("Error al subir archivo: " + file.getOriginalFilename() + " - " + e.getMessage());
            }
        }).collect(Collectors.toList());
    }

    @Transactional
    public MediaResponse update(Long id, MediaRequest request) {
        Media media = mediaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Archivo no encontrado con id: " + id));
        if (request.getAltText() != null) media.setAltText(request.getAltText());
        if (request.getTitle() != null) media.setTitle(request.getTitle());
        if (request.getDescription() != null) media.setDescription(request.getDescription());
        if (request.getFolderId() != null) media.setFolderId(request.getFolderId());
        Media saved = mediaRepository.save(media);
        return toMediaResponse(saved);
    }

    public List<MediaResponse> search(String query) {
        List<Media> results = mediaRepository.findByOriginalFilenameContaining(query);
        results.addAll(mediaRepository.findByAltTextContaining(query));
        return results.stream()
                .distinct()
                .map(this::toMediaResponse)
                .collect(Collectors.toList());
    }

    private MediaResponse toMediaResponse(Media media) {
        String folderPath = null;
        if (media.getFolder() != null) {
            folderPath = media.getFolder().getPath();
        }
        return MediaResponse.builder()
                .id(media.getId())
                .folderId(media.getFolderId())
                .folderPath(folderPath)
                .fileName(media.getOriginalFilename())
                .filePath(media.getFilename())
                .fileType(media.getMediaType())
                .fileSize(media.getFileSize())
                .altText(media.getAltText())
                .title(media.getTitle())
                .description(media.getDescription())
                .width(media.getWidth())
                .height(media.getHeight())
                .url(media.getUrl())
                .thumbnailUrl(media.getThumbnailUrl())
                .createdAt(media.getCreatedAt())
                .updatedAt(media.getUpdatedAt())
                .build();
    }
}
