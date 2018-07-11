package com.yao.blog.web.rest;

import javax.validation.Valid;

import com.yao.blog.domain.Article;
import com.yao.blog.domain.User;
import com.yao.blog.repository.ArticleRepository;
import com.yao.blog.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * ArticleResource
 */
@RestController
@RequestMapping("/api")
public class ArticleResource {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ArticleRepository articleRepository;

    @PostMapping(value = "/articles", consumes = { 
        MediaType.APPLICATION_JSON_VALUE,
        MediaType.APPLICATION_JSON_UTF8_VALUE
    })
    public ResponseEntity<Article> publish(@Valid @RequestBody Article article) {
        User user = userRepository.findOneByLogin(article.getAuthor().getLogin()).get();
        if(user != null) {
            article.setAuthor(user);
            Article savedArticle = articleRepository.save(article);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedArticle);
        } else {
            throw new UsernameNotFoundException("my user not found.");
        }
    }
}