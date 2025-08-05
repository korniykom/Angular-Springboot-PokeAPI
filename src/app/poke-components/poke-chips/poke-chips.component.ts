import { Component, EventEmitter, Input, Output, signal } from "@angular/core";
import { MatChipsModule } from "@angular/material/chips";
import {
  MatSlideToggle,
  MatSlideToggleModule,
} from "@angular/material/slide-toggle";
@Component({
  selector: "app-poke-chips",
  imports: [MatChipsModule, MatSlideToggleModule],
  templateUrl: "./poke-chips.component.html",
  styleUrl: "./poke-chips.component.scss",
})
export class PokeChips {
  @Input() selected: string | null = null;
  @Output() sortChange = new EventEmitter<string>();

  isOnline = signal(navigator.onLine);

  constructor() {
    window.addEventListener("online", () => {
      this.isOnline.set(true);
    });
    window.addEventListener("offline", () => {
      this.isOnline.set(false);
    });
  }

  onChipClick(value: string) {
    this.sortChange.emit(value);
  }
}
