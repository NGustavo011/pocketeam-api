import { throwError } from '../../../../domain/test/test-helpers'
import { type ValidateTokenContract } from '../../../../domain/usecases-contracts/account/validate-token'
import { type AddTeamContract } from '../../../../domain/usecases-contracts/team/add-team'
import { mockValidation } from '../../../../validation/test/mock-validation'
import { type HttpRequest } from '../../../contracts/http'
import { type Validation } from '../../../contracts/validation'
import { MissingParamError } from '../../../errors'
import { badRequest, noContent, serverError, unauthorized } from '../../../helpers/http/http-helper'
import { mockValidateToken } from '../../../test/mock-account'
import { mockAddTeam } from '../../../test/mock-team'
import { AddTeamController } from './add-team-controller'

const mockRequest = (): HttpRequest => {
  return {
    body: {
      team: [
        {
          pokemon: {
            name: 'pokemon-1',
            ability: 'ability-1',
            holdItem: 'hold-item-1',
            moves: [
              {
                name: 'move-1'
              },
              {
                name: 'move-2'
              }
            ]
          }
        },
        {
          pokemon: {
            name: 'pokemon-2',
            ability: 'ability-2',
            holdItem: 'hold-item-2',
            moves: [
              {
                name: 'move-1'
              },
              {
                name: 'move-2'
              }
            ]
          }
        }
      ],
      visible: true
    },
    headers: {
      authorization: 'any_token'
    }
  }
}

interface SutTypes {
  validationStub: Validation
  validateTokenStub: ValidateTokenContract
  addTeamStub: AddTeamContract
  sut: AddTeamController
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const validateTokenStub = mockValidateToken()
  const addTeamStub = mockAddTeam()
  const sut = new AddTeamController(validationStub, validateTokenStub, addTeamStub)
  return {
    validationStub,
    validateTokenStub,
    addTeamStub,
    sut
  }
}

describe('AddTeam Controller', () => {
  describe('Validation dependency', () => {
    test('Deve chamar o Validation com valores corretos', async () => {
      const { sut, validationStub } = makeSut()
      const validateSpy = jest.spyOn(validationStub, 'validate')
      const httpRequest = mockRequest()
      await sut.execute(httpRequest)
      expect(validateSpy).toHaveBeenLastCalledWith(Object.assign({}, httpRequest.headers, httpRequest.body))
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
      expect(validateTokenSpy).toHaveBeenCalledWith(httpRequest.headers.authorization)
    })
    test('Retorne status 401 se o ValidateToken retornar null', async () => {
      const { sut, validateTokenStub } = makeSut()
      jest.spyOn(validateTokenStub, 'validateToken').mockReturnValueOnce(Promise.resolve(null))
      const httpResponse = await sut.execute(mockRequest())
      expect(httpResponse).toEqual(unauthorized())
    })
  })
  describe('AddTeam dependency', () => {
    test('Deve chamar AddTeam com valores corretos', async () => {
      const { sut, addTeamStub } = makeSut()
      const getSpy = jest.spyOn(addTeamStub, 'add')
      await sut.execute(mockRequest())
      expect(getSpy).toHaveBeenCalledWith({
        team: mockRequest().body.team,
        visible: mockRequest().body.visible,
        userId: 'any_user_id'
      })
    })
    test('Deve retornar 500 se AddTeam lançar uma exceção', async () => {
      const { sut, addTeamStub } = makeSut()
      jest.spyOn(addTeamStub, 'add').mockImplementationOnce(throwError)
      const httpResponse = await sut.execute(mockRequest())
      expect(httpResponse).toEqual(serverError(new Error()))
    })
  })
  test('Retorne status 204 se o dado provido for válido', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.execute(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
