package com.korniykom.spring_boot_proxy_server.model

data class LocationResponse(
    val location_area: LocationArea?
)

data class LocationArea(
    val name: String?
)