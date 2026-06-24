package com.chocolates.web.service;

import com.chocolates.web.dto.request.BannerRequest;
import com.chocolates.web.dto.response.BannerResponse;
import com.chocolates.web.entity.Banner;
import com.chocolates.web.repository.BannerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BannerService {

    private final BannerRepository bannerRepository;

    public List<BannerResponse> getActiveByType(String bannerType) {
        LocalDateTime now = LocalDateTime.now();
        List<Banner> banners = bannerRepository.findByActiveTrueAndBannerTypeOrderBySortOrder(bannerType);
        return banners.stream()
                .filter(b -> (b.getStartDate() == null || !b.getStartDate().isAfter(now))
                        && (b.getEndDate() == null || !b.getEndDate().isBefore(now)))
                .map(this::toBannerResponse)
                .collect(Collectors.toList());
    }

    public List<BannerResponse> getAll() {
        return bannerRepository.findAll().stream()
                .map(this::toBannerResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public BannerResponse create(BannerRequest request) {
        Banner banner = Banner.builder()
                .name(request.getName())
                .bannerType(request.getBannerType())
                .imageUrl(request.getImageUrl())
                .mobileImageUrl(request.getMobileImageUrl())
                .videoUrl(request.getVideoUrl())
                .title(request.getTitle())
                .subtitle(request.getSubtitle())
                .description(request.getDescription())
                .linkUrl(request.getLinkUrl())
                .linkText(request.getLinkText())
                .sortOrder(request.getSortOrder() != null ? request.getSortOrder() : 0)
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .active(request.getActive() != null ? request.getActive() : true)
                .build();
        Banner saved = bannerRepository.save(banner);
        return toBannerResponse(saved);
    }

    @Transactional
    public BannerResponse update(Long id, BannerRequest request) {
        Banner banner = bannerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Banner no encontrado con id: " + id));
        banner.setName(request.getName());
        banner.setBannerType(request.getBannerType());
        banner.setImageUrl(request.getImageUrl());
        banner.setMobileImageUrl(request.getMobileImageUrl());
        banner.setVideoUrl(request.getVideoUrl());
        banner.setTitle(request.getTitle());
        banner.setSubtitle(request.getSubtitle());
        banner.setDescription(request.getDescription());
        banner.setLinkUrl(request.getLinkUrl());
        banner.setLinkText(request.getLinkText());
        banner.setSortOrder(request.getSortOrder());
        banner.setStartDate(request.getStartDate());
        banner.setEndDate(request.getEndDate());
        banner.setActive(request.getActive());
        Banner saved = bannerRepository.save(banner);
        return toBannerResponse(saved);
    }

    @Transactional
    public void delete(Long id) {
        Banner banner = bannerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Banner no encontrado con id: " + id));
        bannerRepository.delete(banner);
    }

    @Transactional
    public void reorder(List<Long> bannerIds) {
        for (int i = 0; i < bannerIds.size(); i++) {
            Long bannerId = bannerIds.get(i);
            Banner banner = bannerRepository.findById(bannerId)
                    .orElseThrow(() -> new RuntimeException("Banner no encontrado con id: " + bannerId));
            banner.setSortOrder(i);
            bannerRepository.save(banner);
        }
    }

    private BannerResponse toBannerResponse(Banner banner) {
        return BannerResponse.builder()
                .id(banner.getId())
                .name(banner.getName())
                .bannerType(banner.getBannerType())
                .imageUrl(banner.getImageUrl())
                .mobileImageUrl(banner.getMobileImageUrl())
                .videoUrl(banner.getVideoUrl())
                .title(banner.getTitle())
                .subtitle(banner.getSubtitle())
                .description(banner.getDescription())
                .linkUrl(banner.getLinkUrl())
                .linkText(banner.getLinkText())
                .sortOrder(banner.getSortOrder())
                .startDate(banner.getStartDate())
                .endDate(banner.getEndDate())
                .active(banner.getActive())
                .createdAt(banner.getCreatedAt())
                .updatedAt(banner.getUpdatedAt())
                .build();
    }
}
