import { type Team } from '../../models/team'

export type EditTeamParams = Team & {
  userId: string
  teamId: string
}

export type EditTeamReturn = Team & { id: string, userId: string }

export interface editTeam {
  edit: (editTeamParams: EditTeamParams) => Promise<EditTeamReturn | null>
}
