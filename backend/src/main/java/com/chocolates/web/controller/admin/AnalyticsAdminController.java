package com.chocolates.web.controller.admin;

import com.chocolates.web.dto.response.ApiResponse;
import com.chocolates.web.service.AnalyticsService;
import com.chocolates.web.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/v1/admin/analytics")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN', 'MARKETING')")
public class AnalyticsAdminController {

    private final AnalyticsService analyticsService;
    private final ReportService reportService;

    @GetMapping("/daily")
    public ResponseEntity<ApiResponse> daily(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        return ResponseEntity.ok(ApiResponse.success(analyticsService.getDailyStats(from, to)));
    }

    @GetMapping("/monthly")
    public ResponseEntity<ApiResponse> monthly(
            @RequestParam int year,
            @RequestParam int month) {
        return ResponseEntity.ok(ApiResponse.success(analyticsService.getMonthlyStats(year, month)));
    }

    @GetMapping("/export")
    public ResponseEntity<byte[]> export(
            @RequestParam String type,
            @RequestParam(defaultValue = "PDF") String format) {
        byte[] report;
        if ("daily".equalsIgnoreCase(type)) {
            report = reportService.generateDailyReport(LocalDate.now(), format);
        } else if ("monthly".equalsIgnoreCase(type)) {
            report = reportService.generateMonthlyReport(LocalDate.now().getYear(), LocalDate.now().getMonthValue(), format);
        } else {
            report = new byte[0];
        }

        MediaType mediaType = "PDF".equalsIgnoreCase(format)
                ? MediaType.APPLICATION_PDF
                : MediaType.APPLICATION_OCTET_STREAM;
        String extension = "PDF".equalsIgnoreCase(format) ? "pdf" : "xlsx";

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=reporte." + extension)
                .contentType(mediaType)
                .body(report);
    }
}
