import { throwError } from '../../../../domain/test/test-helpers'
import { type GetAllPokemonContract } from '../../../../domain/usecases-contracts/pokemon/get-all-pokemon'
import { type HttpRequest } from '../../../contracts/http'
import { ServerError } from '../../../errors'
import { ok, serverError } from '../../../helpers/http/http-helper'
import { mockGetAllPokemon } from '../../../test/mock-pokemon'
import { GetAllPokemonController } from './get-all-pokemon-controller'

const mockRequest = (): HttpRequest => {
  return {
  }
}

interface SutTypes {
  sut: GetAllPokemonController
  getAllPokemonStub: GetAllPokemonContract
}

const makeSut = (): SutTypes => {
  const getAllPokemonStub = mockGetAllPokemon()
  const sut = new GetAllPokemonController(getAllPokemonStub)
  return {
    sut,
    getAllPokemonStub
  }
}

describe('GetAllPokemon Controller', () => {
  describe('GetAllPokemon dependecy', () => {
    test('Deve chamar GetAllPokemon', async () => {
      const { sut, getAllPokemonStub } = makeSut()
      const getAllSpy = jest.spyOn(getAllPokemonStub, 'getAll')
      await sut.execute(mockRequest())
      expect(getAllSpy).toHaveBeenCalled()
    })
    test('Retorne status de erro 500 se o execute lançar um erro', async () => {
      const { sut, getAllPokemonStub } = makeSut()
      jest.spyOn(getAllPokemonStub, 'getAll').mockImplementationOnce(throwError)
      const httpResponse = await sut.execute(mockRequest())
      expect(httpResponse).toEqual(serverError(new ServerError()))
    })
  })
  test('Retorne status 200 se o dado provido for válido', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.execute(mockRequest())
    expect(httpResponse).toEqual(ok(await mockGetAllPokemon().getAll()))
  })
})
