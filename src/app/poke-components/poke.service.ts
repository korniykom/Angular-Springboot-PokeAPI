import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { retry, map, catchError, of, forkJoin } from "rxjs";
import { Pokemon } from "../models/pokemon.model";

@Injectable({
  providedIn: "root",
})
export class PokeService {
  private readonly BASE_URL = "https://pokeapi.co/api/v2";

  constructor(private http: HttpClient) {}

  getRandomPokemons(count: number = 12) {
    const randomIds = this.generateRandomIds(count, 1, 1025);

    const requests = randomIds.map((id) =>
      this.http.get(`${this.BASE_URL}/pokemon/${id}`).pipe(
        retry(2),
        map(this.mapmapToPokemon),
        catchError((error) => {
          console.log(`Error loading Pokemon ${id}`, error);
          return of(null);
        })
      )
    );
    return forkJoin(requests).pipe(
      map((results) => {
        const filtered = results.filter(
          (result) => result != null
        ) as Pokemon[];
        if (filtered.length === 0) {
          throw new Error("Failed to load all pokemons");
        }
        return filtered;
      })
    );
  }

  private generateRandomIds(amount: number, minId: number, maxId: number) {
    const ids = new Set<number>();

    while (ids.size < amount) {
      ids.add(Math.floor(Math.random() * (maxId - minId + 1)) + minId);
    }

    return Array.from(ids);
  }

  private mapmapToPokemon(data: any) {
    return {
      id: data.id,
      name: data.name,
      sprite: data.sprites.front_default,
      moves: data.moves.slice(0, 2).map((move: any) => move.move.name),
    };
  }
}
