package com.chocolates.web.repository;

import com.chocolates.web.entity.PostComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostCommentRepository extends JpaRepository<PostComment, Long> {
    List<PostComment> findByPostIdOrderByCreatedAtDesc(Long postId);
    List<PostComment> findByIsApproved(Boolean isApproved);
}
