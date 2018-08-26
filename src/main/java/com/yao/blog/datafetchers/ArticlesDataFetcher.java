package com.yao.blog.datafetchers;

import java.util.Map;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.yao.blog.domain.Article;
import com.yao.blog.domain.QArticle;
import com.yao.blog.domain.Article.Status;
import com.yao.blog.repository.ArticleRepository;
import com.yao.blog.shared.utils.PageUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Component;

import graphql.schema.DataFetcher;
import graphql.schema.DataFetchingEnvironment;

/**
 * ArticlesDataFetcher
 */
@Component
public class ArticlesDataFetcher implements DataFetcher<Page<Article>> {

	private int page = 0;
	private int size = 20;
	private Sort sort = new Sort(Direction.DESC, "publishDate");

    @Autowired
    private ArticleRepository articleRepository;

	@Override
	public Page<Article> get(DataFetchingEnvironment environment) {
		Page<Article> result = null;
		BooleanBuilder builder = new BooleanBuilder();
		String status = environment.getArgument("status");
		Map<String, Object> pageParamMap = environment.getArgument("pageable");
		Pageable pageable = PageRequest.of(page, size, sort);
		QArticle article = new QArticle("article");
		if(status != null) {
			builder.and(article.status.eq(Status.valueOf(status)));
		}
		if(pageParamMap != null) {
			pageable = PageUtils.parsePageParamMap(pageParamMap, sort);
		}
		if(builder.hasValue()) {
			Predicate predicate = builder.getValue();
			result = articleRepository.findAll(predicate, pageable);
		} else {
			result = articleRepository.findAll(pageable);
		}
		return result;
	}
    
}