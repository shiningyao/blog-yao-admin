package com.yao.blog.datafetchers;

import java.util.Map;

import com.yao.blog.domain.User;
import com.yao.blog.repository.UserRepository;

import org.springframework.stereotype.Component;

import graphql.schema.DataFetcher;
import graphql.schema.DataFetchingEnvironment;

/**
 * UserDataFetcher
 */
@Component
public class UserDataFetcher implements DataFetcher<User> {

    private UserRepository userRepository;

	@Override
	public User get(DataFetchingEnvironment environment) {
        Map<String, Object> args = environment.getArguments();
        User user = userRepository
            .findById(String.valueOf(args.get("id"))).get();
		return user;
	}
}