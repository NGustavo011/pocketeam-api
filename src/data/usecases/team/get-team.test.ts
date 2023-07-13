import { throwError } from '../../../domain/test/test-helpers'
import { type GetTeamRepository } from '../../repositories-contracts/team/get-team-repository'
import { mockGetTeamParams, mockGetTeamRepository, mockPokemonTeamModel } from '../../test/mock-team'
import { GetTeam } from './get-team'

interface SutTypes {
  getTeamRepositoryStub: GetTeamRepository
  sut: GetTeam
}

const makeSut = (): SutTypes => {
  const getTeamRepositoryStub = mockGetTeamRepository()
  const sut = new GetTeam(getTeamRepositoryStub)
  return {
    getTeamRepositoryStub,
    sut
  }
}

describe('GetTeam usecase', () => {
  describe('GetTeamRepository dependency', () => {
    test('Deve chamar GetTeamRepository com os valores corretos', async () => {
      const { sut, getTeamRepositoryStub } = makeSut()
      const getSpy = jest.spyOn(getTeamRepositoryStub, 'get')
      await sut.get(mockGetTeamParams())
      expect(getSpy).toHaveBeenCalledWith(mockGetTeamParams())
    })
    test('Deve repassar a exceção se o GetTeamRepository lançar um erro', async () => {
      const { sut, getTeamRepositoryStub } = makeSut()
      jest.spyOn(getTeamRepositoryStub, 'get').mockImplementationOnce(throwError)
      const promise = sut.get(mockGetTeamParams())
      await expect(promise).rejects.toThrow()
    })
    test('Deve retornar null se GetTeamRepository retornar null', async () => {
      const { sut, getTeamRepositoryStub } = makeSut()
      jest.spyOn(getTeamRepositoryStub, 'get').mockReturnValueOnce(Promise.resolve(null))
      const pokemon = await sut.get(mockGetTeamParams())
      expect(pokemon).toBeNull()
    })
  })
  test('Deve retornar um GetTeamReturn com sucesso', async () => {
    const { sut } = makeSut()
    const team = await sut.get(mockGetTeamParams())
    expect(team).toEqual(mockPokemonTeamModel())
  })
})
