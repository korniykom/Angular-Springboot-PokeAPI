import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatChipsModule } from "@angular/material/chips";
@Component({
  selector: "app-poke-chips",
  imports: [MatChipsModule],
  templateUrl: "./poke-chips.component.html",
  styleUrl: "./poke-chips.component.scss",
})
export class PokeChips {
  @Input() selected: string | null = null;
  @Output() sortChange = new EventEmitter<string>();

  onChipClick(value: string) {
    this.sortChange.emit(value);
  }
}
