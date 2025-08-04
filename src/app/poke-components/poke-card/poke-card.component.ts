import { Component, computed, input } from "@angular/core";
import { Pokemon } from "../../models/pokemon.model";
import { MatCardModule } from "@angular/material/card";
import { TitleCasePipe } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-poke-card",
  imports: [MatCardModule, TitleCasePipe, RouterLink],
  templateUrl: "./poke-card.component.html",
  styleUrl: "./poke-card.component.scss",
})
export class Pokecard {
  pokemon = input.required<Pokemon>();
  pokemonId = computed(() => this.pokemon().id);
  pokemonName = computed(() => this.pokemon().name);
  pokemonSprite = computed(() => this.pokemon().sprites.front_default);
  pokemonFirstMove = computed(() => this.pokemon().moves[0].move.name);
  pokemonSecondMove = computed(() => this.pokemon().moves[1].move.name);
}
