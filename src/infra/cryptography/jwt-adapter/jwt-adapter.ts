import jwt from 'jsonwebtoken'
import { type EncrypterRepository } from '../../../data/repositories-contracts/cryptography/encrypter-repository'

export class JwtAdapter implements EncrypterRepository {
  constructor (private readonly secret: string) {}
  async encrypt (id: string): Promise<string> {
    const accessToken = jwt.sign({ id }, this.secret)
    return await new Promise(resolve => { resolve(accessToken) })
  }
}
