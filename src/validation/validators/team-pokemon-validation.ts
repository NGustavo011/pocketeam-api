import { type PokemonTeam } from '../../domain/models/team'
import { type Validation } from '../../presentation/contracts/validation'
import { PokemonInvalidError } from '../../presentation/errors'
import { type PokemonFirstGenValidator } from '../contracts/pokemon-first-gen-validator'

export class TeamPokemonValidation implements Validation {
  constructor (private readonly pokemonFirstGenValidator: PokemonFirstGenValidator) {
  }

  async validate (input: any): Promise<Error | null> {
    const team = input.team as PokemonTeam
    for (const pokemonTeam of team) {
      const pokemon = pokemonTeam.pokemon.name
      const isValidPokemon = await this.pokemonFirstGenValidator.isValid(pokemon)
      if (!isValidPokemon) { return new PokemonInvalidError(pokemon) }
    }

    return null
  }
}
