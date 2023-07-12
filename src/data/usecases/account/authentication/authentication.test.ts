import { throwError } from '../../../../domain/test/test-helpers'
import { type LoadAccountByEmailRepository } from '../../../repositories-contracts/account/load-account-by-email-repository'
import { mockAuthentication, mockLoadAccountByEmailRepository } from '../../../test/mock-db-account'
import { Authentication } from './authentication'

interface SutTypes {
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  sut: Authentication
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  const sut = new Authentication(loadAccountByEmailRepositoryStub)
  return {
    loadAccountByEmailRepositoryStub,
    sut
  }
}

describe('Authentication usecase', () => {
  test('Deve chamar o LoadAccountByEmailRepository com o valor correto', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth(mockAuthentication())
    expect(loadSpy).toHaveBeenCalledWith(mockAuthentication().email)
  })
  test('Deve propagar o erro caso o LoadAccountByEmailRepository lance um erro', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow()
  })
  test('Deve retornar null caso LoadAccountByEmailRepository retorne null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockReturnValueOnce(Promise.resolve(null))
    const account = await sut.auth(mockAuthentication())
    expect(account).toBeNull()
  })
})
