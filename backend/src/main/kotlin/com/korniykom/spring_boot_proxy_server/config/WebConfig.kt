package com.korniykom.spring_boot_proxy_server.config

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class WebConfig : WebMvcConfigurer {
    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:4200")
            .allowedMethods("GET")
    }

    override fun addViewControllers(registry: ViewControllerRegistry) {
        registry.addViewController("").setViewName("forward:/poke-api/index.html")
        registry.addViewController("/").setViewName("forward:/poke-api/index.html")
        registry.addViewController("/poke-api").setViewName("forward:/poke-api/index.html")
        registry.addViewController("/poke-api/").setViewName("forward:/poke-api/index.html")
        registry.addViewController("/poke-api/{spring:[^\\.]*}").setViewName("forward:/poke-api/index.html")
    }
}
