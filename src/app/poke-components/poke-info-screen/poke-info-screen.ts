import { Component, input, OnInit } from "@angular/core";
import { PokeService } from "../poke.service";
import { Pokemon } from "../../models/pokemon.model";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "app-poke-info-screen",
  imports: [MatProgressSpinnerModule],
  templateUrl: "./poke-info-screen.html",
  styleUrl: "./poke-info-screen.scss",
})
export class PokeInfoScreen implements OnInit {
  pokemonId = input.required<string>();
  pokemon: Pokemon | null = null;
  isLoading = true;
  error = false;

  constructor(private pokeService: PokeService) {}

  ngOnInit(): void {
    this.pokeService.getPokemonById(this.pokemonId()).subscribe({
      next: (data) => {
        if (data) {
          this.pokemon = data;
        } else {
          this.error = true;
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error loading Pokémon:", err);
        this.error = true;
        this.isLoading = false;
      },
    });
  }
}
