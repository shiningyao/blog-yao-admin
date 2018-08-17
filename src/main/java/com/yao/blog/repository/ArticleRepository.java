package com.yao.blog.repository;

import java.time.Instant;
import java.util.Optional;

import com.yao.blog.domain.Article;
import com.yao.blog.domain.Article.Status;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

/**
 * ArticleRepository
 */
@Repository
public interface ArticleRepository extends MongoRepository<Article, String>, QuerydslPredicateExecutor<Article> {
    
    Optional<Article> findFirstByPublishDateBeforeAndStatusOrderByPublishDateDesc(Instant time, Status status);
    
    Optional<Article> findFirstByPublishDateAfterAndStatusOrderByPublishDateAsc(Instant time, Status status);

}