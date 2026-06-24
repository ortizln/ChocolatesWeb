package com.chocolates.web.repository;

import com.chocolates.web.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Long>, JpaSpecificationExecutor<Event> {
    Optional<Event> findBySlug(String slug);
    List<Event> findByStatus(String status);
    List<Event> findByEventType(String eventType);
    List<Event> findByStartDateBetween(LocalDateTime start, LocalDateTime end);
    List<Event> findByStartDateAfter(LocalDateTime date);
}
