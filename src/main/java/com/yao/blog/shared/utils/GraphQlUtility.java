package com.yao.blog.shared.utils;

import java.io.IOException;
import java.io.InputStreamReader;
import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.function.Function;

import javax.annotation.PostConstruct;
import javax.cache.Cache;
import javax.cache.CacheManager;
import javax.cache.Caching;
import javax.cache.configuration.Configuration;
import javax.cache.spi.CachingProvider;

import com.yao.blog.config.BlogYaoProperties;
import com.yao.blog.config.BlogYaoProperties.Cache.Ehcache;
import com.yao.blog.datafetchers.AllUsersDataFetcher;
import com.yao.blog.datafetchers.ArticleDataFetcher;
import com.yao.blog.datafetchers.ArticlesDataFetcher;
import com.yao.blog.datafetchers.AuthoritiesDataFetcher;
import com.yao.blog.datafetchers.UserDataFetcher;

import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ExpiryPolicyBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.jsr107.Eh107Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import graphql.GraphQL;
import graphql.execution.preparsed.PreparsedDocumentEntry;
import graphql.execution.preparsed.PreparsedDocumentProvider;

import static graphql.GraphQL.*;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;

import static graphql.schema.idl.RuntimeWiring.*;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;
import lombok.Data;

/**
 * GraphQlUtility
 */
@Component
@Data
public class GraphQlUtility {

    private final static String GRAPHQL_DOCUMENT_ENTRY_CACHE = "graphQLDocumentEntry";

    @Value("classpath:graphql/models.gql")
    private Resource schemaResource;
    private GraphQL graphQL;

	private AllUsersDataFetcher allUsersDataFetcher;
    private UserDataFetcher userDataFetcher;
    private AuthoritiesDataFetcher authoritiesDataFetcher;
    private ArticlesDataFetcher articlesDataFetcher;
    private ArticleDataFetcher articleDataFetcher;
    private BlogYaoProperties blogYaoProperties;

    @Autowired
    public GraphQlUtility(
        AllUsersDataFetcher allUsersDataFetcher,
        UserDataFetcher userDataFetcher,
        AuthoritiesDataFetcher authoritiesDataFetcher,
        ArticlesDataFetcher articlesDataFetcher,
        ArticleDataFetcher articleDataFetcher,
        BlogYaoProperties blogYaoProperties
        ) {
        this.allUsersDataFetcher = allUsersDataFetcher;
        this.userDataFetcher = userDataFetcher;
        this.authoritiesDataFetcher = authoritiesDataFetcher;
        this.articlesDataFetcher = articlesDataFetcher;
        this.articleDataFetcher = articleDataFetcher;
        this.blogYaoProperties = blogYaoProperties;
    }
    
    @PostConstruct
    public void createGraphQlObject() throws IOException {
        InputStreamReader schemaReader = new InputStreamReader(schemaResource.getInputStream());
        TypeDefinitionRegistry typeRegistry = new SchemaParser().parse(schemaReader);
        RuntimeWiring wiring = buildRuntimeWiring();
        GraphQLSchema schema = new SchemaGenerator().makeExecutableSchema(typeRegistry, wiring);
        CachingProvider provider = Caching.getCachingProvider();
        CacheManager cacheManager = provider.getCacheManager();
        Ehcache ehcache = blogYaoProperties.getCache().getEhcache();
        Configuration<String, PreparsedDocumentEntry> jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(
                String.class, PreparsedDocumentEntry.class, ResourcePoolsBuilder.heap(
                    ehcache.getMaxEntries()
                )
            ).withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(
                Duration.of(ehcache.getTimeToLiveSeconds(), ChronoUnit.SECONDS)
            ))
            .build()
        );
        Cache<String, PreparsedDocumentEntry> cache = cacheManager.createCache(GRAPHQL_DOCUMENT_ENTRY_CACHE, jcacheConfiguration);
        graphQL = newGraphQL(schema)
                    .preparsedDocumentProvider(new PreparsedDocumentProvider(){   
                        @Override
                        public PreparsedDocumentEntry get(String query, Function<String, PreparsedDocumentEntry> computeFunction) {
                            if(cache.get(query) != null) {
                                return cache.get(query);
                            } else {
                                PreparsedDocumentEntry entry = computeFunction.apply(query);
                                cache.put(query, entry);
                                return entry;
                            }
                        }
                    })
                    .build();
    }

	private RuntimeWiring buildRuntimeWiring() {
        return newRuntimeWiring()
                    .type("Query", typeWiring -> typeWiring
                        .dataFetcher("users", allUsersDataFetcher)
                        .dataFetcher("user", userDataFetcher)
                        .dataFetcher("articles", articlesDataFetcher)
                        .dataFetcher("article", articleDataFetcher)
                    )
                    .type("User", typeWiring -> typeWiring
                        .dataFetcher("authorities", authoritiesDataFetcher)
                    )
                    .type("Article", typeWiring -> typeWiring
                        .dataFetcher("author", userDataFetcher)
                    )   
                    .build();
	}
}