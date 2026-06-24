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
public class DashboardStatsResponse {
    private Long totalVisits;
    private Long dailyVisits;
    private Long monthlyVisits;
    private Long totalProducts;
    private Long totalPosts;
    private Long activeEvents;
    private Long totalUsers;
    private List<Object> topLikedProducts;
    private List<Object> topViewedProducts;
    private List<Object> topReadPosts;
    private Map<String, Long> visitsByDay;
    private Map<String, Long> visitsByMonth;
    private Map<String, Long> likesByProduct;
}
