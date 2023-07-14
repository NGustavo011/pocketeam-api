
import { throwError } from '../../../../domain/test/test-helpers'
import { type AddAccountContract } from '../../../../domain/usecases-contracts/account/add-account'
import { type AuthenticationContract } from '../../../../domain/usecases-contracts/account/authentication'
import { mockValidation } from '../../../../validation/test/mock-validation'
import { type HttpRequest } from '../../../contracts/http'
import { type Validation } from '../../../contracts/validation'
import { EmailInUseError, MissingParamError, ServerError } from '../../../errors'
import { badRequest, forbidden, ok, serverError } from '../../../helpers/http/http-helper'
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
        name: mockRequest().body.name,
        email: mockRequest().body.email,
        password: mockRequest().body.password
      })
    })
    test('Retorne status de erro 500 se o execute lançar um erro', async () => {
      const { sut, addAccountStub } = makeSut()
      jest.spyOn(addAccountStub, 'add').mockImplementationOnce(throwError)
      const httpResponse = await sut.execute(mockRequest())
      expect(httpResponse).toEqual(serverError(new ServerError()))
    })
    test('Retorne status 403 se o AddAccount retornar null', async () => {
      const { sut, addAccountStub } = makeSut()
      jest.spyOn(addAccountStub, 'add').mockReturnValueOnce(new Promise(resolve => { resolve(null) }))
      const httpResponse = await sut.execute(mockRequest())
      expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
    })
  })
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
  describe('Authentication dependency', () => {
    test('Deve chamar a autenticação com valores corretos', async () => {
      const { sut, authenticationStub } = makeSut()
      const authSpy = jest.spyOn(authenticationStub, 'auth')
      await sut.execute(mockRequest())
      expect(authSpy).toHaveBeenCalledWith({
        email: mockRequest().body.email,
        password: mockRequest().body.password
      })
    })
    test('Deve retornar 500 se a autenticação lançar uma exceção', async () => {
      const { sut, authenticationStub } = makeSut()
      jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(() => {
        throw new Error()
      })
      const httpResponse = await sut.execute(mockRequest())
      expect(httpResponse).toEqual(serverError(new Error()))
    })
  })
  test('Retorne status 200 se o dado provido for válido', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.execute(mockRequest())
    expect(httpResponse).toEqual(ok({ token: 'any_token', name: mockRequest().body.name }))
  })
})
