package com.chocolates.web.service;

import com.chocolates.web.dto.response.SiteSettingResponse;
import com.chocolates.web.entity.SiteSetting;
import com.chocolates.web.repository.SiteSettingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SettingsService {

    private final SiteSettingRepository siteSettingRepository;

    public List<SiteSettingResponse> getAllSettings() {
        return siteSettingRepository.findAll().stream()
                .map(this::toSettingResponse)
                .collect(Collectors.toList());
    }

    public SiteSettingResponse getSetting(String key) {
        SiteSetting setting = siteSettingRepository.findBySettingKey(key)
                .orElseThrow(() -> new RuntimeException("Configuración no encontrada: " + key));
        return toSettingResponse(setting);
    }

    @Transactional
    public SiteSettingResponse updateSetting(String key, String value) {
        SiteSetting setting = siteSettingRepository.findBySettingKey(key)
                .orElseGet(() -> SiteSetting.builder()
                        .settingKey(key)
                        .build());
        setting.setSettingValue(value);
        SiteSetting saved = siteSettingRepository.save(setting);
        return toSettingResponse(saved);
    }

    @Transactional
    public List<SiteSettingResponse> updateMultiple(Map<String, String> settings) {
        return settings.entrySet().stream()
                .map(entry -> updateSetting(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

    private SiteSettingResponse toSettingResponse(SiteSetting setting) {
        return SiteSettingResponse.builder()
                .id(setting.getId())
                .settingKey(setting.getSettingKey())
                .settingValue(setting.getSettingValue())
                .description(setting.getDescription())
                .createdAt(setting.getCreatedAt())
                .updatedAt(setting.getUpdatedAt())
                .build();
    }
}
