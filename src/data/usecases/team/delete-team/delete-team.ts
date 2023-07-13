import { type DeleteTeamContract, type DeleteTeamParams } from '../../../../domain/usecases-contracts/team/delete-team'
import { type DeleteTeamRepository } from '../../../repositories-contracts/team/delete-team-repository'

export class DeleteTeam implements DeleteTeamContract {
  constructor (private readonly deleteTeamRepository: DeleteTeamRepository) {
  }

  async delete (deleteTeamParams: DeleteTeamParams): Promise<void> {
    await this.deleteTeamRepository.delete(deleteTeamParams)
  }
}
