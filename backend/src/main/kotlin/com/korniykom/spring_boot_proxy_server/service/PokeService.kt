package com.korniykom.spring_boot_proxy_server.service

import Pokemon
import com.korniykom.spring_boot_proxy_server.model.LocationResponse
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import org.springframework.web.client.getForObject

const val BASE_URL = "https://pokeapi.co/api/v2/pokemon"

@Service
class PokeService(private val restTemplate: RestTemplate) {

    fun getPokemon(nameOrId: String): Pokemon {

        val locationResponse =
            restTemplate.getForObject<Array<LocationResponse>>("$BASE_URL/${nameOrId}/encounters")
        val pokemonResponse = restTemplate.getForObject<Pokemon>("$BASE_URL/$nameOrId")

        return pokemonResponse.copy(
            location = locationResponse.firstOrNull()?.location_area?.name
        )
    }
}