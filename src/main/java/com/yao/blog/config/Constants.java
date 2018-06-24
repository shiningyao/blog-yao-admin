package com.yao.blog.config;

/**
 * Constants
 */
public final class Constants {

    public final static String SPRING_PROFILE_DEVELOPMENT = "dev";
    public final static String SPRING_PROFILE_TEST = "test";
    public final static String SPRING_PROFILE_PRODUCTION = "prod";
    public final static String SPRING_PROFILE_CLOUD = "cloud";
    // Spring profile used when deploying to Heroku
    public final static String SPRING_PROFILE_HEROKU = "heroku";
    // Spring profile used when deploying to Amazon ECS
    public final static String SPRING_PROFILE_AWS_ECS = "aws-ecs";
    // Spring profile used to disable swagger
    public final static String SPRING_PROFILE_SWAGGER = "swagger";
    // Spring profile used to disable running liquibase
    public final static String SPRING_PROFILE_NO_LIQUIBASE = "no-liquibase";
    // Spring profile used when deploying to Kubernetes and OpenShift
    public final static String SPRING_PROFILE_K8S = "k8s";

    // Regex for acceptable logins
    public static final String LOGIN_REGEX = "^[_'.@A-Za-z0-9-]*$";

    public static final String SYSTEM_ACCOUNT = "system";
    public static final String ANONYMOUS_USER = "anonymoususer";
    public static final String DEFAULT_LANGUAGE = "en";
    
    private Constants() {
    }
    
}