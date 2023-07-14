import { throwError } from '../../../../domain/test/test-helpers'
import { type AddAccountContract } from '../../../../domain/usecases-contracts/account/add-account'
import { type HttpRequest } from '../../../contracts/http'
import { ServerError } from '../../../errors'
import { serverError } from '../../../helpers/http/http-helper'
import { mockAddAccount } from '../../../test/mock-account'
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
}

const makeSut = (): SutTypes => {
  const addAccountStub = mockAddAccount()
  const sut = new SignUpController(addAccountStub)
  return {
    sut, addAccountStub
  }
}

describe('SignUp Controller', () => {
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
})
