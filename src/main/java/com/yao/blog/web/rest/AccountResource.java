package com.yao.blog.web.rest;

import com.yao.blog.service.UserService;
import com.yao.blog.service.dto.UserDTO;
import com.yao.blog.web.errors.InternalServerErrorException;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * AccountResource
 */
@RestController
@RequestMapping("/api")
public class AccountResource {

    private final UserService userService;

    public AccountResource(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/account")
    public UserDTO getAccount() {
        return userService.getUserWithAuthorities()
                .map(UserDTO::new)
                .orElseThrow((() -> new InternalServerErrorException("User could not be found")));
    }

}