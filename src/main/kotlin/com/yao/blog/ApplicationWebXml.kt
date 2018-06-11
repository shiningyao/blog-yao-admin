package com.yao.blog;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

public class ApplicationWebXml: SpringBootServletInitializer() {

    protected override fun configure(builder: SpringApplicationBuilder): SpringApplicationBuilder {
        return builder.sources(BlogApp::class.java);
    }

}