import { type PokemonTeam } from '../../domain/models/team'
import { type Validation } from '../../presentation/contracts/validation'
import { PokemonInvalidError } from '../../presentation/errors'
import { AbilityInvalidError } from '../../presentation/errors/ability-invalid-error'
import { HoldItemInvalidError } from '../../presentation/errors/hold-item-invalid-error'
import { LengthInvalidError } from '../../presentation/errors/length-invalid-error'
import { MoveInvalidError } from '../../presentation/errors/move-invalid-error'
import { type AbilityValidator } from '../contracts/ability-validator'
import { type HoldItemValidator } from '../contracts/hold-item-validator'
import { type MoveValidator } from '../contracts/move-validator'
import { type PokemonFirstGenValidator } from '../contracts/pokemon-first-gen-validator'

export class TeamPokemonValidation implements Validation {
  constructor (
    private readonly pokemonFirstGenValidator: PokemonFirstGenValidator,
    private readonly abilityValidator: AbilityValidator,
    private readonly holdItemValidator: HoldItemValidator,
    private readonly moveValidator: MoveValidator
  ) {
  }

  async validate (input: any): Promise<Error | null> {
    const team = input.team as PokemonTeam
    if (team.length < 1 || team.length > 6) {
      return new LengthInvalidError('a pokemon team must have between 1 to 6 pokemon')
    }
    for (const pokemonTeam of team) {
      const pokemon = pokemonTeam.pokemon.name
      const isValidPokemon = await this.pokemonFirstGenValidator.isValid(pokemon)
      if (!isValidPokemon) { return new PokemonInvalidError(pokemon) }
      const isValidAbility = await this.abilityValidator.isValid(pokemon, pokemonTeam.pokemon.ability)
      if (!isValidAbility) { return new AbilityInvalidError(pokemonTeam.pokemon.ability) }
      const isValidHoldItem = await this.holdItemValidator.isValid(pokemonTeam.pokemon.holdItem)
      if (!isValidHoldItem) { return new HoldItemInvalidError(pokemonTeam.pokemon.holdItem) }
      if (pokemonTeam.pokemon.moves.length < 1 || pokemonTeam.pokemon.moves.length > 4) {
        return new LengthInvalidError('a pokemon must have between 1 to 4 moves')
      }
      for (const move of pokemonTeam.pokemon.moves) {
        const isValidMove = await this.moveValidator.isValid(pokemon, move.name)
        if (!isValidMove) { return new MoveInvalidError(move.name) }
      }
    }

    return null
  }
}
