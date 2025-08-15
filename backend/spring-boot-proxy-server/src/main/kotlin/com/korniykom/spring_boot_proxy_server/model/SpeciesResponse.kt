package com.korniykom.spring_boot_proxy_server.model

data class SpeciesResponse(
    val habitat: Habitat
)

data class Habitat(
    val name: String
)