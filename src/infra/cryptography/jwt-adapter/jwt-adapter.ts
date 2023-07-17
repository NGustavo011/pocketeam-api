import jwt from 'jsonwebtoken'
import { type EncrypterRepository } from '../../../data/repositories-contracts/cryptography/encrypter-repository'
import { type DecrypterRepository } from '../../../data/repositories-contracts/cryptography/decrypter-repository'

export class JwtAdapter implements EncrypterRepository, DecrypterRepository {
  constructor (private readonly secret: string) {}
  async encrypt (id: string): Promise<string> {
    const accessToken = jwt.sign({ id }, this.secret)
    return await new Promise(resolve => { resolve(accessToken) })
  }

  async validateToken (token: string): Promise<boolean> {
    try {
      jwt.verify(token, this.secret)
      return true
    } catch (error) {
      return false
    }
  }
}
