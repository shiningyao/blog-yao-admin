package com.yao.blog

import com.yao.blog.config.ApplicationProperties
import com.yao.blog.config.DefaultProfileUtil
import org.slf4j.LoggerFactory
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.ComponentScan
import java.net.InetAddress

@ComponentScan
@EnableAutoConfiguration(exclude = [])
@EnableConfigurationProperties(ApplicationProperties::class)
class BlogApp {
}

fun main(args: Array<String>) {
  System.out.println(123123)
  val log = LoggerFactory.getLogger(BlogApp::class.java)
  val app = SpringApplication(BlogApp::class.java)
  DefaultProfileUtil.addDefaultProfile(app)
  val env = app.run(*args).environment;
  var protocol = "http"
  if (env.getProperty("server.ssl.key-store") != null) {
    protocol = "https"
  }
  log.info("\n----------------------------------------------------------\n\t" +
    "Application '{}' is running! Access URLs:\n\t" +
    "Local: \t\t{}://localhost:{}\n\t" +
    "External: \t{}://{}:{}\n\t" +
    "Profile(s): \t{}\n----------------------------------------------------------",
    env.getProperty("spring.application.name"),
    protocol,
    env.getProperty("server.port"),
    protocol,
    InetAddress.getLocalHost().hostAddress,
    env.getProperty("server.port"),
    env.activeProfiles)
}
