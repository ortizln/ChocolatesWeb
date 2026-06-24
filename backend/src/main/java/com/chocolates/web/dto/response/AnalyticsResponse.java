package com.chocolates.web.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticsResponse {
    private Map<String, Long> pageVisits;
    private Map<String, Long> deviceBreakdown;
    private Map<String, Long> browserBreakdown;
    private Map<String, Long> countryBreakdown;
    private List<Map<String, Object>> dailyStats;
    private List<Map<String, Object>> monthlyStats;
}
