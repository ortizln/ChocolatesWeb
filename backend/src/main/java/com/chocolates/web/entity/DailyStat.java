package com.chocolates.web.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "daily_stats")
public class DailyStat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private LocalDate statDate;

    private Long totalVisits;

    private Long uniqueVisitors;

    private Long productsViewed;

    private Long postsViewed;

    private Long likesReceived;

    private Long messagesReceived;

    private Long newUsers;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
