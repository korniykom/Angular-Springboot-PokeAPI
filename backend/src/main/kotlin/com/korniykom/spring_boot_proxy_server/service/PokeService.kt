package com.korniykom.spring_boot_proxy_server.service

import Pokemon
import com.korniykom.spring_boot_proxy_server.model.LocationResponse
import kotlinx.coroutines.async
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.reactor.awaitSingleOrNull
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import org.springframework.web.client.getForObject
import org.springframework.web.reactive.function.client.WebClient
import kotlin.coroutines.coroutineContext


@Service
class PokeService(
    private val webClient: WebClient.Builder,
    @Value("\${poke.api.base.url}") private val baseUrl: String
) {
    suspend fun getPokemon(nameOrId: String): Pokemon = coroutineScope {
        val client = webClient.baseUrl(baseUrl).build()

        val locationDeferred = async {
            client.get()
                .uri("/$nameOrId/encounters")
                .retrieve()
                .bodyToMono(Array<LocationResponse>::class.java)
                .awaitSingleOrNull()
        }

        val pokemonDeferred = async {
            client.get()
                .uri("/$nameOrId")
                .retrieve()
                .bodyToMono(Pokemon::class.java)
                .awaitSingleOrNull()
        }

        val locationResponse = locationDeferred.await()
        val pokemonResponse = pokemonDeferred.await()
            ?: throw RuntimeException("Pokemon not found: $nameOrId")

        pokemonResponse.copy(
            location = locationResponse?.firstOrNull()?.location_area?.name
        )
    }
}