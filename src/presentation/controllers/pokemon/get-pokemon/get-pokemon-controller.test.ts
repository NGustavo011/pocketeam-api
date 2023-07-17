import { throwError } from '../../../../domain/test/test-helpers'
import { type GetPokemonContract } from '../../../../domain/usecases-contracts/pokemon/get-pokemon'
import { mockValidation } from '../../../../validation/test/mock-validation'
import { type HttpRequest } from '../../../contracts/http'
import { type Validation } from '../../../contracts/validation'
import { MissingParamError } from '../../../errors'
import { badRequest, serverError } from '../../../helpers/http/http-helper'
import { mockGetPokemon } from '../../../test/mock-pokemon'
import { GetPokemonController } from './get-pokemon-controller'

const mockRequest = (): HttpRequest => {
  return {
    params: {
      pokemonName: 'pokemon-1'
    }
  }
}

interface SutTypes {
  sut: GetPokemonController
  validationStub: Validation
  getPokemonStub: GetPokemonContract
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const getPokemonStub = mockGetPokemon()
  const sut = new GetPokemonController(validationStub, getPokemonStub)
  return {
    sut,
    validationStub,
    getPokemonStub
  }
}

describe('GetPokemon Controller', () => {
  describe('Validation dependency', () => {
    test('Deve chamar o Validation com valores corretos', async () => {
      const { sut, validationStub } = makeSut()
      const validateSpy = jest.spyOn(validationStub, 'validate')
      const httpRequest = mockRequest()
      await sut.execute(httpRequest)
      expect(validateSpy).toHaveBeenCalledWith(httpRequest.params)
    })
    test('Retorne status 400 se o Validation retornar um erro', async () => {
      const { sut, validationStub } = makeSut()
      jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
      const httpResponse = await sut.execute(mockRequest())
      expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
    })
  })
  describe('GetPokemon dependency', () => {
    test('Deve chamar GetPokemon com valores corretos', async () => {
      const { sut, getPokemonStub } = makeSut()
      const getSpy = jest.spyOn(getPokemonStub, 'get')
      await sut.execute(mockRequest())
      expect(getSpy).toHaveBeenCalledWith(mockRequest().params.pokemonName)
    })
    test('Deve retornar 500 se GetPokemon lançar uma exceção', async () => {
      const { sut, getPokemonStub } = makeSut()
      jest.spyOn(getPokemonStub, 'get').mockImplementationOnce(throwError)
      const httpResponse = await sut.execute(mockRequest())
      expect(httpResponse).toEqual(serverError(new Error()))
    })
  })
})
