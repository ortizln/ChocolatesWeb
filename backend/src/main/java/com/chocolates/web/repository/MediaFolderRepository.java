package com.chocolates.web.repository;

import com.chocolates.web.entity.MediaFolder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MediaFolderRepository extends JpaRepository<MediaFolder, Long> {
    List<MediaFolder> findByParentId(Long parentId);
    Optional<MediaFolder> findByName(String name);
}
