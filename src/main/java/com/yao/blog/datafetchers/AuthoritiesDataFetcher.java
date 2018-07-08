package com.yao.blog.datafetchers;

import java.util.List;
import java.util.stream.Collectors;

import com.yao.blog.domain.User;

import org.springframework.stereotype.Component;

import graphql.schema.DataFetcher;
import graphql.schema.DataFetchingEnvironment;

/**
 * AuthoritiesDataFetcher
 */
@Component
public class AuthoritiesDataFetcher implements DataFetcher<List<String>> {

	@Override
	public List<String> get(DataFetchingEnvironment environment) {
        User user = environment.getSource();
		return user.getAuthorities().stream()
            .map(authority -> authority.getName())
            .collect(Collectors.toList());
	}

    
}