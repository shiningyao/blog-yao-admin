package com.yao.blog.web.article;

import java.util.List;

import com.yao.blog.domain.Article;
import com.yao.blog.repository.ArticleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Article
 */
@RestController
@RequestMapping("/api")
public class ArticleResource {

    @Autowired
    private ArticleRepository repository;

    @RequestMapping("/articles")
    public List<Article> index() {
        return repository.findAll();
    }

}
