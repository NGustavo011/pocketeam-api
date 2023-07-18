export interface PokemonFirstGenValidator {
  isValid: (pokemonName: string) => Promise<boolean>
}
