import { type AddAccountContract } from '../../../../domain/usecases-contracts/account/add-account'
import { type HttpRequest } from '../../../contracts/http'
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
    await sut.handle(mockRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_mail@mail.com',
      password: 'any_password'
    })
  })
})
