package com.yao.blog.shared.TypeResolvers;

import com.yao.blog.domain.Article;

import graphql.TypeResolutionEnvironment;
import graphql.schema.GraphQLObjectType;
import graphql.schema.TypeResolver;

/**
 * PageTypeResolver
 */
public class PageTypeResolver implements TypeResolver {

	@Override
	public GraphQLObjectType getType(TypeResolutionEnvironment env) {
        if(env.getObject() instanceof Article) {
            return env.getSchema().getObjectType("Article");
        }
		return null;
    }
    
}