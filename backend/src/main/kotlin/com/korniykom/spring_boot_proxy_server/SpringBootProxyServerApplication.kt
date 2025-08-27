package com.korniykom.spring_boot_proxy_server

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.scheduling.annotation.EnableAsync

@SpringBootApplication
@EnableAsync
class SpringBootProxyServerApplication

fun main(args: Array<String>) {
    runApplication<SpringBootProxyServerApplication>(*args)
}
