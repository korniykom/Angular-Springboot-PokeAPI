import { Component, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Pokecard } from "./poke-components/poke-card/poke-card.component";
import { PokeList } from "./poke-components/poke-list/poke-list.component";
import { PokeChips } from "./poke-components/poke-chips/poke-chips";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, PokeList, PokeChips],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  protected readonly title = signal("poke-api");
}
