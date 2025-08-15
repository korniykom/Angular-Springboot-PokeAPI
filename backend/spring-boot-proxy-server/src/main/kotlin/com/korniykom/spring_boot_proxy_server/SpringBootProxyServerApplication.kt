package com.korniykom.spring_boot_proxy_server

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class SpringBootProxyServerApplication

fun main(args: Array<String>) {
	runApplication<SpringBootProxyServerApplication>(*args)
}
