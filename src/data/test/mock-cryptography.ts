import { type Hasher } from '../repositories-contracts/cryptography/hasher'

export const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return await Promise.resolve('hashed_value')
    }
  }
  return new HasherStub()
}
