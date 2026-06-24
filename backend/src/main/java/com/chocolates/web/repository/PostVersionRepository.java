package com.chocolates.web.repository;

import com.chocolates.web.entity.PostVersion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostVersionRepository extends JpaRepository<PostVersion, Long> {
    List<PostVersion> findByPostIdOrderByVersionNumberDesc(Long postId);
}
