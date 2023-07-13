import { type PokemonTeamModel } from '../../domain/models/team'
import { type GetTeamParams } from '../../domain/usecases-contracts/team/get-team'
import { type GetTeamRepository } from '../repositories-contracts/team/get-team-repository'

export const mockGetTeamParams = (): GetTeamParams => {
  return {
    userId: 'any_user_id',
    searchUserId: 'any_search_user_id'
  }
}

export const mockPokemonTeamModel = (): PokemonTeamModel => {
  return {
    id: 'any_id',
    userId: 'user_id',
    team: [
      {
        pokemon: {
          name: 'pokemon-1',
          ability: 'ability-1',
          holdItem: 'hold-item-1',
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
      }
    ]
  }
}

export const mockGetTeamRepository = (): GetTeamRepository => {
  class GetTeamRepositoryStub implements GetTeamRepository {
    async get (getTeamParams: GetTeamParams): Promise<PokemonTeamModel | null> {
      return await Promise.resolve(mockPokemonTeamModel())
    }
  }
  return new GetTeamRepositoryStub()
}
