import { Component, input, OnInit } from "@angular/core";
import { PokeService } from "../poke.service";
import { Pokemon } from "../../models/pokemon.model";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { HabitatChipComponent } from "../location-chip/location-chip";

@Component({
  selector: "app-poke-info-screen",
  imports: [MatProgressSpinnerModule, HabitatChipComponent],
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
    console.log(this.pokemon);
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
