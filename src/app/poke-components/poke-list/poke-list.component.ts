import { Component, OnInit } from "@angular/core";
import { PokeService } from "../poke.service";
import { Pokemon } from "../../models/pokemon.model";
import { Pokecard } from "../poke-card/poke-card.component";
import { MatButtonModule } from "@angular/material/button";
import { PokeChips } from "../poke-chips/poke-chips.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-poke-list",
  imports: [
    Pokecard,
    MatButtonModule,
    PokeChips,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: "./poke-list.component.html",
  styleUrl: "./poke-list.component.scss",
})
export class PokeList implements OnInit {
  private readonly NUMBER_OF_POKEMONS = 12;

  pokemons: Pokemon[] = [];
  isLoading: boolean = false;
  error: boolean = false;
  currentSort: string | null = null;

  constructor(private pokemonService: PokeService) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons() {
    this.isLoading = true;
    this.error = false;
    this.pokemonService.getRandomPokemons(this.NUMBER_OF_POKEMONS).subscribe({
      next: (pokemons) => {
        this.pokemons = pokemons;
        this.isLoading = false;
      },
      error: (error) => {
        console.log("Error loading pokemons", error);
        this.error = true;
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
        this.pokemons.sort((a, b) =>
          a.moves[0].move.name.localeCompare(b.moves[0].move.name)
        );
        break;
      case "move-desc":
        this.pokemons.sort((a, b) =>
          b.moves[0].move.name.localeCompare(a.moves[0].move.name)
        );
        break;
    }
  }
}
