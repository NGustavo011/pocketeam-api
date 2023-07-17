import { type AllPokemonModel } from '../../domain/models/pokemon'
import { type GetAllPokemonContract } from '../../domain/usecases-contracts/pokemon/get-all-pokemon'

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
