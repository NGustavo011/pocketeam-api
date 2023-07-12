import { type Hasher } from '../../../repositories-contracts/cryptography/hasher'
import { mockAddAccountParams } from '../../../test/mock-db-account'
import { DbAddAccount } from './db-add-account'

describe('DbAddAccount usecase', () => {
  test('Deve chamar o Hasher com a senha correta', async () => {
    class HasherStub implements Hasher {
      async hash (value: string): Promise<string> {
        return await Promise.resolve('hashed_value')
      }
    }
    const hasherStub = new HasherStub()
    const sut = new DbAddAccount(hasherStub)
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(mockAddAccountParams())
    expect(hashSpy).toHaveBeenCalledWith(mockAddAccountParams().password)
  })
})
