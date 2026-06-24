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
@Table(name = "carousel_items")
public class CarouselItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long carouselId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "carouselId", insertable = false, updatable = false)
    private Carousel carousel;

    private String title;

    private String subtitle;

    private String description;

    private String imageUrl;

    private String videoUrl;

    private String linkUrl;

    private String linkText;

    private Integer sortOrder;

    private Boolean active;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
