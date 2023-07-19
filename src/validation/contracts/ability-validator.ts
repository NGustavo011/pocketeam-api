export interface AbilityValidator {
  isValid: (pokemonName: string, ability: string) => Promise<boolean>
}
