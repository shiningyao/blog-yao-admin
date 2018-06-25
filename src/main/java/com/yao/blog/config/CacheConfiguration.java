package com.yao.blog.config;

import java.time.Duration;
import java.time.temporal.ChronoUnit;

import com.yao.blog.repository.UserRepository;

import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ExpiryPolicyBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.jsr107.Eh107Configuration;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * CacheConfiguration
 */
@Configuration
@EnableCaching
@AutoConfigureBefore({WebConfigurer.class, DatabaseConfiguration.class})
public class CacheConfiguration {

    private javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(BlogYaoProperties blogYaoProperties) {
        BlogYaoProperties.Cache.Ehcache ehcache = blogYaoProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(
                Object.class, Object.class, ResourcePoolsBuilder.heap(
                    ehcache.getMaxEntries()
                )
            )
            .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(
                Duration.of(ehcache.getTimeToLiveSeconds(), ChronoUnit.SECONDS)))
            .build()
        );
    }

    @Bean
    public JCacheManagerCustomizer jCacheManagerCustomizer() {
        return cm -> {
            cm.createCache(UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
        };
    }
}