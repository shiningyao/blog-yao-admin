package com.yao.blog.web.rest;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.yao.blog.shared.utils.GraphQlUtility;

import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import graphql.ExecutionInput;
import graphql.ExecutionResult;
import graphql.GraphQL;
import graphql.servlet.GraphQLContext;

/**
 * GraphqlQueryResource
 */
@RestController
@RequestMapping("/api")
public class GraphqlQueryResource {

    private final Logger log = LoggerFactory.getLogger(GraphqlQueryResource.class);

    private GraphQL graphQL;
    private GraphQlUtility graphQlUtility;

    public GraphqlQueryResource(GraphQlUtility graphQlUtility) {
        this.graphQlUtility = graphQlUtility;
        graphQL = this.graphQlUtility.getGraphQL();
    }

    @PostMapping(value = "/query", consumes = {MediaType.TEXT_PLAIN_VALUE})
    public ResponseEntity<?> query(@RequestBody String query) {
        ExecutionResult result = graphQL.execute(query);
        System.out.println("errors: "+result.getErrors());
        return ResponseEntity.ok(result.getData());
    }

    @PostMapping(value = "/query", consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> query(
        @RequestBody String jsonStr,
        HttpServletRequest request,
        HttpServletResponse response) throws JSONException {
            JSONObject jsonObject = new JSONObject(jsonStr);
            String query = jsonObject.getString("query");
            Map<String, Object> variables = new HashMap<>();
            if(jsonObject.has("variables")) {
                JSONObject variablesJsonObject = jsonObject.getJSONObject("variables");
                variables = variablesJsonObject.toMap();
            }
            ExecutionResult executionResult = graphQL.execute(
                new ExecutionInput(query, null, 
                    new GraphQLContext(Optional.of(request), Optional.of(response))
                , null, variables)
            );
            Map<String, Object> result = new LinkedHashMap<>();
            HttpStatus resultStatus = HttpStatus.OK;
            if (executionResult.getErrors().size() > 0) {
                result.put("errors", executionResult.getErrors());
                resultStatus = HttpStatus.INTERNAL_SERVER_ERROR;
                log.error("Errors: {}", executionResult.getErrors());
            }
            result.put("data", executionResult.getData());
            return ResponseEntity.status(resultStatus).body(result);
    }
    
}