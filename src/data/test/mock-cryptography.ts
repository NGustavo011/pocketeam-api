import { type DecrypterPayload } from '../../domain/usecases-contracts/account/validate-token'
import { type DecrypterRepository } from '../repositories-contracts/cryptography/decrypter-repository'
import { type EncrypterRepository } from '../repositories-contracts/cryptography/encrypter-repository'
import { type HashComparerRepository } from '../repositories-contracts/cryptography/hash-comparer-repository'
import { type HasherRepository } from '../repositories-contracts/cryptography/hasher-repository'

export const mockHasherRepository = (): HasherRepository => {
  class HasherRepositoryStub implements HasherRepository {
    async hash (value: string): Promise<string> {
      return await Promise.resolve('hashed_value')
    }
  }
  return new HasherRepositoryStub()
}

export const mockHashComparerRepository = (): HashComparerRepository => {
  class HashComparerRepositoryStub implements HashComparerRepository {
    async compare (value: string, hash: string): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new HashComparerRepositoryStub()
}

export const mockEncrypterRepository = (): EncrypterRepository => {
  class EncrypterRepositoryStub implements EncrypterRepository {
    async encrypt (value: string): Promise<string> {
      return await Promise.resolve('any_token')
    }
  }
  return new EncrypterRepositoryStub()
}

export const mockToken = (): string => {
  return 'valid_token'
}

export const mockDecrypterRepository = (): DecrypterRepository => {
  class DecrypterRepositoryStub implements DecrypterRepository {
    async validateToken (token: string): Promise<DecrypterPayload | null> {
      return await Promise.resolve({ userId: 'any_user_id' })
    }
  }
  return new DecrypterRepositoryStub()
}
