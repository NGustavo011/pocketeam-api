import { type PokemonModel, type AllPokemonModel } from '../../domain/models/pokemon'
import { type GetAllPokemonContract } from '../../domain/usecases-contracts/pokemon/get-all-pokemon'
import { type GetPokemonContract } from '../../domain/usecases-contracts/pokemon/get-pokemon'

export const mockGetAllPokemon = (): GetAllPokemonContract => {
  class GetAllPokemonStub implements GetAllPokemonContract {
    async getAll (): Promise<AllPokemonModel | null> {
      return await Promise.resolve(
        [
          {
            name: 'pokemon-1'
          },
          {
            name: 'pokemon-2'
          },
          {
            name: 'pokemon-3'
          }
        ]
      )
    }
  }
  return new GetAllPokemonStub()
}

export const mockGetPokemon = (): GetPokemonContract => {
  class GetPokemonStub implements GetPokemonContract {
    async get (name: string): Promise<PokemonModel | null> {
      return await Promise.resolve(
        {
          name: 'pokemon-1',
          abilities: [
            {
              name: 'ability-1'
            },
            {
              name: 'ability-2'
            },
            {
              name: 'ability-3'
            },
            {
              name: 'ability-4'
            }
          ],
          moves: [
            {
              name: 'move-1'
            },
            {
              name: 'move-2'
            },
            {
              name: 'move-3'
            },
            {
              name: 'move-4'
            }
          ]
        }
      )
    }
  }
  return new GetPokemonStub()
}
