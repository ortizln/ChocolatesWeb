package com.chocolates.web.repository;

import com.chocolates.web.entity.SiteSocialLink;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SiteSocialLinkRepository extends JpaRepository<SiteSocialLink, Long> {
    List<SiteSocialLink> findByActiveTrueOrderBySortOrder();
}
