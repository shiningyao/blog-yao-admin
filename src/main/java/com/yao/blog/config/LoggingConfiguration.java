package com.yao.blog.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

/**
 * LoggingConfiguration
 */
@Configuration
public class LoggingConfiguration {

    private String appName;
    private String serverPort;

    public LoggingConfiguration(@Value("${spring.application.name}") String appName,
    @Value("${server.port}") String serverPort) {
        this.appName = appName;
        this.serverPort = serverPort;
    }

}