import { throwError } from '../../../../domain/test/test-helpers'
import { type GetAllPokemonRepository } from '../../../repositories-contracts/pokemon/get-all-pokemon-repository'
import { mockGetAllPokemonRepository } from '../../../test/mock-pokemon'
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
      const getSpy = jest.spyOn(getAllPokemonRepositoryStub, 'getAll')
      await sut.getAll()
      expect(getSpy).toHaveBeenCalled()
    })
    test('Deve repassar a exceção se o GetAllPokemonRepository lançar um erro', async () => {
      const { sut, getAllPokemonRepositoryStub } = makeSut()
      jest.spyOn(getAllPokemonRepositoryStub, 'getAll').mockImplementationOnce(throwError)
      const promise = sut.getAll()
      await expect(promise).rejects.toThrow()
    })
  })
})
