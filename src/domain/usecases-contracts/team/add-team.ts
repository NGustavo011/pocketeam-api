import { type Team } from '../../models/team'

export type AddTeamParams = Team & { userId: string }

export type AddTeamReturn = Team & { id: string, userId: string }

export interface AddTeam {
  add: (addTeamParams: AddTeamParams) => Promise<AddTeamReturn | null>
}
