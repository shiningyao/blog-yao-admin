package com.yao.blog.datafetchers;

import java.util.List;

import com.yao.blog.domain.User;
import com.yao.blog.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import graphql.schema.DataFetcher;
import graphql.schema.DataFetchingEnvironment;

/**
 * AllUsersDataFetcher
 */
@Component
public class AllUsersDataFetcher implements DataFetcher<List<User>> {

    private UserRepository userRepository;

    @Autowired
    public AllUsersDataFetcher(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

	@Override
	public List<User> get(DataFetchingEnvironment environment) {
        return userRepository.findAll();
	}
}