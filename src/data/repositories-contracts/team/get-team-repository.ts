import { type GetTeamParams, type GetTeamReturn } from '../../../domain/usecases-contracts/team/get-team'

export interface GetTeamRepository {
  get: (getTeamParams: GetTeamParams) => Promise<GetTeamReturn | null>
}
