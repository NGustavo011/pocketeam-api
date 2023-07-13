import { type AllPokemonModel } from '../../../../domain/models/pokemon'
import { type GetAllPokemonContract } from '../../../../domain/usecases-contracts/pokemon/get-all-pokemon'
import { type GetAllPokemonRepository } from '../../../repositories-contracts/pokemon/get-all-pokemon-repository'

export class GetAllPokemon implements GetAllPokemonContract {
  constructor (private readonly getAllPokemonRepository: GetAllPokemonRepository) {}
  async getAll (): Promise<AllPokemonModel | null> {
    const allPokemon = await this.getAllPokemonRepository.getAll()
    return allPokemon
  }
}
