import { mockAddTeamReturn, mockEditTeamReturn, mockPokemonTeamModel } from '../../data/test/mock-team'
import { type TeamModel } from '../../domain/models/team'
import { type AddTeamParams, type AddTeamContract, type AddTeamReturn } from '../../domain/usecases-contracts/team/add-team'
import { type DeleteTeamContract, type DeleteTeamParams } from '../../domain/usecases-contracts/team/delete-team'
import { type EditTeamContract, type EditTeamParams } from '../../domain/usecases-contracts/team/edit-team'
import { type GetTeamContract, type GetTeamParams, type GetTeamReturn } from '../../domain/usecases-contracts/team/get-team'

export const mockGetTeam = (): GetTeamContract => {
  class GetTeamStub implements GetTeamContract {
    async get (getTeamParams: GetTeamParams): Promise<GetTeamReturn | null> {
      return await Promise.resolve([mockPokemonTeamModel()])
    }
  }
  return new GetTeamStub()
}

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

export const mockDeleteTeam = (): DeleteTeamContract => {
  class DeleteTeamStub implements DeleteTeamContract {
    async delete (deleteTeamParams: DeleteTeamParams): Promise<void> {
      await Promise.resolve()
    }
  }
  return new DeleteTeamStub()
}
