package com.chocolates.web.repository;

import com.chocolates.web.entity.DailyStat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DailyStatRepository extends JpaRepository<DailyStat, Long> {
    List<DailyStat> findByStatDateBetween(LocalDate start, LocalDate end);
    Optional<DailyStat> findByStatDate(LocalDate statDate);
}
