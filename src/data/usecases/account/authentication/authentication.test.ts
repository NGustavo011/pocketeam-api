import { throwError } from '../../../../domain/test/test-helpers'
import { type LoadAccountByEmailRepository } from '../../../repositories-contracts/account/load-account-by-email-repository'
import { type HashComparer } from '../../../repositories-contracts/cryptography/hash-comparer'
import { mockHashComparer } from '../../../test/mock-cryptography'
import { mockAuthentication, mockLoadAccountByEmailRepository } from '../../../test/mock-db-account'
import { Authentication } from './authentication'

interface SutTypes {
  hashComparerStub: HashComparer
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  sut: Authentication
}

const makeSut = (): SutTypes => {
  const hashComparerStub = mockHashComparer()
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  const sut = new Authentication(loadAccountByEmailRepositoryStub, hashComparerStub)
  return {
    hashComparerStub,
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
  test('Deve chamar HashComparer com valores corretos', async () => {
    const { sut, hashComparerStub } = makeSut()
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    await sut.auth(mockAuthentication())
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'any_password')
  })
  test('Deve repassar a exceção se o HashComparer lançar um erro', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow()
  })
  test('Deve retornar vázio se o HashComparer retornar falso', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(new Promise(resolve => { resolve(false) }))
    const model = await sut.auth(mockAuthentication())
    expect(model).toBeNull()
  })
})
