package com.chocolates.web.service;

import com.chocolates.web.dto.response.DashboardStatsResponse;
import com.chocolates.web.entity.DailyStat;
import com.chocolates.web.entity.MonthlyStat;
import com.chocolates.web.entity.PageVisit;
import com.chocolates.web.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DashboardService {

    private final PageVisitRepository pageVisitRepository;
    private final DailyStatRepository dailyStatRepository;
    private final MonthlyStatRepository monthlyStatRepository;
    private final ProductRepository productRepository;
    private final PostRepository postRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final ContactMessageRepository contactMessageRepository;

    public DashboardStatsResponse getDashboardStats() {
        LocalDate today = LocalDate.now();
        LocalDate monthStart = today.withDayOfMonth(1);
        LocalDateTime startOfToday = today.atStartOfDay();
        LocalDateTime startOfMonth = monthStart.atStartOfDay();
        LocalDateTime allTimeStart = LocalDate.of(2020, 1, 1).atStartOfDay();

        long totalVisits = pageVisitRepository.countByVisitTimeBetween(allTimeStart, LocalDateTime.now());
        long dailyVisits = pageVisitRepository.countByVisitTimeBetween(startOfToday, LocalDateTime.now());
        long monthlyVisits = pageVisitRepository.countByVisitTimeBetween(startOfMonth, LocalDateTime.now());
        long totalProducts = productRepository.count();
        long totalPosts = postRepository.count();
        long activeEvents = eventRepository.findByStatus("PUBLISHED").size();
        long totalUsers = userRepository.count();
        long unreadMessages = contactMessageRepository.findByStatusOrderByCreatedAtDesc("UNREAD").size();

        List<Map<String, Object>> topProducts = new ArrayList<>();
        List<Object> topViewed = new ArrayList<>();
        List<Object> topRead = new ArrayList<>();

        List<DailyStat> dailyStats = dailyStatRepository.findByStatDateBetween(
                today.minusDays(30), today);
        Map<String, Long> visitsByDay = dailyStats.stream()
                .collect(Collectors.toMap(
                        ds -> ds.getStatDate().toString(),
                        ds -> ds.getTotalVisits() != null ? ds.getTotalVisits() : 0L));

        MonthlyStat currentMonth = monthlyStatRepository
                .findByStatYearAndStatMonth(today.getYear(), today.getMonthValue())
                .orElse(null);
        Map<String, Long> visitsByMonth = new HashMap<>();
        if (currentMonth != null) {
            visitsByMonth.put(today.getYear() + "-" + today.getMonthValue(),
                    currentMonth.getTotalVisits() != null ? currentMonth.getTotalVisits() : 0L);
        }

        return DashboardStatsResponse.builder()
                .totalVisits(totalVisits)
                .dailyVisits(dailyVisits)
                .monthlyVisits(monthlyVisits)
                .totalProducts(totalProducts)
                .totalPosts(totalPosts)
                .activeEvents((long) activeEvents)
                .totalUsers(totalUsers)
                .topLikedProducts(topProducts.stream().map(p -> (Object) p).collect(Collectors.toList()))
                .topViewedProducts(topViewed)
                .topReadPosts(topRead)
                .visitsByDay(visitsByDay)
                .visitsByMonth(visitsByMonth)
                .build();
    }

    public Map<String, Object> getChartsData() {
        Map<String, Object> charts = new HashMap<>();
        LocalDate today = LocalDate.now();
        List<DailyStat> last30Days = dailyStatRepository.findByStatDateBetween(
                today.minusDays(30), today);
        charts.put("dailyVisits", last30Days.stream()
                .collect(Collectors.toMap(ds -> ds.getStatDate().toString(),
                        ds -> ds.getTotalVisits() != null ? ds.getTotalVisits() : 0L)));
        charts.put("deviceBreakdown", Map.of(
                "Desktop", pageVisitRepository.countByVisitTimeBetweenAndDeviceType(
                        today.minusDays(30).atStartOfDay(), LocalDateTime.now(), "Desktop"),
                "Mobile", pageVisitRepository.countByVisitTimeBetweenAndDeviceType(
                        today.minusDays(30).atStartOfDay(), LocalDateTime.now(), "Mobile"),
                "Tablet", pageVisitRepository.countByVisitTimeBetweenAndDeviceType(
                        today.minusDays(30).atStartOfDay(), LocalDateTime.now(), "Tablet")));
        return charts;
    }
}
