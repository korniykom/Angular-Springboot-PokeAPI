import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { retry, map, catchError, of, forkJoin } from "rxjs";
import { Moves, Pokemon } from "../models/pokemon.model";

@Injectable({
  providedIn: "root",
})
export class PokeService {
  private readonly BASE_URL = "https://pokeapi.co/api/v2";
  private readonly MAX_POKEMON_ID = 1025;
  private readonly MIN_POKEMON_ID = 1;
  private readonly NUMBER_OF_POKEMONS = 12;
  private readonly NUMBER_OF_MOVES = 2;
  private readonly NUMBER_OF_RETRIES = 2;

  constructor(private http: HttpClient) {}

  getRandomPokemons(count: number = this.NUMBER_OF_POKEMONS) {
    const randomIds = this.generateRandomIds(
      count,
      this.MIN_POKEMON_ID,
      this.MAX_POKEMON_ID
    );

    const requests = randomIds.map((id) =>
      this.http.get<Pokemon>(`${this.BASE_URL}/pokemon/${id}`).pipe(
        retry(this.NUMBER_OF_RETRIES),
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

  getPokemonById(id: string) {
    return this.http.get<Pokemon>(`${this.BASE_URL}/pokemon/${id}`).pipe(
      retry(this.NUMBER_OF_RETRIES),
      map(
        (data) =>
          ({
            id: data.id,
            name: data.name,
            sprites: {
              front_default: data.sprites.front_default,
            },
            moves: data.moves.slice(0, this.NUMBER_OF_MOVES),
          } as Pokemon)
      ),
      catchError((error) => {
        console.log(`Error loading Pokemon ${id}`, error);
        return of(null);
      })
    );
  }

  private generateRandomIds(amount: number, minId: number, maxId: number) {
    const ids = new Set<number>();

    while (ids.size < amount) {
      ids.add(Math.floor(Math.random() * maxId) + minId);
    }

    return Array.from(ids);
  }
}
