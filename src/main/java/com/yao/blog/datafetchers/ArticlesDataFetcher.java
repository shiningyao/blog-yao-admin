package com.yao.blog.datafetchers;

import java.util.ArrayList;
import java.util.List;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.yao.blog.domain.Article;
import com.yao.blog.domain.QArticle;
import com.yao.blog.domain.Article.Status;
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
		List<Article> result = new ArrayList<>();
		BooleanBuilder builder = new BooleanBuilder();
		String status = environment.getArgument("status");
		QArticle article = new QArticle("article");
		if(status != null) {
			builder.and(article.status.eq(Status.valueOf(status)));
		}
		if(builder.hasValue()) {
			Predicate predicate = builder.getValue();
			articleRepository.findAll(predicate).forEach(result::add);
		} else {
			articleRepository.findAll().forEach(result::add);  // Should avoid fetch all posts, this place need edit;
		}
		return result;
	}
    
}