import { type AddTeamParams, type AddTeamReturn } from '../../../domain/usecases-contracts/team/add-team'

export interface AddTeamRepository {
  add: (addTeamParams: AddTeamParams) => Promise<AddTeamReturn | null>
}
