package com.chocolates.web.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    @Value("${app.upload-dir:${app.upload.dir:./uploads}}")
    private String uploadDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String effectiveDir = StringUtils.hasText(uploadDir) ? uploadDir : "./uploads";
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:" + effectiveDir + File.separator)
                .setCachePeriod(3600)
                .resourceChain(true);
    }
}
