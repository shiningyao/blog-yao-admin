package com.yao.blog.repository;

import static org.junit.Assert.assertThat;

import com.yao.blog.domain.Article;
import com.yao.blog.repository.ArticleRepository;

import static org.hamcrest.core.Is.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * TestArticle
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
public class TestArticle {

    @Autowired ArticleRepository repository;

    @Test
    public void readsFirstPageCorrectly() {

    //   Page<Article> articles = repository.findAll(PageRequest.of(0, 10));
        Article article =  repository.findAll().get(0);
        // assertThat(articles.isFirst(), is(true));
        assertThat(article.getId(), is(1));
    }
    
}