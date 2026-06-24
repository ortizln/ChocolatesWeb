package com.chocolates.web.service;

import com.chocolates.web.dto.request.CarouselItemRequest;
import com.chocolates.web.dto.request.CarouselRequest;
import com.chocolates.web.dto.response.CarouselItemResponse;
import com.chocolates.web.dto.response.CarouselResponse;
import com.chocolates.web.entity.Carousel;
import com.chocolates.web.entity.CarouselItem;
import com.chocolates.web.repository.CarouselItemRepository;
import com.chocolates.web.repository.CarouselRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CarouselService {

    private final CarouselRepository carouselRepository;
    private final CarouselItemRepository carouselItemRepository;

    public CarouselResponse getActiveByLocation(String location) {
        Carousel carousel = carouselRepository.findByLocationAndActiveTrue(location)
                .orElseThrow(() -> new RuntimeException("Carrusel no encontrado en ubicación: " + location));
        return toCarouselResponse(carousel);
    }

    public List<CarouselResponse> getAll() {
        return carouselRepository.findAll().stream()
                .map(this::toCarouselResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public CarouselResponse create(CarouselRequest request) {
        Carousel carousel = Carousel.builder()
                .name(request.getName())
                .location(request.getLocation())
                .autoPlay(request.getAutoPlay() != null ? request.getAutoPlay() : true)
                .intervalMs(request.getIntervalMs() != null ? request.getIntervalMs() : 5000)
                .active(request.getActive() != null ? request.getActive() : true)
                .build();
        Carousel saved = carouselRepository.save(carousel);
        return toCarouselResponse(saved);
    }

    @Transactional
    public CarouselResponse update(Long id, CarouselRequest request) {
        Carousel carousel = carouselRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Carrusel no encontrado con id: " + id));
        carousel.setName(request.getName());
        carousel.setLocation(request.getLocation());
        carousel.setAutoPlay(request.getAutoPlay());
        carousel.setIntervalMs(request.getIntervalMs());
        carousel.setActive(request.getActive());
        Carousel saved = carouselRepository.save(carousel);
        return toCarouselResponse(saved);
    }

    @Transactional
    public void delete(Long id) {
        Carousel carousel = carouselRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Carrusel no encontrado con id: " + id));
        carouselRepository.delete(carousel);
    }

    @Transactional
    public CarouselResponse addItem(Long carouselId, CarouselItemRequest request) {
        Carousel carousel = carouselRepository.findById(carouselId)
                .orElseThrow(() -> new RuntimeException("Carrusel no encontrado con id: " + carouselId));
        CarouselItem item = CarouselItem.builder()
                .carouselId(carouselId)
                .title(request.getTitle())
                .subtitle(request.getSubtitle())
                .description(request.getDescription())
                .imageUrl(request.getImageUrl())
                .videoUrl(request.getVideoUrl())
                .linkUrl(request.getLinkUrl())
                .linkText(request.getLinkText())
                .sortOrder(request.getSortOrder() != null ? request.getSortOrder() : 0)
                .active(request.getActive() != null ? request.getActive() : true)
                .build();
        carouselItemRepository.save(item);
        return toCarouselResponse(carouselRepository.findById(carouselId).orElse(carousel));
    }

    @Transactional
    public CarouselItemResponse updateItem(Long itemId, CarouselItemRequest request) {
        CarouselItem item = carouselItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item de carrusel no encontrado con id: " + itemId));
        item.setTitle(request.getTitle());
        item.setSubtitle(request.getSubtitle());
        item.setDescription(request.getDescription());
        item.setImageUrl(request.getImageUrl());
        item.setVideoUrl(request.getVideoUrl());
        item.setLinkUrl(request.getLinkUrl());
        item.setLinkText(request.getLinkText());
        item.setSortOrder(request.getSortOrder());
        item.setActive(request.getActive());
        CarouselItem saved = carouselItemRepository.save(item);
        return toItemResponse(saved);
    }

    @Transactional
    public void removeItem(Long itemId) {
        CarouselItem item = carouselItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item de carrusel no encontrado con id: " + itemId));
        carouselItemRepository.delete(item);
    }

    private CarouselResponse toCarouselResponse(Carousel carousel) {
        List<CarouselItemResponse> items = carousel.getItems() != null
                ? carousel.getItems().stream().map(this::toItemResponse).collect(Collectors.toList())
                : Collections.emptyList();
        return CarouselResponse.builder()
                .id(carousel.getId())
                .name(carousel.getName())
                .location(carousel.getLocation())
                .autoPlay(carousel.getAutoPlay())
                .intervalMs(carousel.getIntervalMs())
                .active(carousel.getActive())
                .createdAt(carousel.getCreatedAt())
                .updatedAt(carousel.getUpdatedAt())
                .items(items)
                .build();
    }

    private CarouselItemResponse toItemResponse(CarouselItem item) {
        return CarouselItemResponse.builder()
                .id(item.getId())
                .carouselId(item.getCarouselId())
                .title(item.getTitle())
                .subtitle(item.getSubtitle())
                .description(item.getDescription())
                .imageUrl(item.getImageUrl())
                .videoUrl(item.getVideoUrl())
                .linkUrl(item.getLinkUrl())
                .linkText(item.getLinkText())
                .sortOrder(item.getSortOrder())
                .active(item.getActive())
                .createdAt(item.getCreatedAt())
                .build();
    }
}
