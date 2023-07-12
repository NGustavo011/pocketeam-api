import { throwError } from '../../../../domain/test/test-helpers'
import { type AddAccountRepository } from '../../../repositories-contracts/account/add-account-repository'
import { type Hasher } from '../../../repositories-contracts/cryptography/hasher'
import { mockHasher } from '../../../test/mock-cryptography'
import { mockAddAccountParams, mockAddAccountRepository } from '../../../test/mock-db-account'
import { AddAccount } from './add-account'

interface SutTypes {
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
  sut: AddAccount
}

const makeSut = (): SutTypes => {
  const hasherStub = mockHasher()
  const addAccountRepositoryStub = mockAddAccountRepository()
  const sut = new AddAccount(hasherStub, addAccountRepositoryStub)
  return {
    hasherStub,
    addAccountRepositoryStub,
    sut
  }
}

describe('AddAccount usecase', () => {
  test('Deve chamar o Hasher com a senha correta', async () => {
    const { sut, hasherStub } = makeSut()
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(mockAddAccountParams())
    expect(hashSpy).toHaveBeenCalledWith(mockAddAccountParams().password)
  })
  test('Deve propagar o erro caso o Hasher lance um erro', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })
  test('Deve chamar o AddAccountRepository com a senha correta', async () => {
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
