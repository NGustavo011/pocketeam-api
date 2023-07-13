import { type GetTeamReturn, type GetTeamContract, type GetTeamParams } from '../../../../domain/usecases-contracts/team/get-team'
import { type GetTeamRepository } from '../../../repositories-contracts/team/get-team-repository'

export class GetTeam implements GetTeamContract {
  constructor (private readonly getTeamRepository: GetTeamRepository) {
  }

  async get (getTeamParams: GetTeamParams): Promise<GetTeamReturn | null> {
    const pokemonTeam = await this.getTeamRepository.get(getTeamParams)
    return pokemonTeam
  }
}
