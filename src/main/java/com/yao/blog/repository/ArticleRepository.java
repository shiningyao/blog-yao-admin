package com.yao.blog.repository;

import com.yao.blog.domain.Article;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

/**
 * ArticleRepository
 */
@Repository
public interface ArticleRepository extends MongoRepository<Article, String>, QuerydslPredicateExecutor<Article> {
    
}