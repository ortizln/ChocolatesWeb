package com.chocolates.web.repository;

import com.chocolates.web.entity.Banner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface BannerRepository extends JpaRepository<Banner, Long> {
    List<Banner> findByActiveTrueAndBannerTypeOrderBySortOrder(String bannerType);
    List<Banner> findByActiveTrueAndStartDateBeforeAndEndDateAfter(LocalDateTime startDate, LocalDateTime endDate);
}
