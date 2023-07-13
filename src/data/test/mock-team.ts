import { type PokemonTeamModel } from '../../domain/models/team'
import { type AddTeamReturn, type AddTeamParams } from '../../domain/usecases-contracts/team/add-team'
import { type EditTeamReturn, type EditTeamParams } from '../../domain/usecases-contracts/team/edit-team'
import { type GetTeamParams } from '../../domain/usecases-contracts/team/get-team'
import { type AddTeamRepository } from '../repositories-contracts/team/add-team-repository'
import { type EditTeamRepository } from '../repositories-contracts/team/edit-team-repository'
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

export const mockAddTeamParams = (): AddTeamParams => {
  return {
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
    ],
    visible: true
  }
}

export const mockAddTeamReturn = (): AddTeamReturn => {
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
    ],
    visible: true
  }
}

export const mockEditTeamParams = (): EditTeamParams => {
  return {
    teamId: 'team_id',
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
    ],
    visible: true
  }
}

export const mockEditTeamReturn = (): EditTeamReturn => {
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
    ],
    visible: true
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

export const mockAddTeamRepository = (): AddTeamRepository => {
  class AddTeamRepositoryStub implements AddTeamRepository {
    async add (addTeamParams: AddTeamParams): Promise<AddTeamReturn | null> {
      return await Promise.resolve(mockAddTeamReturn())
    }
  }
  return new AddTeamRepositoryStub()
}

export const mockEditTeamRepository = (): EditTeamRepository => {
  class EditTeamRepositoryStub implements EditTeamRepository {
    async edit (editTeamParams: EditTeamParams): Promise<EditTeamReturn | null> {
      return await Promise.resolve(mockEditTeamReturn())
    }
  }
  return new EditTeamRepositoryStub()
}
