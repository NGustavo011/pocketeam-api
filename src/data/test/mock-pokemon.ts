import { type AllPokemonModel } from '../../domain/models/pokemon'
import { type GetAllPokemonRepository } from '../repositories-contracts/pokemon/get-all-pokemon-repository'

export const mockAllPokemonModel = (): AllPokemonModel => (
  [
    {
      name: 'pokemon-1'
    },
    {
      name: 'pokemon-2'
    }
  ]
)

export const mockGetAllPokemonRepository = (): GetAllPokemonRepository => {
  class GetAllPokemonRepositoryStub implements GetAllPokemonRepository {
    async getAll (): Promise<AllPokemonModel> {
      return await Promise.resolve(mockAllPokemonModel())
    }
  }
  return new GetAllPokemonRepositoryStub()
}
