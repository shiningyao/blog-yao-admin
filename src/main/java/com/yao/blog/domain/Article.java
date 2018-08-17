package com.yao.blog.domain;

import java.time.Instant;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * Article
 */
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "by_article")
public class Article extends AbstractAuditingEntity {

    private static final long serialVersionUID = 1L;
    
	@Id
    private String id;

    @NotNull
    @Size(max = 100)
    private String title;
    
    @NotNull
    private String content;

    @Field("publish_date")
    private Instant publishDate;

    private Status status;

    @Transient
    private Article prev;

    @Transient
    private Article next;

    @DBRef
    private User author;

    public static enum Status {

        OFFLINE,
        ONLINE,
        TRASHED;

    }
}