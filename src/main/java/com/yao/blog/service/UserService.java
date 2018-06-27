package com.yao.blog.service;

import java.util.Optional;

import com.yao.blog.domain.User;
import com.yao.blog.repository.UserRepository;
import com.yao.blog.security.SecurityUtils;

import org.springframework.stereotype.Service;

/**
 * UserService
 */
@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> getUserWithAuthorities() {
        return SecurityUtils.getCurrentUserLogin().flatMap(userRepository::findOneByLogin);
    }
}