package com.yao.blog.domain;

import java.io.Serializable;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * Article
 */
@Document(collection = "ys_article")
public class Article implements Serializable {

    private static final long serialVersionUID = -4223073953543687950L;
    
	@Id
    @Field("article_id")
    private String id;

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }
}