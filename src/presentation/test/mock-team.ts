import { mockAddTeamReturn, mockEditTeamReturn } from '../../data/test/mock-team'
import { type TeamModel } from '../../domain/models/team'
import { type AddTeamParams, type AddTeamContract, type AddTeamReturn } from '../../domain/usecases-contracts/team/add-team'
import { type EditTeamContract, type EditTeamParams } from '../../domain/usecases-contracts/team/edit-team'

export const mockAddTeam = (): AddTeamContract => {
  class AddTeamStub implements AddTeamContract {
    async add (addTeamParams: AddTeamParams): Promise<AddTeamReturn | null> {
      return await Promise.resolve(mockAddTeamReturn())
    }
  }
  return new AddTeamStub()
}

export const mockEditTeam = (): EditTeamContract => {
  class EditTeamStub implements EditTeamContract {
    async edit (editTeamParams: EditTeamParams): Promise<TeamModel | null> {
      return await Promise.resolve(mockEditTeamReturn())
    }
  }
  return new EditTeamStub()
}
