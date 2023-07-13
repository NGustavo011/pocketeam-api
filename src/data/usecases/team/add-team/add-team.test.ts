import { throwError } from '../../../../domain/test/test-helpers'
import { type AddTeamRepository } from '../../../repositories-contracts/team/add-team-repository'
import { mockAddTeamParams, mockAddTeamRepository } from '../../../test/mock-team'
import { AddTeam } from './add-team'

interface SutTypes {
  addTeamRepositoryStub: AddTeamRepository
  sut: AddTeam
}

const makeSut = (): SutTypes => {
  const addTeamRepositoryStub = mockAddTeamRepository()
  const sut = new AddTeam(addTeamRepositoryStub)
  return {
    addTeamRepositoryStub,
    sut
  }
}

describe('AddTeam usecase', () => {
  describe('AddTeamRepository dependency', () => {
    test('Deve chamar AddTeamRepository com os valores corretos', async () => {
      const { sut, addTeamRepositoryStub } = makeSut()
      const addSpy = jest.spyOn(addTeamRepositoryStub, 'add')
      await sut.add(mockAddTeamParams())
      expect(addSpy).toHaveBeenCalledWith(mockAddTeamParams())
    })
    test('Deve repassar a exceção se o AddTeamRepository lançar um erro', async () => {
      const { sut, addTeamRepositoryStub } = makeSut()
      jest.spyOn(addTeamRepositoryStub, 'add').mockImplementationOnce(throwError)
      const promise = sut.add(mockAddTeamParams())
      await expect(promise).rejects.toThrow()
    })
    test('Deve retornar null se AddTeamRepository retornar null', async () => {
      const { sut, addTeamRepositoryStub } = makeSut()
      jest.spyOn(addTeamRepositoryStub, 'add').mockReturnValueOnce(Promise.resolve(null))
      const pokemon = await sut.add(mockAddTeamParams())
      expect(pokemon).toBeNull()
    })
  })
})
