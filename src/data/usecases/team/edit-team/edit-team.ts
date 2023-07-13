
import { type EditTeamContract, type EditTeamParams, type EditTeamReturn } from '../../../../domain/usecases-contracts/team/edit-team'
import { type EditTeamRepository } from '../../../repositories-contracts/team/edit-team-repository'

export class EditTeam implements EditTeamContract {
  constructor (private readonly editTeamRepository: EditTeamRepository) {
  }

  async edit (editTeamParams: EditTeamParams): Promise<EditTeamReturn | null> {
    await this.editTeamRepository.edit(editTeamParams)
    return null
  }
}
