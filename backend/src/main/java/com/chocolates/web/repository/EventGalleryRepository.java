package com.chocolates.web.repository;

import com.chocolates.web.entity.EventGallery;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventGalleryRepository extends JpaRepository<EventGallery, Long> {
    List<EventGallery> findByEventIdOrderBySortOrder(Long eventId);
}
