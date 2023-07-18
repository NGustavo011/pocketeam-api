import { throwError } from '../../../../domain/test/test-helpers'
import { type AddAccountRepository } from '../../../repositories-contracts/account/add-account-repository'
import { type LoadAccountByEmailRepository } from '../../../repositories-contracts/account/load-account-by-email-repository'
import { type HasherRepository } from '../../../repositories-contracts/cryptography/hasher-repository'
import { mockHasherRepository } from '../../../test/mock-cryptography'
import { mockAccountModel, mockAddAccountParams, mockAddAccountRepository, mockLoadAccountByEmailRepository } from '../../../test/mock-db-account'
import { AddAccount } from './add-account'

interface SutTypes {
  hasherRepositoryStub: HasherRepository
  addAccountRepositoryStub: AddAccountRepository
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  sut: AddAccount
}

const makeSut = (): SutTypes => {
  const hasherRepositoryStub = mockHasherRepository()
  const addAccountRepositoryStub = mockAddAccountRepository()
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValue(new Promise(resolve => { resolve(null) }))
  const sut = new AddAccount(hasherRepositoryStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub)
  return {
    hasherRepositoryStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub,
    sut
  }
}

describe('AddAccount usecase', () => {
  describe('HasherRepository dependency', () => {
    test('Deve chamar o HasherRepository com a senha correta', async () => {
      const { sut, hasherRepositoryStub } = makeSut()
      const hashSpy = jest.spyOn(hasherRepositoryStub, 'hash')
      await sut.add(mockAddAccountParams())
      expect(hashSpy).toHaveBeenCalledWith(mockAddAccountParams().password)
    })
    test('Deve propagar o erro caso o HasherRepository lance um erro', async () => {
      const { sut, hasherRepositoryStub } = makeSut()
      jest.spyOn(hasherRepositoryStub, 'hash').mockImplementationOnce(throwError)
      const promise = sut.add(mockAddAccountParams())
      await expect(promise).rejects.toThrow()
    })
  })
  describe('AddAccountRepository dependency', () => {
    test('Deve chamar o AddAccountRepository com o valor correto', async () => {
      const { sut, addAccountRepositoryStub } = makeSut()
      const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
      await sut.add(mockAddAccountParams())
      expect(addSpy).toHaveBeenCalledWith(Object.assign({}, mockAddAccountParams(), { password: 'hashed_value' }))
    })
    test('Deve propagar o erro caso o AddAccountRepository lance um erro', async () => {
      const { sut, addAccountRepositoryStub } = makeSut()
      jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(throwError)
      const promise = sut.add(mockAddAccountParams())
      await expect(promise).rejects.toThrow()
    })
  })
  describe('LoadAccountByEmailRepository dependency', () => {
    test('Deve chamar o LoadAccountByEmailRepository com o valor correto', async () => {
      const { sut, loadAccountByEmailRepositoryStub } = makeSut()
      const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      await sut.add(mockAddAccountParams())
      expect(loadSpy).toHaveBeenCalledWith(mockAddAccountParams().email)
    })
    test('Deve propagar o erro caso o LoadAccountByEmailRepository lance um erro', async () => {
      const { sut, loadAccountByEmailRepositoryStub } = makeSut()
      jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(throwError)
      const promise = sut.add(mockAddAccountParams())
      await expect(promise).rejects.toThrow()
    })
    test('Deve retornar null caso LoadAccountByEmailRepository não retorne null', async () => {
      const { sut, loadAccountByEmailRepositoryStub } = makeSut()
      jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(mockAccountModel()))
      const account = await sut.add(mockAddAccountParams())
      expect(account).toBeNull()
    })
  })
  test('Deve retornar uma AccountModel com sucesso', async () => {
    const { sut } = makeSut()
    const account = await sut.add(mockAddAccountParams())
    expect(account).toEqual(mockAccountModel())
  })
})
