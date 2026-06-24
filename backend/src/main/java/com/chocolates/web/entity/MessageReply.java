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
@Table(name = "message_replies")
public class MessageReply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long messageId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "messageId", insertable = false, updatable = false)
    private ContactMessage message;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String reply;

    private Long repliedBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "repliedBy", insertable = false, updatable = false)
    private User repliedByUser;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
