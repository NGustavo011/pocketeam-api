import { type TeamModel, type Team } from '../../models/team'

export type AddTeamParams = Team & { userId: string }

export type AddTeamReturn = TeamModel

export interface AddTeamContract {
  add: (addTeamParams: AddTeamParams) => Promise<AddTeamReturn | null>
}
