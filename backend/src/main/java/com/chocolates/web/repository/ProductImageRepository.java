package com.chocolates.web.repository;

import com.chocolates.web.entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
    List<ProductImage> findByProductIdOrderBySortOrder(Long productId);
    Optional<ProductImage> findByProductIdAndIsPrimaryTrue(Long productId);
}
