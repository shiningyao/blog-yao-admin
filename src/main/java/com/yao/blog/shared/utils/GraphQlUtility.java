package com.yao.blog.shared.utils;

import java.io.File;
import java.io.IOException;

import javax.annotation.PostConstruct;

import com.yao.blog.datafetchers.AllUsersDataFetcher;
import com.yao.blog.datafetchers.UserDataFetcher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import graphql.GraphQL;
import static graphql.GraphQL.*;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;

import static graphql.schema.idl.RuntimeWiring.*;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;
import lombok.Data;

/**
 * GraphQlUtility
 */
@Component
@Data
public class GraphQlUtility {

    @Value("classpath:graphql/models.gql")
    private Resource schemaResource;
    private GraphQL graphQL;

	private AllUsersDataFetcher allUsersDataFetcher;
	private UserDataFetcher userDataFetcher;

    @Autowired
    public GraphQlUtility(
        AllUsersDataFetcher allUsersDataFetcher,
        UserDataFetcher userDataFetcher
        ) {
        this.allUsersDataFetcher = allUsersDataFetcher;
        this.userDataFetcher = userDataFetcher;
    }
    
    @PostConstruct
    public void createGraphQlObject() throws IOException {
        File schemas = schemaResource.getFile();
        TypeDefinitionRegistry typeRegistry = new SchemaParser().parse(schemas);
        RuntimeWiring wiring = buildRuntimeWiring();
        GraphQLSchema schema = new SchemaGenerator().makeExecutableSchema(typeRegistry, wiring);
        graphQL = newGraphQL(schema).build();
    }

	private RuntimeWiring buildRuntimeWiring() {
        return newRuntimeWiring()
                    .type("Query", typeWiring -> typeWiring
                        .dataFetcher("users", allUsersDataFetcher)
                        .dataFetcher("user", userDataFetcher)
                    )
                    .type("User", typeWiring -> typeWiring)
                    .build();
	}
}