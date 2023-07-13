import { throwError } from '../../../../domain/test/test-helpers'
import { type EditTeamRepository } from '../../../repositories-contracts/team/edit-team-repository'
import { mockEditTeamParams, mockEditTeamRepository, mockEditTeamReturn } from '../../../test/mock-team'
import { EditTeam } from './edit-team'

interface SutTypes {
  editTeamRepositoryStub: EditTeamRepository
  sut: EditTeam
}

const makeSut = (): SutTypes => {
  const editTeamRepositoryStub = mockEditTeamRepository()
  const sut = new EditTeam(editTeamRepositoryStub)
  return {
    editTeamRepositoryStub,
    sut
  }
}

describe('EditTeam usecase', () => {
  describe('EditTeamRepository dependency', () => {
    test('Deve chamar EditTeamRepository com os valores corretos', async () => {
      const { sut, editTeamRepositoryStub } = makeSut()
      const editSpy = jest.spyOn(editTeamRepositoryStub, 'edit')
      await sut.edit(mockEditTeamParams())
      expect(editSpy).toHaveBeenCalledWith(mockEditTeamParams())
    })
    test('Deve repassar a exceção se o EditTeamRepository lançar um erro', async () => {
      const { sut, editTeamRepositoryStub } = makeSut()
      jest.spyOn(editTeamRepositoryStub, 'edit').mockImplementationOnce(throwError)
      const promise = sut.edit(mockEditTeamParams())
      await expect(promise).rejects.toThrow()
    })
    test('Deve retornar null se EditTeamRepository retornar null', async () => {
      const { sut, editTeamRepositoryStub } = makeSut()
      jest.spyOn(editTeamRepositoryStub, 'edit').mockReturnValueOnce(Promise.resolve(null))
      const team = await sut.edit(mockEditTeamParams())
      expect(team).toBeNull()
    })
  })
  test('Deve retornar um EditTeamReturn com sucesso', async () => {
    const { sut } = makeSut()
    const team = await sut.edit(mockEditTeamParams())
    expect(team).toEqual(mockEditTeamReturn())
  })
})
