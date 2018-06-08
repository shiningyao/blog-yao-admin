package com.yao.blog.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * ApplicationProperties
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {
}