import { type AddTeamReturn, type AddTeamContract, type AddTeamParams } from '../../../../domain/usecases-contracts/team/add-team'
import { type AddTeamRepository } from '../../../repositories-contracts/team/add-team-repository'

export class AddTeam implements AddTeamContract {
  constructor (private readonly addTeamRepository: AddTeamRepository) {
  }

  async add (addTeamParams: AddTeamParams): Promise<AddTeamReturn | null> {
    const team = await this.addTeamRepository.add(addTeamParams)
    return team
  }
}
