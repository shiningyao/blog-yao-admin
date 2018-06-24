package com.yao.blog.config;

import javax.validation.constraints.NotNull;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.web.cors.CorsConfiguration;

/**
 * BlogYaoProperties
 */
@ConfigurationProperties(prefix = "blogyao", ignoreUnknownFields = false)
public class BlogYaoProperties {
    
    private Cache cache = new Cache();

    private final CorsConfiguration cors = new CorsConfiguration();
    
    private final Security security = new Security();
    
    /**
     * @return the cache
     */
    public Cache getCache() {
        return cache;
    }

    /**
     * @return the cors
     */
    public CorsConfiguration getCors() {
        return cors;
    }

    /**
     * @return the security
     */
    public Security getSecurity() {
        return security;
    }

    public static class Cache {

        private final Ehcache ehcache = new Ehcache();

        /**
         * @return the ehcache
         */
        public Ehcache getEhcache() {
            return ehcache;
        }

        public static class Ehcache {

            private int timeToLiveSeconds = 3600;
            private long maxEntries = 100;

            /**
             * @return the maxEntries
             */
            public long getMaxEntries() {
                return maxEntries;
            }

            /**
             * @param maxEntries the maxEntries to set
             */
            public void setMaxEntries(long maxEntries) {
                this.maxEntries = maxEntries;
            }

            /**
             * @return the timeToLiveSeconds
             */
            public int getTimeToLiveSeconds() {
                return timeToLiveSeconds;
            }

            /**
             * @param timeToLiveSeconds the timeToLiveSeconds to set
             */
            public void setTimeToLiveSeconds(int timeToLiveSeconds) {
                this.timeToLiveSeconds = timeToLiveSeconds;
            }

        }

    }

    public static class Security {

        private final ClientAuthorization clientAuthorization = new ClientAuthorization();

        private final Authentication authentication = new Authentication();

        private final RememberMe rememberMe = new RememberMe();

        public ClientAuthorization getClientAuthorization() {
            return clientAuthorization;
        }

        public Authentication getAuthentication() {
            return authentication;
        }

        public RememberMe getRememberMe() {
            return rememberMe;
        }

        public static class ClientAuthorization {

            private String accessTokenUri = null;

            private String tokenServiceId = null;

            private String clientId = null;

            private String clientSecret = null;

            public String getAccessTokenUri() {
                return accessTokenUri;
            }

            public void setAccessTokenUri(String accessTokenUri) {
                this.accessTokenUri = accessTokenUri;
            }

            public String getTokenServiceId() {
                return tokenServiceId;
            }

            public void setTokenServiceId(String tokenServiceId) {
                this.tokenServiceId = tokenServiceId;
            }

            public String getClientId() {
                return clientId;
            }

            public void setClientId(String clientId) {
                this.clientId = clientId;
            }

            public String getClientSecret() {
                return clientSecret;
            }

            public void setClientSecret(String clientSecret) {
                this.clientSecret = clientSecret;
            }
        }

        public static class Authentication {

            private final Jwt jwt = new Jwt();

            public Jwt getJwt() {
                return jwt;
            }

            public static class Jwt {

                private String secret = null;

                private long tokenValidityInSeconds = 1800; // 0.5 hour

                private long tokenValidityInSecondsForRememberMe = 2592000; // 30 hour

                public String getSecret() {
                    return secret;
                }

                public void setSecret(String secret) {
                    this.secret = secret;
                }

                public long getTokenValidityInSeconds() {
                    return tokenValidityInSeconds;
                }

                public void setTokenValidityInSeconds(long tokenValidityInSeconds) {
                    this.tokenValidityInSeconds = tokenValidityInSeconds;
                }

                public long getTokenValidityInSecondsForRememberMe() {
                    return tokenValidityInSecondsForRememberMe;
                }

                public void setTokenValidityInSecondsForRememberMe(long tokenValidityInSecondsForRememberMe) {
                    this.tokenValidityInSecondsForRememberMe = tokenValidityInSecondsForRememberMe;
                }
            }
        }

        public static class RememberMe {

            @NotNull
            private String key = null;

            public String getKey() {
                return key;
            }

            public void setKey(String key) {
                this.key = key;
            }
        }
    }
}