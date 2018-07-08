package com.yao.blog.web.rest;

import com.yao.blog.shared.utils.GraphQlUtility;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import graphql.ExecutionResult;
import graphql.GraphQL;

/**
 * GraphqlQueryResource
 */
@RestController
@RequestMapping("/api")
public class GraphqlQueryResource {

    private GraphQL graphQL;
    private GraphQlUtility graphQlUtility;

    public GraphqlQueryResource(GraphQlUtility graphQlUtility) {
        this.graphQlUtility = graphQlUtility;
        graphQL = this.graphQlUtility.getGraphQL();
    }

    @PostMapping("/query")
    public ResponseEntity<?> query(@RequestBody String query) {
        ExecutionResult result = graphQL.execute(query);
        System.out.println("errors: "+result.getErrors());
        return ResponseEntity.ok(result.getData());
    }

}