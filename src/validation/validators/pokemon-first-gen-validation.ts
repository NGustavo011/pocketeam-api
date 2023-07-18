import { type Validation } from '../../presentation/contracts/validation'
import { PokemonInvalidError } from '../../presentation/errors'
import { type PokemonFirstGenValidator } from '../contracts/pokemon-first-gen-validator'

export class PokemonFirstGenValidation implements Validation {
  constructor (private readonly fieldName: string, private readonly pokemonFirstGenValidator: PokemonFirstGenValidator) {
  }

  async validate (input: any): Promise<Error | null> {
    const isValidPokemon = await this.pokemonFirstGenValidator.isValid(input[this.fieldName])
    if (!isValidPokemon) { return new PokemonInvalidError(input[this.fieldName]) }
    return null
  }
}
