import { throwError } from '../../../../domain/test/test-helpers'
import { type ValidateTokenContract } from '../../../../domain/usecases-contracts/account/validate-token'
import { type DeleteTeamContract } from '../../../../domain/usecases-contracts/team/delete-team'
import { mockValidation } from '../../../../validation/test/mock-validation'
import { type HttpRequest } from '../../../contracts/http'
import { type Validation } from '../../../contracts/validation'
import { MissingParamError } from '../../../errors'
import { badRequest, serverError, unauthorized } from '../../../helpers/http/http-helper'
import { mockValidateToken } from '../../../test/mock-account'
import { mockDeleteTeam } from '../../../test/mock-team'
import { DeleteTeamController } from './delete-team-controller'

const mockRequest = (): HttpRequest => {
  return {
    headers: {
      Authorization: 'any_token'
    },
    params: {
      teamId: 'team_id_1'
    }
  }
}

interface SutTypes {
  validationStub: Validation
  validateTokenStub: ValidateTokenContract
  deleteTeamStub: DeleteTeamContract
  sut: DeleteTeamController
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const validateTokenStub = mockValidateToken()
  const deleteTeamStub = mockDeleteTeam()
  const sut = new DeleteTeamController(validationStub, validateTokenStub, deleteTeamStub)
  return {
    validationStub,
    validateTokenStub,
    deleteTeamStub,
    sut
  }
}

describe('DeleteTeam Controller', () => {
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
  describe('DeleteTeam dependency', () => {
    test('Deve chamar DeleteTeam com valores corretos', async () => {
      const { sut, deleteTeamStub } = makeSut()
      const getSpy = jest.spyOn(deleteTeamStub, 'delete')
      await sut.execute(mockRequest())
      expect(getSpy).toHaveBeenCalledWith({
        teamId: mockRequest().params.teamId,
        userId: 'any_user_id'
      })
    })
    test('Deve retornar 500 se DeleteTeam lançar uma exceção', async () => {
      const { sut, deleteTeamStub } = makeSut()
      jest.spyOn(deleteTeamStub, 'delete').mockImplementationOnce(throwError)
      const httpResponse = await sut.execute(mockRequest())
      expect(httpResponse).toEqual(serverError(new Error()))
    })
  })
})
