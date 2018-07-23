package com.yao.blog.web.rest;

import java.util.Optional;

import javax.validation.Valid;

import com.yao.blog.domain.Article;
import com.yao.blog.domain.User;
import com.yao.blog.repository.ArticleRepository;
import com.yao.blog.repository.UserRepository;
import com.yao.blog.shared.utils.BeanUtils;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @PutMapping(value = "/articles/{id}", consumes = {
        MediaType.APPLICATION_JSON_VALUE,
        MediaType.APPLICATION_JSON_UTF8_VALUE
    })
    public ResponseEntity<Article> trash(@PathVariable String id, @RequestBody Article params) {
        HttpStatus status = HttpStatus.OK;
        Article updatedArticle = null;
        if(this.articleRepository.existsById(id)) {
            Article article = this.articleRepository.findById(id).get();
            BeanUtils.copyPropertiesIgnoreNull(params, article);
            updatedArticle = this.articleRepository.save(article);
        } else {
            status = HttpStatus.NOT_FOUND;
        }
        return ResponseEntity.status(status).body(updatedArticle);
    }

    @DeleteMapping(value = "/articles/{id}")
    public ResponseEntity<Void> remove(@PathVariable String id) {
        HttpStatus status = HttpStatus.NO_CONTENT;
        if(this.articleRepository.existsById(id)) {
            this.articleRepository.deleteById(id);
        } else {
            status = HttpStatus.NOT_FOUND;
        }
        return ResponseEntity.status(status).body(null);
    }
}