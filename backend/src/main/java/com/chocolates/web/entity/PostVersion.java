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
@Table(name = "post_versions")
public class PostVersion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long postId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "postId", insertable = false, updatable = false)
    private Post post;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    private String summary;

    private String changeNotes;

    private Integer versionNumber;

    private Long savedBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "savedBy", insertable = false, updatable = false)
    private User savedByUser;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
