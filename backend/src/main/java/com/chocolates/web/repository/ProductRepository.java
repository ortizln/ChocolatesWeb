package com.chocolates.web.repository;

import com.chocolates.web.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    Optional<Product> findBySlug(String slug);
    List<Product> findByStatus(String status);
    List<Product> findByCategoryId(Long categoryId);
    List<Product> findTop10ByOrderByViewsCountDesc();
    List<Product> findTop10ByOrderByLikesCountDesc();
    Optional<Product> findByCode(String code);
    List<Product> findByIsFeaturedTrueAndStatus(String status);
}
