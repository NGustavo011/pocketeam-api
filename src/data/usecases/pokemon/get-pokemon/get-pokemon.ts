import { type PokemonModel } from '../../../../domain/models/pokemon'
import { type GetPokemonContract } from '../../../../domain/usecases-contracts/pokemon/get-pokemon'
import { type GetPokemonRepository } from '../../../repositories-contracts/pokemon/get-pokemon-repository'

export class GetPokemon implements GetPokemonContract {
  constructor (private readonly getPokemonRepository: GetPokemonRepository) {
  }

  async get (name: string): Promise<PokemonModel | null> {
    const pokemon = await this.getPokemonRepository.get(name)
    if (!pokemon) return null
    return pokemon
  }
}
