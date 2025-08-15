export interface Pokemon {
  id: string;
  name: string;
  sprites: Sprites;
  moves: Moves[];
  habitat: string;
}

interface Sprites {
  front_default: string;
}

export interface Moves {
  move: Move;
}

export interface Move {
  name: string;
}
