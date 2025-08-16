package com.korniykom.spring_boot_proxy_server.service

import Pokemon
import com.korniykom.spring_boot_proxy_server.model.SpeciesResponse
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import org.springframework.web.client.getForObject

const val POKEMON_BASE_URL = "https://pokeapi.co/api/v2/pokemon"
const val HABITAT_BASE_URL = "https://pokeapi.co/api/v2/pokemon-species"

@Service
class PokeService(private val restTemplate: RestTemplate) {

    fun getPokemon(nameOrId: String): Pokemon {

        val habitatResponse = restTemplate.getForObject<SpeciesResponse>("$HABITAT_BASE_URL/$nameOrId")
        val pokemonResponse = restTemplate.getForObject<Pokemon>("$POKEMON_BASE_URL/$nameOrId")

        return pokemonResponse.copy(
            habitat = habitatResponse.habitat?.name
        )
    }
}