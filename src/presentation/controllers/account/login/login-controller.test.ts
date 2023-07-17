import { type AuthenticationContract } from '../../../../domain/usecases-contracts/account/authentication'
import { mockValidation } from '../../../../validation/test/mock-validation'
import { type HttpRequest } from '../../../contracts/http'
import { type Validation } from '../../../contracts/validation'
import { MissingParamError } from '../../../errors'
import { badRequest } from '../../../helpers/http/http-helper'
import { mockAuthentication } from '../../../test/mock-account'
import { LoginController } from './login-controller'

const mockRequest = (): HttpRequest => {
  return {
    body: {
      email: 'any_mail@mail.com',
      password: 'any_password'
    }
  }
}

interface SutTypes {
  sut: LoginController
  validationStub: Validation
  authenticationStub: AuthenticationContract
}

const makeSut = (): SutTypes => {
  const authenticationStub = mockAuthentication()
  const validationStub = mockValidation()
  const sut = new LoginController(validationStub, authenticationStub)
  return {
    sut,
    validationStub,
    authenticationStub
  }
}

describe('Login Controller', () => {
  describe('Validation dependency', () => {
    test('Deve chamar o Validation com valores corretos', async () => {
      const { sut, validationStub } = makeSut()
      const validateSpy = jest.spyOn(validationStub, 'validate')
      const httpRequest = mockRequest()
      await sut.execute(httpRequest)
      expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
    })
    test('Retorne status 400 se o Validation retornar um erro', async () => {
      const { sut, validationStub } = makeSut()
      jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
      const httpResponse = await sut.execute(mockRequest())
      expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
    })
  })
})
