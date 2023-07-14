import { throwError } from '../../../../domain/test/test-helpers'
import { type AddAccountContract } from '../../../../domain/usecases-contracts/account/add-account'
import { type AuthenticationContract } from '../../../../domain/usecases-contracts/account/authentication'
import { mockValidation } from '../../../../validation/test/mock-validation'
import { type HttpRequest } from '../../../contracts/http'
import { type Validation } from '../../../contracts/validation'
import { EmailInUseError, MissingParamError, ServerError } from '../../../errors'
import { badRequest, forbidden, serverError } from '../../../helpers/http/http-helper'
import { mockAddAccount, mockAuthentication } from '../../../test/mock-account'
import { SignUpController } from './signup-controller'

const mockRequest = (): HttpRequest => {
  return {
    body: {
      name: 'any_name',
      email: 'any_mail@mail.com',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
  }
}

interface SutTypes {
  sut: SignUpController
  addAccountStub: AddAccountContract
  validationStub: Validation
  authenticationStub: AuthenticationContract
}

const makeSut = (): SutTypes => {
  const addAccountStub = mockAddAccount()
  const validationStub = mockValidation()
  const authenticationStub = mockAuthentication()
  const sut = new SignUpController(addAccountStub, validationStub, authenticationStub)
  return {
    sut, addAccountStub, validationStub, authenticationStub
  }
}

describe('SignUp Controller', () => {
  describe('AddAccount dependency', () => {
    test('Deve chamar AddAccount utilizando os valores corretos', async () => {
      const { sut, addAccountStub } = makeSut()
      const addSpy = jest.spyOn(addAccountStub, 'add')
      await sut.execute(mockRequest())
      expect(addSpy).toHaveBeenCalledWith({
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password'
      })
    })
    test('Retorne status de erro 500 se o handle lançar um erro', async () => {
      const { sut, addAccountStub } = makeSut()
      jest.spyOn(addAccountStub, 'add').mockImplementationOnce(throwError)
      const httpResponse = await sut.execute(mockRequest())
      expect(httpResponse).toEqual(serverError(new ServerError()))
    })
    test('Retorne status 403 se o AddAccount retornar null', async () => {
      const { sut, addAccountStub } = makeSut()
      jest.spyOn(addAccountStub, 'add').mockReturnValueOnce(new Promise(resolve => { resolve(null) }))
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
    })
  })
  describe('Validation dependency', () => {
    test('Deve chamar o Validation com valores corretos', async () => {
      const { sut, validationStub } = makeSut()
      const validateSpy = jest.spyOn(validationStub, 'validate')
      const httpRequest = mockRequest()
      await sut.handle(httpRequest)
      expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
    })
    test('Retorne status 400 se o Validation retornar um erro', async () => {
      const { sut, validationStub } = makeSut()
      jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
    })
  })
  describe('Authentication dependency', () => {
    test('Deve chamar a autenticação com valores corretos', async () => {
      const { sut, authenticationStub } = makeSut()
      const authSpy = jest.spyOn(authenticationStub, 'auth')
      await sut.handle(mockRequest())
      expect(authSpy).toHaveBeenCalledWith({
        email: 'any_mail@mail.com',
        password: 'any_password'
      })
    })
  })
})
