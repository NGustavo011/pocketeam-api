import { type PokemonTeamModel } from '../../models/team'

export interface GetTeamParams {
  userId: string
  searchUserId?: string
}

export type GetTeamReturn = PokemonTeamModel

export interface GetTeamContract {
  get: (getTeamParams: GetTeamParams) => Promise<GetTeamReturn | null>
}
