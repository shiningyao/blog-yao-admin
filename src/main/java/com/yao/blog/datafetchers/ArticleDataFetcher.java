package com.yao.blog.datafetchers;

import java.util.Optional;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.yao.blog.domain.Article;
import com.yao.blog.domain.QArticle;
import com.yao.blog.domain.Article.Status;
import com.yao.blog.repository.ArticleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Component;

import graphql.language.Field;
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
		Object source = environment.getSource();
		Field field = environment.getField();
		Article result = null;
		if(source instanceof Article) {
			Article sourceArticle = (Article) source;
			if(field != null) {
				if(field.getName().equals("prev")) {
					result = articleRepository
					.findFirstByPublishDateBeforeAndStatusOrderByPublishDateDesc(sourceArticle.getPublishDate(), Status.ONLINE).orElse(null);
				} else if(field.getName().equals("next")) {
					result = articleRepository
					.findFirstByPublishDateAfterAndStatusOrderByPublishDateAsc(sourceArticle.getPublishDate(), Status.ONLINE).orElse(null);
				}
			}
		} else {
			result = articleRepository.findById(id).get();
		}
		return result;
	}
    
}