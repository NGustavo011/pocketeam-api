import { type PokemonFirstGenValidator } from '../contracts/pokemon-first-gen-validator'

export const mockPokemonFirstGenValidator = (): PokemonFirstGenValidator => {
  class PokemonFirstGenValidatorStub implements PokemonFirstGenValidator {
    async isValid (pokemonName: string): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new PokemonFirstGenValidatorStub()
}
