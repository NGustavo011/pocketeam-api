import { throwError } from '../../../../domain/test/test-helpers'
import { type GetPokemonRepository } from '../../../repositories-contracts/pokemon/get-pokemon-repository'
import { mockGetPokemonRepository, mockPokemonModel } from '../../../test/mock-pokemon'
import { GetPokemon } from './get-pokemon'

interface SutTypes {
  getPokemonRepositoryStub: GetPokemonRepository
  sut: GetPokemon
}

const makeSut = (): SutTypes => {
  const getPokemonRepositoryStub = mockGetPokemonRepository()
  const sut = new GetPokemon(getPokemonRepositoryStub)
  return {
    getPokemonRepositoryStub,
    sut
  }
}

describe('GetPokemon usecase', () => {
  describe('GetPokemonRepository dependecy', () => {
    test('Deve chamar GetPokemonRepository com os valores corretos', async () => {
      const { sut, getPokemonRepositoryStub } = makeSut()
      const getSpy = jest.spyOn(getPokemonRepositoryStub, 'get')
      await sut.get(mockPokemonModel().name)
      expect(getSpy).toHaveBeenCalledWith(mockPokemonModel().name)
    })
    test('Deve repassar a exceção se o GetPokemonRepository lançar um erro', async () => {
      const { sut, getPokemonRepositoryStub } = makeSut()
      jest.spyOn(getPokemonRepositoryStub, 'get').mockImplementationOnce(throwError)
      const promise = sut.get(mockPokemonModel().name)
      await expect(promise).rejects.toThrow()
    })
    test('Deve retornar null se GetPokemonRepository retornar null', async () => {
      const { sut, getPokemonRepositoryStub } = makeSut()
      jest.spyOn(getPokemonRepositoryStub, 'get').mockReturnValueOnce(Promise.resolve(null))
      const pokemon = await sut.get(mockPokemonModel().name)
      expect(pokemon).toBeNull()
    })
  })
  test('Deve retornar um PokemonModel com sucesso', async () => {
    const { sut } = makeSut()
    const pokemon = await sut.get(mockPokemonModel().name)
    expect(pokemon).toEqual(mockPokemonModel())
  })
})
