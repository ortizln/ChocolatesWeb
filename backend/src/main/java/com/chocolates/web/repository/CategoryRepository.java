package com.chocolates.web.repository;

import com.chocolates.web.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findBySlug(String slug);
    List<Category> findByActiveTrueOrderBySortOrder();
    List<Category> findByParentId(Long parentId);
}
