package com.chocolates.web.repository;

import com.chocolates.web.entity.MonthlyStat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MonthlyStatRepository extends JpaRepository<MonthlyStat, Long> {
    Optional<MonthlyStat> findByStatYearAndStatMonth(Integer statYear, Integer statMonth);
}
