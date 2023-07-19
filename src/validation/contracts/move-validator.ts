export interface MoveValidator {
  isValid: (pokemonName: string, move: string) => Promise<boolean>
}
