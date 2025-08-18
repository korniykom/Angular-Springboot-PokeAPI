export interface Pokemon {
  id: string;
  name: string;
  sprites: Sprites;
  moves: Moves[];
  location: string | null;
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
