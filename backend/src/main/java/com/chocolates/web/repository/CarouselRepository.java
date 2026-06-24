package com.chocolates.web.repository;

import com.chocolates.web.entity.Carousel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CarouselRepository extends JpaRepository<Carousel, Long> {
    Optional<Carousel> findByLocationAndActiveTrue(String location);
}
