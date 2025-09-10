package com.korniykom.spring_boot_proxy_server.config

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.reactive.function.client.WebClient

@Configuration
class WebClientConfig(
    @Value("\${poke.api.base.url}") private val baseUrl: String
) {
    @Bean
    fun pokeApiWebClient(builder: WebClient.Builder): WebClient {
        return builder
            .baseUrl(baseUrl)
            .build()
    }
}