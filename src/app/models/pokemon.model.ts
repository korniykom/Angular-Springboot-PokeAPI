export interface Pokemon {
  id: string;
  name: string;
  sprites: Sprites;
  moves: Moves[];
}

interface Sprites {
  front_default: string;
}

interface Moves {
  move: Move;
}

interface Move {
  name: string;
}
