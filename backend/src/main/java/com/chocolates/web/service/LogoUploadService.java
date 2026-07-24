package com.chocolates.web.service;

import com.chocolates.web.entity.SiteSetting;
import com.chocolates.web.repository.SiteSettingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class LogoUploadService {

    private final SiteSettingRepository repository;

    @Value("${app.upload-dir:${app.upload.dir:./uploads}}")
    private String uploadDir;

    public Map<String, String> uploadLogo(MultipartFile file, String variant) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Archivo vacio");
        }
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IllegalArgumentException("Debe ser una imagen");
        }
        if (file.getSize() > 2 * 1024 * 1024) {
            throw new IllegalArgumentException("Maximo 2MB");
        }

        Path logosDir = Paths.get(uploadDir, "logos");
        Files.createDirectories(logosDir);

        String ext = getExtension(file.getOriginalFilename());
        String filename = "logo-" + variant + ext;
        Path target = logosDir.resolve(filename);

        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

        String publicUrl = "/uploads/logos/" + filename;

        String key = "logo" + capitalize(variant) + "Url";
        SiteSetting setting = repository.findBySettingKey(key)
                .orElseGet(() -> SiteSetting.builder()
                        .settingKey(key)
                        .settingType("image")
                        .description("Logo " + variant + " del sitio")
                        .build());
        setting.setSettingValue(publicUrl);
        repository.save(setting);

        return Map.of(
                "variant", variant,
                "url", publicUrl,
                "key", key
        );
    }

    public void deleteLogo(String variant) {
        String key = "logo" + capitalize(variant) + "Url";
        repository.findBySettingKey(key).ifPresent(s -> {
            try {
                String url = s.getSettingValue();
                if (url != null && url.startsWith("/uploads/")) {
                    Path p = Paths.get(uploadDir, url.replace("/uploads/", ""));
                    Files.deleteIfExists(p);
                }
            } catch (IOException ignored) {}
            repository.delete(s);
        });
    }

    private String getExtension(String name) {
        if (name == null) return ".png";
        int dot = name.lastIndexOf('.');
        return dot >= 0 ? name.substring(dot).toLowerCase() : ".png";
    }

    private String capitalize(String s) {
        return s == null || s.isEmpty() ? s : Character.toUpperCase(s.charAt(0)) + s.substring(1);
    }
}