package com.chocolates.web.repository;

import com.chocolates.web.entity.PageVisit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface PageVisitRepository extends JpaRepository<PageVisit, Long> {
    long countByVisitTimeBetween(LocalDateTime start, LocalDateTime end);
    List<PageVisit> findByVisitTimeBetween(LocalDateTime start, LocalDateTime end);

    @Query("SELECT pv.pageUrl, COUNT(pv) FROM PageVisit pv WHERE pv.visitTime BETWEEN :start AND :end GROUP BY pv.pageUrl ORDER BY COUNT(pv) DESC")
    List<Object[]> countByPageUrlBetween(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("SELECT pv.pageType, COUNT(pv) FROM PageVisit pv WHERE pv.visitTime BETWEEN :start AND :end GROUP BY pv.pageType")
    List<Object[]> countByPageTypeBetween(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("SELECT pv.country, COUNT(pv) FROM PageVisit pv WHERE pv.visitTime BETWEEN :start AND :end GROUP BY pv.country")
    List<Object[]> countByCountryBetween(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("SELECT pv.referrerUrl, COUNT(pv) FROM PageVisit pv WHERE pv.visitTime BETWEEN :start AND :end GROUP BY pv.referrerUrl ORDER BY COUNT(pv) DESC")
    List<Object[]> countByReferrerBetween(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    long countByVisitTimeBetweenAndDeviceType(LocalDateTime start, LocalDateTime end, String deviceType);
}
