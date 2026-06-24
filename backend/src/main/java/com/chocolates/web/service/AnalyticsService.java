package com.chocolates.web.service;

import com.chocolates.web.dto.response.AnalyticsResponse;
import com.chocolates.web.dto.response.DashboardStatsResponse;
import com.chocolates.web.entity.DailyStat;
import com.chocolates.web.entity.MonthlyStat;
import com.chocolates.web.entity.PageVisit;
import com.chocolates.web.repository.DailyStatRepository;
import com.chocolates.web.repository.MonthlyStatRepository;
import com.chocolates.web.repository.PageVisitRepository;
import jakarta.servlet.http.HttpServletRequest;
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
public class AnalyticsService {

    private final PageVisitRepository pageVisitRepository;
    private final DailyStatRepository dailyStatRepository;
    private final MonthlyStatRepository monthlyStatRepository;

    @Transactional
    public void recordPageVisit(String pageUrl, String pageType, Long referenceId,
                                HttpServletRequest request, String sessionId) {
        String userAgent = request.getHeader("User-Agent");
        String ipAddress = request.getRemoteAddr();
        String referrer = request.getHeader("Referer");

        PageVisit visit = PageVisit.builder()
                .pageUrl(pageUrl)
                .pageType(pageType)
                .referenceId(referenceId)
                .sessionId(sessionId)
                .ipAddress(ipAddress)
                .userAgent(userAgent)
                .deviceType(extractDeviceType(userAgent))
                .browser(extractBrowser(userAgent))
                .os(extractOs(userAgent))
                .referrerUrl(referrer)
                .visitTime(LocalDateTime.now())
                .build();
        pageVisitRepository.save(visit);
    }

    @Transactional
    public void recordLike(String entityType, Long entityId) {
    }

    public DashboardStatsResponse getDashboardStats() {
        LocalDate today = LocalDate.now();
        LocalDate monthStart = today.withDayOfMonth(1);
        LocalDateTime startOfToday = today.atStartOfDay();
        LocalDateTime startOfMonth = monthStart.atStartOfDay();

        long totalVisits = pageVisitRepository.countByVisitTimeBetween(
                LocalDate.of(2020, 1, 1).atStartOfDay(), LocalDateTime.now());
        long dailyVisits = pageVisitRepository.countByVisitTimeBetween(startOfToday, LocalDateTime.now());
        long monthlyVisits = pageVisitRepository.countByVisitTimeBetween(startOfMonth, LocalDateTime.now());

        return DashboardStatsResponse.builder()
                .totalVisits(totalVisits)
                .dailyVisits(dailyVisits)
                .monthlyVisits(monthlyVisits)
                .build();
    }

    public List<DailyStat> getDailyStats(LocalDate from, LocalDate to) {
        return dailyStatRepository.findByStatDateBetween(from, to);
    }

    public MonthlyStat getMonthlyStats(int year, int month) {
        return monthlyStatRepository.findByStatYearAndStatMonth(year, month)
                .orElseThrow(() -> new RuntimeException("Estadísticas no encontradas para " + year + "/" + month));
    }

    @Transactional
    public byte[] generateReport(String type, String format) {
        throw new RuntimeException("Funcionalidad de generación de reportes no implementada");
    }

    private String extractDeviceType(String userAgent) {
        if (userAgent == null) return "Unknown";
        String ua = userAgent.toLowerCase();
        if (ua.contains("mobile") || ua.contains("iphone") || ua.contains("android")) {
            return "Mobile";
        } else if (ua.contains("tablet") || ua.contains("ipad")) {
            return "Tablet";
        }
        return "Desktop";
    }

    private String extractBrowser(String userAgent) {
        if (userAgent == null) return "Unknown";
        String ua = userAgent.toLowerCase();
        if (ua.contains("edg") || ua.contains("edge")) return "Edge";
        if (ua.contains("chrome") && !ua.contains("edg")) return "Chrome";
        if (ua.contains("firefox")) return "Firefox";
        if (ua.contains("safari") && !ua.contains("chrome")) return "Safari";
        if (ua.contains("opera") || ua.contains("opr")) return "Opera";
        return "Other";
    }

    private String extractOs(String userAgent) {
        if (userAgent == null) return "Unknown";
        String ua = userAgent.toLowerCase();
        if (ua.contains("windows")) return "Windows";
        if (ua.contains("mac os") || ua.contains("macintosh")) return "macOS";
        if (ua.contains("linux")) return "Linux";
        if (ua.contains("android")) return "Android";
        if (ua.contains("iphone") || ua.contains("ios")) return "iOS";
        return "Other";
    }
}
