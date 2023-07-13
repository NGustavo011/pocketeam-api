import { type PokemonTeamModel } from '../../../domain/models/team'
import { type GetTeamContract, type GetTeamParams } from '../../../domain/usecases-contracts/team/get-team'
import { type GetTeamRepository } from '../../repositories-contracts/team/get-team-repository'

export class GetTeam implements GetTeamContract {
  constructor (private readonly getTeamRepository: GetTeamRepository) {
  }

  async get (getTeamParams: GetTeamParams): Promise<PokemonTeamModel | null> {
    const team = await this.getTeamRepository.get(getTeamParams)
    return team
  }
}
