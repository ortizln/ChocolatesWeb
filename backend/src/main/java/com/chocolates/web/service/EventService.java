package com.chocolates.web.service;

import com.chocolates.web.dto.request.EventRequest;
import com.chocolates.web.dto.response.EventResponse;
import com.chocolates.web.dto.response.PagedResponse;
import com.chocolates.web.dto.response.ProductImageResponse;
import com.chocolates.web.entity.Event;
import com.chocolates.web.repository.EventRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EventService {

    private final EventRepository eventRepository;

    public PagedResponse<EventResponse> getPublishedEvents(int page, int size, String type) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "startDate"));
        Specification<Event> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            predicates.add(cb.equal(root.get("status"), "PUBLISHED"));
            predicates.add(cb.greaterThan(root.get("startDate"), LocalDateTime.now()));
            if (type != null && !type.isBlank()) {
                predicates.add(cb.equal(root.get("eventType"), type));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
        Page<Event> eventPage = eventRepository.findAll(spec, pageable);
        return toPagedResponse(eventPage);
    }

    @Transactional
    public EventResponse getEventBySlug(String slug) {
        Event event = eventRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Evento no encontrado con slug: " + slug));
        event.setViewsCount(event.getViewsCount() == null ? 1 : event.getViewsCount() + 1);
        eventRepository.save(event);
        return toEventResponse(event);
    }

    public PagedResponse<EventResponse> getAllEvents(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Event> eventPage = eventRepository.findAll(pageable);
        return toPagedResponse(eventPage);
    }

    @Transactional
    public EventResponse createEvent(EventRequest request) {
        Event event = Event.builder()
                .title(request.getTitle())
                .slug(request.getSlug() != null ? request.getSlug() :
                        request.getTitle().toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("^-|-$", ""))
                .eventType(request.getEventType())
                .description(request.getDescription())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .location(request.getLocation())
                .address(request.getAddress())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .featuredImage(request.getFeaturedImage())
                .status(request.getStatus() != null ? request.getStatus() : "DRAFT")
                .viewsCount(0)
                .build();
        Event saved = eventRepository.save(event);
        return toEventResponse(saved);
    }

    @Transactional
    public EventResponse updateEvent(Long id, EventRequest request) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento no encontrado con id: " + id));
        event.setTitle(request.getTitle());
        event.setSlug(request.getSlug());
        event.setEventType(request.getEventType());
        event.setDescription(request.getDescription());
        event.setStartDate(request.getStartDate());
        event.setEndDate(request.getEndDate());
        event.setLocation(request.getLocation());
        event.setAddress(request.getAddress());
        event.setLatitude(request.getLatitude());
        event.setLongitude(request.getLongitude());
        event.setFeaturedImage(request.getFeaturedImage());
        event.setStatus(request.getStatus());
        Event saved = eventRepository.save(event);
        return toEventResponse(saved);
    }

    @Transactional
    public void deleteEvent(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento no encontrado con id: " + id));
        eventRepository.delete(event);
    }

    private PagedResponse<EventResponse> toPagedResponse(Page<Event> page) {
        List<EventResponse> content = page.getContent().stream()
                .map(this::toEventResponse)
                .collect(Collectors.toList());
        return PagedResponse.<EventResponse>builder()
                .content(content)
                .page(page.getNumber())
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .last(page.isLast())
                .build();
    }

    private EventResponse toEventResponse(Event event) {
        List<ProductImageResponse> gallery = event.getGallery() != null
                ? event.getGallery().stream().map(g -> ProductImageResponse.builder()
                .imageUrl(g.getUrl())
                .build()).collect(Collectors.toList())
                : Collections.emptyList();
        return EventResponse.builder()
                .id(event.getId())
                .title(event.getTitle())
                .slug(event.getSlug())
                .eventType(event.getEventType())
                .description(event.getDescription())
                .startDate(event.getStartDate())
                .endDate(event.getEndDate())
                .location(event.getLocation())
                .address(event.getAddress())
                .latitude(event.getLatitude())
                .longitude(event.getLongitude())
                .featuredImage(event.getFeaturedImage())
                .status(event.getStatus())
                .registrationCount(event.getRegistrations() != null ? (long) event.getRegistrations().size() : 0L)
                .createdAt(event.getCreatedAt())
                .updatedAt(event.getUpdatedAt())
                .gallery(gallery)
                .build();
    }
}
