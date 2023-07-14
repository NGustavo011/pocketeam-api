import bcrypt from 'bcrypt'
import { type HasherRepository } from '../../../data/repositories-contracts/cryptography/hasher-repository'
import { type HashComparerRepository } from '../../../data/repositories-contracts/cryptography/hash-comparer-repository'

export class BcryptAdapter implements HasherRepository, HashComparerRepository {
  constructor (private readonly salt: number) {}
  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }

  async compare (value: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash)
    return isValid
  }
}
