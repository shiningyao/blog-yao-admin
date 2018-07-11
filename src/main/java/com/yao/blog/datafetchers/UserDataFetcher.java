package com.yao.blog.datafetchers;

import java.util.Map;

import com.yao.blog.domain.Article;
import com.yao.blog.domain.User;
import com.yao.blog.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import graphql.schema.DataFetcher;
import graphql.schema.DataFetchingEnvironment;

/**
 * UserDataFetcher
 */
@Component
public class UserDataFetcher implements DataFetcher<User> {

    @Autowired
    private UserRepository userRepository;

	@Override
	public User get(DataFetchingEnvironment environment) {
        Map<String, Object> args = environment.getArguments();
        Object source = environment.getSource();
        if(source instanceof Article) {
            Article article = (Article) source;
            return article.getAuthor();
        }
        String login = String.valueOf(args.get("login"));
        User user = userRepository
            .findOneByLogin(login).get();
		return user;
	}
}