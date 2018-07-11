package com.yao.blog.datafetchers;

import java.util.List;

import com.yao.blog.domain.Article;
import com.yao.blog.repository.ArticleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import graphql.schema.DataFetcher;
import graphql.schema.DataFetchingEnvironment;

/**
 * ArticlesDataFetcher
 */
@Component
public class ArticlesDataFetcher implements DataFetcher<List<Article>> {
    
    @Autowired
    private ArticleRepository articleRepository;

	@Override
	public List<Article> get(DataFetchingEnvironment environment) {
		return articleRepository.findAll();
	}
    
}