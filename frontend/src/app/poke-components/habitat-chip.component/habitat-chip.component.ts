import { Component } from "@angular/core";

import { MatChipsModule } from "@angular/material/chips";
import { Pokemon } from "../../models/pokemon.model";

@Component({
  selector: "app-habitat-chip",
  imports: [MatChipsModule],
  template: `
    <mat-chip>
      <ng-content></ng-content>
    </mat-chip>
  `,
  styleUrl: "./habitat-chip.component.scss",
})
export class HabitatChipComponent {}
