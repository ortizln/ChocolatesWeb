package com.chocolates.web.repository;

import com.chocolates.web.entity.NavigationMenu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NavigationMenuRepository extends JpaRepository<NavigationMenu, Long> {
    Optional<NavigationMenu> findByLocation(String location);
}
