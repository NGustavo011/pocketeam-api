import { throwError } from '../../../../domain/test/test-helpers'
import { type GetAllPokemonRepository } from '../../../repositories-contracts/pokemon/get-all-pokemon-repository'
import { mockAllPokemonModel, mockGetAllPokemonRepository } from '../../../test/mock-pokemon'
import { GetAllPokemon } from './get-all-pokemon'

interface SutTypes {
  getAllPokemonRepositoryStub: GetAllPokemonRepository
  sut: GetAllPokemon
}

const makeSut = (): SutTypes => {
  const getAllPokemonRepositoryStub = mockGetAllPokemonRepository()
  const sut = new GetAllPokemon(getAllPokemonRepositoryStub)
  return {
    getAllPokemonRepositoryStub,
    sut
  }
}

describe('GetAllPokemon usecase', () => {
  describe('GetAllPokemonRepository dependecy', () => {
    test('Deve chamar GetAllPokemonRepository', async () => {
      const { sut, getAllPokemonRepositoryStub } = makeSut()
      const getAllSpy = jest.spyOn(getAllPokemonRepositoryStub, 'getAll')
      await sut.getAll()
      expect(getAllSpy).toHaveBeenCalled()
    })
    test('Deve repassar a exceção se o GetAllPokemonRepository lançar um erro', async () => {
      const { sut, getAllPokemonRepositoryStub } = makeSut()
      jest.spyOn(getAllPokemonRepositoryStub, 'getAll').mockImplementationOnce(throwError)
      const promise = sut.getAll()
      await expect(promise).rejects.toThrow()
    })
  })
  test('Deve retornar um AllPokemonModel com sucesso', async () => {
    const { sut } = makeSut()
    const allPokemon = await sut.getAll()
    expect(allPokemon).toEqual(mockAllPokemonModel())
  })
})
