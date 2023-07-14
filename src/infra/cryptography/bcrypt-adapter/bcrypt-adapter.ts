import bcrypt from 'bcrypt'
import { type HasherRepository } from '../../../data/repositories-contracts/cryptography/hasher-repository'

export class BcryptAdapter implements HasherRepository {
  constructor (private readonly salt: number) {}
  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }
}
