import { type TeamModel, type Team } from '../../models/team'

export type EditTeamParams = Team & {
  userId: string
  teamId: string
}

export type EditTeamReturn = TeamModel

export interface EditTeamContract {
  edit: (editTeamParams: EditTeamParams) => Promise<EditTeamReturn | null>
}
