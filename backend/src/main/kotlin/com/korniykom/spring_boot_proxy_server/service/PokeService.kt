package com.korniykom.spring_boot_proxy_server.service

import Pokemon
import com.korniykom.spring_boot_proxy_server.model.LocationResponse
import kotlinx.coroutines.*
import kotlinx.coroutines.reactor.awaitSingleOrNull
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient


@Service
class PokeService(
    private val webClient: WebClient,
) {
    private val scope = CoroutineScope(Dispatchers.IO + SupervisorJob())

    private val handler = CoroutineExceptionHandler { _, throwable ->
        println("Caught: $throwable")
    }
    suspend fun getPokemon(nameOrId: String): Pokemon? {

        val location = scope.async(handler) {
            webClient.get()
                .uri("/$nameOrId/encounters")
                .retrieve()
                .bodyToMono(Array<LocationResponse>::class.java)
                .awaitSingleOrNull()
        }

        val pokemon = scope.async(handler) {
            webClient.get()
                .uri("/$nameOrId")
                .retrieve()
                .bodyToMono(Pokemon::class.java)
                .awaitSingleOrNull()
        }

        return pokemon.await()?.copy(
            location = location.await()?.firstOrNull()?.location_area?.name
        )
    }
}

