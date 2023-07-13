import { type EditTeamParams, type EditTeamReturn } from '../../../domain/usecases-contracts/team/edit-team'

export interface EditTeamRepository {
  edit: (editTeamParams: EditTeamParams) => Promise<EditTeamReturn | null>
}
