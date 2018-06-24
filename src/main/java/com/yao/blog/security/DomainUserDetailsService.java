package com.yao.blog.security;

import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;

import com.yao.blog.domain.User;
import com.yao.blog.repository.UserRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

/**
 * DomainUserDetailsService
 */
@Component("userDetailsService")
public class DomainUserDetailsService implements UserDetailsService {

	private final Logger log = LoggerFactory.getLogger(DomainUserDetailsService.class);

	private final UserRepository userRepository;

	public DomainUserDetailsService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public UserDetails loadUserByUsername(final String login) throws UsernameNotFoundException {
		log.debug("Authenticating {}", login);
		String lowercaseLogin = login.toLowerCase(Locale.ENGLISH);
		Optional<User> userByEmailFromDatabase = userRepository.findOneByEmailIgnoreCase(lowercaseLogin);
		return userByEmailFromDatabase.map(user -> createSpringSecurityUser(lowercaseLogin, user)).orElseGet(() -> {
			Optional<User> userByLoginDatabase = userRepository.findOneByLogin(lowercaseLogin);
			return userByLoginDatabase.map(user -> createSpringSecurityUser(lowercaseLogin, user))
				.orElseThrow(() -> new UsernameNotFoundException("User " + lowercaseLogin + " was not found in the " +
				"database"));
		});
	}

	private org.springframework.security.core.userdetails.User createSpringSecurityUser(String lowercaseLogin, User user) {
		if(!user.isActivated()) {
			throw new UserNotActivatedException("User " + lowercaseLogin + " was not activated");
		}
		List<GrantedAuthority> grantedAuthorities = user.getAuthorities().stream()
			.map(authority -> new SimpleGrantedAuthority(authority.getName()))
			.collect(Collectors.toList());
		return new org.springframework.security.core.userdetails.User(user.getLogin(), user.getPassword(), grantedAuthorities);
	}
}