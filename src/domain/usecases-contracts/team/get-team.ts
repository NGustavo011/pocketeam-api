import { type PokemonTeam } from '../../models/team'

export interface GetTeamParams {
  userId: string
  searchUserId?: string
}

export type GetTeamReturn = PokemonTeam[] & { id: string, userId: string }

export interface getTeam {
  get: (getTeamParams: GetTeamParams) => Promise<GetTeamReturn | null>
}
