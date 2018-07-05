package com.yao.blog.shared.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

/**
 * GraphQlUtility
 */
@Component
public class GraphQlUtility {

    @Value("classpath:graphql/models.gql")
    private Resource schemaResource;

    @Autowired
    public GraphQlUtility() {
        System.out.println(schemaResource + "1231231312312312");
    }
}