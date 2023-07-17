import { mockAddTeamReturn } from '../../data/test/mock-team'
import { type AddTeamParams, type AddTeamContract, type AddTeamReturn } from '../../domain/usecases-contracts/team/add-team'

export const mockAddTeam = (): AddTeamContract => {
  class AddTeamStub implements AddTeamContract {
    async add (addTeamParams: AddTeamParams): Promise<AddTeamReturn | null> {
      return await Promise.resolve(mockAddTeamReturn())
    }
  }
  return new AddTeamStub()
}
