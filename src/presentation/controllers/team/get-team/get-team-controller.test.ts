import { mockPokemonTeamModel } from '../../../../data/test/mock-team'
import { throwError } from '../../../../domain/test/test-helpers'
import { type ValidateTokenContract } from '../../../../domain/usecases-contracts/account/validate-token'
import { type GetTeamContract } from '../../../../domain/usecases-contracts/team/get-team'
import { mockValidation } from '../../../../validation/test/mock-validation'
import { type HttpRequest } from '../../../contracts/http'
import { type Validation } from '../../../contracts/validation'
import { MissingParamError } from '../../../errors'
import { badRequest, ok, serverError, unauthorized } from '../../../helpers/http/http-helper'
import { mockValidateToken } from '../../../test/mock-account'
import { mockGetTeam } from '../../../test/mock-team'
import { GetTeamController } from './get-team-controller'

const mockRequest = (): HttpRequest => {
  return {
    headers: {
      Authorization: 'any_token'
    },
    params: {
      userId: ''
    }
  }
}

interface SutTypes {
  validationStub: Validation
  validateTokenStub: ValidateTokenContract
  getTeamStub: GetTeamContract
  sut: GetTeamController
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const validateTokenStub = mockValidateToken()
  const getTeamStub = mockGetTeam()
  const sut = new GetTeamController(validationStub, validateTokenStub, getTeamStub)
  return {
    validationStub,
    validateTokenStub,
    getTeamStub,
    sut
  }
}

describe('GetTeam Controller', () => {
  describe('Validation dependency', () => {
    test('Deve chamar o Validation com valores corretos', async () => {
      const { sut, validationStub } = makeSut()
      const validateSpy = jest.spyOn(validationStub, 'validate')
      const httpRequest = mockRequest()
      await sut.execute(httpRequest)
      expect(validateSpy).toHaveBeenLastCalledWith(Object.assign({}, httpRequest.headers, httpRequest.params))
    })
    test('Retorne status 400 se o Validation retornar um erro', async () => {
      const { sut, validationStub } = makeSut()
      jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
      const httpResponse = await sut.execute(mockRequest())
      expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
    })
  })
  describe('ValidateToken dependency', () => {
    test('Deve chamar o ValidateToken com valores corretos', async () => {
      const { sut, validateTokenStub } = makeSut()
      const validateTokenSpy = jest.spyOn(validateTokenStub, 'validateToken')
      const httpRequest = mockRequest()
      await sut.execute(httpRequest)
      expect(validateTokenSpy).toHaveBeenCalledWith(httpRequest.headers.Authorization)
    })
    test('Retorne status 401 se o ValidateToken retornar null', async () => {
      const { sut, validateTokenStub } = makeSut()
      jest.spyOn(validateTokenStub, 'validateToken').mockReturnValueOnce(Promise.resolve(null))
      const httpResponse = await sut.execute(mockRequest())
      expect(httpResponse).toEqual(unauthorized())
    })
  })
  describe('GetTeam dependency', () => {
    test('Deve chamar GetTeam com valores corretos', async () => {
      const { sut, getTeamStub } = makeSut()
      const getSpy = jest.spyOn(getTeamStub, 'get')
      await sut.execute(mockRequest())
      expect(getSpy).toHaveBeenCalledWith({
        userId: 'any_user_id',
        searchUserId: mockRequest().params.userId
      })
    })
    test('Deve retornar 500 se GetTeam lançar uma exceção', async () => {
      const { sut, getTeamStub } = makeSut()
      jest.spyOn(getTeamStub, 'get').mockImplementationOnce(throwError)
      const httpResponse = await sut.execute(mockRequest())
      expect(httpResponse).toEqual(serverError(new Error()))
    })
  })
  test('Retorne status 200 se o dado provido for válido', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.execute(mockRequest())
    expect(httpResponse).toEqual(ok([mockPokemonTeamModel()]))
  })
})
