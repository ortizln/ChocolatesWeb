package com.chocolates.web.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "monthly_stats", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"statYear", "statMonth"})
})
public class MonthlyStat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer statYear;

    @Column(nullable = false)
    private Integer statMonth;

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
