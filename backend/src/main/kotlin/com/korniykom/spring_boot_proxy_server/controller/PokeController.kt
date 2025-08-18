package com.korniykom.spring_boot_proxy_server.controller

import Pokemon
import com.korniykom.spring_boot_proxy_server.service.PokeService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/pokemon")

class PokemonController(private val pokemonService: PokeService) {
    @GetMapping("/{nameOrId}")
    fun getPokemon(@PathVariable nameOrId: String): Pokemon {
        val pokemon = pokemonService.getPokemon(nameOrId)
        return pokemon
    }
}