import { throwError } from '../../../../domain/test/test-helpers'
import { type DeleteTeamRepository } from '../../../repositories-contracts/team/delete-team-repository'
import { mockDeleteTeamParams, mockDeleteTeamRepository } from '../../../test/mock-team'
import { DeleteTeam } from './delete-team'

interface SutTypes {
  deleteTeamRepositoryStub: DeleteTeamRepository
  sut: DeleteTeam
}

const makeSut = (): SutTypes => {
  const deleteTeamRepositoryStub = mockDeleteTeamRepository()
  const sut = new DeleteTeam(deleteTeamRepositoryStub)
  return {
    deleteTeamRepositoryStub,
    sut
  }
}

describe('DeleteTeam usecase', () => {
  describe('DeleteTeamRepository dependency', () => {
    test('Deve chamar DeleteTeamRepository com os valores corretos', async () => {
      const { sut, deleteTeamRepositoryStub } = makeSut()
      const deleteSpy = jest.spyOn(deleteTeamRepositoryStub, 'delete')
      await sut.delete(mockDeleteTeamParams())
      expect(deleteSpy).toHaveBeenCalledWith(mockDeleteTeamParams())
    })
    test('Deve repassar a exceção se o DeleteTeamRepository lançar um erro', async () => {
      const { sut, deleteTeamRepositoryStub } = makeSut()
      jest.spyOn(deleteTeamRepositoryStub, 'delete').mockImplementationOnce(throwError)
      const promise = sut.delete(mockDeleteTeamParams())
      await expect(promise).rejects.toThrow()
    })
  })
})
