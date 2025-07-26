import { Component, OnInit } from "@angular/core";
import { PokeService } from "../poke.service";
import { Pokemon } from "../../models/pokemon.model";
import { Pokecard } from "../poke-card/poke-card.component";
import { MatButtonModule } from "@angular/material/button";
import { PokeChips } from "../poke-chips/poke-chips.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "app-poke-list",
  imports: [Pokecard, MatButtonModule, PokeChips, MatProgressSpinnerModule],
  templateUrl: "./poke-list.component.html",
  styleUrl: "./poke-list.component.scss",
})
export class PokeList implements OnInit {
  pokemons: Pokemon[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  currentSort: string | null = null;

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

  onSortChange(sort: string) {
    this.currentSort = sort;
    this.applySort();
  }

  applySort() {
    if (!this.currentSort) return;
    switch (this.currentSort) {
      case "name-asc":
        this.pokemons.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        this.pokemons.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "move-asc":
        this.pokemons.sort((a, b) => a.moves[0].localeCompare(b.moves[0]));
        break;
      case "move-desc":
        this.pokemons.sort((a, b) => b.moves[0].localeCompare(a.moves[0]));
        break;
    }
  }
}
