import { Component, OnInit } from "@angular/core";
import { PokeService } from "../poke.service";
import { Pokemon } from "../../models/pokemon.model";
import { Pokecard } from "../poke-card/poke-card.component";

@Component({
  selector: "app-poke-list",
  imports: [Pokecard],
  templateUrl: "./poke-list.component.html",
  styleUrl: "./poke-list.component.scss",
})
export class PokeList implements OnInit {
  pokemons: Pokemon[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private pokemonService: PokeService) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons() {
    (this.isLoading = true),
      (this.error = null),
      this.pokemonService.getRandomPokemons(12).subscribe({
        next: (pokemons) => {
          (this.pokemons = pokemons), (this.isLoading = false);
          console.log(pokemons);
        },
        error: (error) => {
          console.log("Error loading pokemons", error);
          this.error = error;
          this.isLoading = false;
        },
      });
  }
}
