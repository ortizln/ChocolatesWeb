package com.chocolates.web.repository;

import com.chocolates.web.entity.NavigationItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NavigationItemRepository extends JpaRepository<NavigationItem, Long> {
    List<NavigationItem> findByMenuIdAndParentIdIsNullOrderBySortOrder(Long menuId);
    List<NavigationItem> findByParentIdOrderBySortOrder(Long parentId);
}
