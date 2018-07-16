package com.yao.blog.datafetchers;

import com.yao.blog.domain.Article;
import com.yao.blog.repository.ArticleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import graphql.schema.DataFetcher;
import graphql.schema.DataFetchingEnvironment;

/**
 * ArticleDataFetcher
 */
@Component
public class ArticleDataFetcher implements DataFetcher<Article>  {

    @Autowired
    private ArticleRepository articleRepository;

	@Override
	public Article get(DataFetchingEnvironment environment) {
        String id = environment.getArgument("id");
		return articleRepository.findById(id).get();
	}

    
}