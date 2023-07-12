import { throwError } from '../../../../domain/test/test-helpers'
import { type LoadAccountByEmailRepository } from '../../../repositories-contracts/account/load-account-by-email-repository'
import { type Encrypter } from '../../../repositories-contracts/cryptography/encrypter'
import { type HashComparer } from '../../../repositories-contracts/cryptography/hash-comparer'
import { mockEncrypter, mockHashComparer } from '../../../test/mock-cryptography'
import { mockAccountModel, mockAuthentication, mockLoadAccountByEmailRepository } from '../../../test/mock-db-account'
import { Authentication } from './authentication'

interface SutTypes {
  encrypterStub: Encrypter
  hashComparerStub: HashComparer
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  sut: Authentication
}

const makeSut = (): SutTypes => {
  const encrypterStub = mockEncrypter()
  const hashComparerStub = mockHashComparer()
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  const sut = new Authentication(loadAccountByEmailRepositoryStub, hashComparerStub, encrypterStub)
  return {
    encrypterStub,
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
    expect(compareSpy).toHaveBeenCalledWith(mockAuthentication().password, mockAccountModel().password)
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
  test('Deve chamar Encrypter com um id correto', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth(mockAuthentication())
    expect(encryptSpy).toHaveBeenCalledWith(mockAccountModel().id)
  })
  test('Deve repassar a exceção se o Encrypter lançar um erro', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow()
  })
})
