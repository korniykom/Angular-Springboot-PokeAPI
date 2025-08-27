package com.korniykom.spring_boot_proxy_server.service

import Pokemon
import com.korniykom.spring_boot_proxy_server.model.LocationResponse
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import org.springframework.web.client.getForObject

@Service
class PokeService(
    private val restTemplate: RestTemplate,
) {
    private val baseUrl: String = "https://pokeapi.co/api/v2/pokemon"

    fun getPokemon(nameOrId: String): Pokemon {

        val locationResponse =
            restTemplate.getForObject<Array<LocationResponse>>("$baseUrl/${nameOrId}/encounters")
        val pokemonResponse = restTemplate.getForObject<Pokemon>("$baseUrl/$nameOrId")

        return pokemonResponse.copy(
            location = locationResponse.firstOrNull()?.location_area?.name
        )
    }
}