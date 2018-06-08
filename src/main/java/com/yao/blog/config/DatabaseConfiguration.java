package com.yao.blog.config;

import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

/**
 * DatabaseConfiguration
 */
@Configuration
@EnableMongoRepositories(basePackages = {"com.yao.blog.repository"})
@Import(MongoAutoConfiguration.class)
public class DatabaseConfiguration {

    
}