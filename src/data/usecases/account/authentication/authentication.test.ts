import { type AuthenticationModel } from '../../../../domain/models/authentication'
import { throwError } from '../../../../domain/test/test-helpers'
import { type LoadAccountByEmailRepository } from '../../../repositories-contracts/account/load-account-by-email-repository'
import { type EncrypterRepository } from '../../../repositories-contracts/cryptography/encrypter-repository'
import { type HashComparerRepository } from '../../../repositories-contracts/cryptography/hash-comparer-repository'
import { mockEncrypterRepository, mockHashComparerRepository } from '../../../test/mock-cryptography'
import { mockAccountModel, mockAuthentication, mockLoadAccountByEmailRepository } from '../../../test/mock-db-account'
import { Authentication } from './authentication'

interface SutTypes {
  encrypterRepositoryStub: EncrypterRepository
  hashComparerRepositoryStub: HashComparerRepository
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  sut: Authentication
}

const makeSut = (): SutTypes => {
  const encrypterRepositoryStub = mockEncrypterRepository()
  const hashComparerRepositoryStub = mockHashComparerRepository()
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  const sut = new Authentication(loadAccountByEmailRepositoryStub, hashComparerRepositoryStub, encrypterRepositoryStub)
  return {
    encrypterRepositoryStub,
    hashComparerRepositoryStub,
    loadAccountByEmailRepositoryStub,
    sut
  }
}

describe('Authentication usecase', () => {
  describe('LoadAccountByEmailRepository dependency', () => {
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
  describe('HashComparerRepository dependency', () => {
    test('Deve chamar HashComparerRepository com valores corretos', async () => {
      const { sut, hashComparerRepositoryStub } = makeSut()
      const compareSpy = jest.spyOn(hashComparerRepositoryStub, 'compare')
      await sut.auth(mockAuthentication())
      expect(compareSpy).toHaveBeenCalledWith(mockAuthentication().password, mockAccountModel().password)
    })
    test('Deve repassar a exceção se o HashComparerRepository lançar um erro', async () => {
      const { sut, hashComparerRepositoryStub } = makeSut()
      jest.spyOn(hashComparerRepositoryStub, 'compare').mockImplementationOnce(throwError)
      const promise = sut.auth(mockAuthentication())
      await expect(promise).rejects.toThrow()
    })
    test('Deve retornar vázio se o HashComparerRepository retornar falso', async () => {
      const { sut, hashComparerRepositoryStub } = makeSut()
      jest.spyOn(hashComparerRepositoryStub, 'compare').mockReturnValueOnce(new Promise(resolve => { resolve(false) }))
      const model = await sut.auth(mockAuthentication())
      expect(model).toBeNull()
    })
  })
  describe('EncrypterRepository dependency', () => {
    test('Deve chamar EncrypterRepository com um id correto', async () => {
      const { sut, encrypterRepositoryStub } = makeSut()
      const encryptSpy = jest.spyOn(encrypterRepositoryStub, 'encrypt')
      await sut.auth(mockAuthentication())
      expect(encryptSpy).toHaveBeenCalledWith(mockAccountModel().id)
    })
    test('Deve repassar a exceção se o EncrypterRepository lançar um erro', async () => {
      const { sut, encrypterRepositoryStub } = makeSut()
      jest.spyOn(encrypterRepositoryStub, 'encrypt').mockImplementationOnce(throwError)
      const promise = sut.auth(mockAuthentication())
      await expect(promise).rejects.toThrow()
    })
  })
  test('Deve retornar uma AuthenticationModel com sucesso', async () => {
    const { sut } = makeSut()
    const { token, name } = await sut.auth(mockAuthentication()) as AuthenticationModel
    expect(token).toBe('any_token')
    expect(name).toBe('any_name')
  })
})
