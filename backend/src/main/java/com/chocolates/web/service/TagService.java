package com.chocolates.web.service;

import com.chocolates.web.dto.response.TagResponse;
import com.chocolates.web.entity.Tag;
import com.chocolates.web.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TagService {

    private final TagRepository tagRepository;

    public List<TagResponse> getAll() {
        return tagRepository.findAll().stream()
                .map(this::toTagResponse)
                .collect(Collectors.toList());
    }

    public TagResponse getByName(String name) {
        Tag tag = tagRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Tag no encontrado: " + name));
        return toTagResponse(tag);
    }

    @Transactional
    public TagResponse create(String name) {
        if (tagRepository.findByName(name).isPresent()) {
            throw new RuntimeException("Ya existe un tag con el nombre: " + name);
        }
        Tag tag = Tag.builder()
                .name(name)
                .slug(name.toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("^-|-$", ""))
                .build();
        Tag saved = tagRepository.save(tag);
        return toTagResponse(saved);
    }

    @Transactional
    public void delete(Long id) {
        Tag tag = tagRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tag no encontrado con id: " + id));
        tagRepository.delete(tag);
    }

    private TagResponse toTagResponse(Tag tag) {
        return TagResponse.builder()
                .id(tag.getId())
                .name(tag.getName())
                .slug(tag.getSlug())
                .createdAt(tag.getCreatedAt())
                .build();
    }
}
