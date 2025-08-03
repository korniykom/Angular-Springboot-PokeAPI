import { Routes } from "@angular/router";
import { PokeList } from "./poke-components/poke-list/poke-list.component";
import { PokeChips } from "./poke-components/poke-chips/poke-chips.component";
import { PokeInfoScreen } from "./poke-components/poke-info-screen/poke-info-screen";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "pokemon",
    pathMatch: "full",
  },
  {
    path: "pokemon",
    component: PokeList,
    pathMatch: "full",
  },
  {
    path: "pokemon/:pokemonId",
    component: PokeInfoScreen,
  },
  {
    path: "**",
    redirectTo: "pokemon",
  },
];
