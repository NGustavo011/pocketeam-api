import { type Hasher } from '../../../repositories-contracts/cryptography/hasher'
import { mockHasher } from '../../../test/mock-cryptography'
import { mockAddAccountParams } from '../../../test/mock-db-account'
import { DbAddAccount } from './db-add-account'

interface SutTypes {
  hasherStub: Hasher
  sut: DbAddAccount
}

const makeSut = (): SutTypes => {
  const hasherStub = mockHasher()
  const sut = new DbAddAccount(hasherStub)
  return {
    hasherStub,
    sut
  }
}

describe('DbAddAccount usecase', () => {
  test('Deve chamar o Hasher com a senha correta', async () => {
    const { sut, hasherStub } = makeSut()
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(mockAddAccountParams())
    expect(hashSpy).toHaveBeenCalledWith(mockAddAccountParams().password)
  })
})
