import { type DeleteTeamParams } from '../../../domain/usecases-contracts/team/delete-team'

export interface DeleteTeamRepository {
  delete: (deleteTeamParams: DeleteTeamParams) => Promise<void>
}
