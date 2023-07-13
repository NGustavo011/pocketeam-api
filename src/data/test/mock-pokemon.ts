import { type PokemonModel, type AllPokemonModel } from '../../domain/models/pokemon'
import { type GetAllPokemonRepository } from '../repositories-contracts/pokemon/get-all-pokemon-repository'
import { type GetPokemonRepository } from '../repositories-contracts/pokemon/get-pokemon-repository'

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

export const mockPokemonModel = (): PokemonModel => (

  {
    name: 'pokemon-1',
    abilities: [
      {
        name: 'ability-1'
      },
      {
        name: 'ability-2'
      }
    ],
    moves: [
      {
        name: 'move-1'
      },
      {
        name: 'move-2'
      }
    ]
  }

)

export const mockGetAllPokemonRepository = (): GetAllPokemonRepository => {
  class GetAllPokemonRepositoryStub implements GetAllPokemonRepository {
    async getAll (): Promise<AllPokemonModel> {
      return await Promise.resolve(mockAllPokemonModel())
    }
  }
  return new GetAllPokemonRepositoryStub()
}

export const mockGetPokemonRepository = (): GetPokemonRepository => {
  class GetPokemonRepositoryStub implements GetPokemonRepository {
    async get (name: string): Promise<PokemonModel | null> {
      return await Promise.resolve(mockPokemonModel())
    }
  }
  return new GetPokemonRepositoryStub()
}
