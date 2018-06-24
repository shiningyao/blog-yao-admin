package com.yao.blog.security;

import org.springframework.security.core.AuthenticationException;

/**
 * UserNotActivatedException
 */
public class UserNotActivatedException extends AuthenticationException {

	private static final long serialVersionUID = 1L;

    public UserNotActivatedException(String message) {
        super(message);
    }

    public UserNotActivatedException(String message, Throwable t) {
        super(message, t);
    }
}