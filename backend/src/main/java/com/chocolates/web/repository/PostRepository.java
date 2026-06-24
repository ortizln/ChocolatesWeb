package com.chocolates.web.repository;

import com.chocolates.web.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long>, JpaSpecificationExecutor<Post> {
    Optional<Post> findBySlug(String slug);
    List<Post> findByStatus(String status);
    List<Post> findByPostType(String postType);
    List<Post> findByAuthorId(Long authorId);
    List<Post> findByScheduledAtBefore(LocalDateTime dateTime);
}
