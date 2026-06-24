package com.chocolates.web.service;

import com.chocolates.web.dto.request.TestimonialRequest;
import com.chocolates.web.dto.response.TestimonialResponse;
import com.chocolates.web.entity.Testimonial;
import com.chocolates.web.repository.TestimonialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TestimonialService {

    private final TestimonialRepository testimonialRepository;

    public List<TestimonialResponse> getActive() {
        return testimonialRepository.findByActiveTrueOrderBySortOrder().stream()
                .map(this::toTestimonialResponse)
                .collect(Collectors.toList());
    }

    public List<TestimonialResponse> getAll() {
        return testimonialRepository.findAll().stream()
                .map(this::toTestimonialResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public TestimonialResponse create(TestimonialRequest request) {
        Testimonial testimonial = Testimonial.builder()
                .clientName(request.getClientName())
                .clientTitle(request.getClientTitle())
                .clientCompany(request.getClientCompany())
                .clientPhoto(request.getClientPhoto())
                .content(request.getContent())
                .rating(request.getRating())
                .sortOrder(request.getSortOrder() != null ? request.getSortOrder() : 0)
                .active(request.getActive() != null ? request.getActive() : true)
                .build();
        Testimonial saved = testimonialRepository.save(testimonial);
        return toTestimonialResponse(saved);
    }

    @Transactional
    public TestimonialResponse update(Long id, TestimonialRequest request) {
        Testimonial testimonial = testimonialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Testimonio no encontrado con id: " + id));
        testimonial.setClientName(request.getClientName());
        testimonial.setClientTitle(request.getClientTitle());
        testimonial.setClientCompany(request.getClientCompany());
        testimonial.setClientPhoto(request.getClientPhoto());
        testimonial.setContent(request.getContent());
        testimonial.setRating(request.getRating());
        testimonial.setSortOrder(request.getSortOrder());
        testimonial.setActive(request.getActive());
        Testimonial saved = testimonialRepository.save(testimonial);
        return toTestimonialResponse(saved);
    }

    @Transactional
    public void delete(Long id) {
        Testimonial testimonial = testimonialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Testimonio no encontrado con id: " + id));
        testimonialRepository.delete(testimonial);
    }

    private TestimonialResponse toTestimonialResponse(Testimonial testimonial) {
        return TestimonialResponse.builder()
                .id(testimonial.getId())
                .clientName(testimonial.getClientName())
                .clientTitle(testimonial.getClientTitle())
                .clientCompany(testimonial.getClientCompany())
                .clientPhoto(testimonial.getClientPhoto())
                .content(testimonial.getContent())
                .rating(testimonial.getRating())
                .sortOrder(testimonial.getSortOrder())
                .active(testimonial.getActive())
                .createdAt(testimonial.getCreatedAt())
                .updatedAt(testimonial.getUpdatedAt())
                .build();
    }
}
