package com.chocolates.web.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "page_visits")
public class PageVisit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String pageUrl;

    private String pageType;

    private Long referenceId;

    private String sessionId;

    private String ipAddress;

    @Column(columnDefinition = "TEXT")
    private String userAgent;

    private String deviceType;

    private String browser;

    private String browserVersion;

    private String os;

    private String country;

    private String city;

    private Double latitude;

    private Double longitude;

    private String referrerUrl;

    @Column(nullable = false)
    private LocalDateTime visitTime;
}
