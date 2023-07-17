import { type ValidateTokenContract } from '../../../../domain/usecases-contracts/account/validate-token'
import { type DecrypterRepository } from '../../../repositories-contracts/cryptography/decrypter-repository'

export class ValidateToken implements ValidateTokenContract {
  constructor (
    private readonly decrypterRepository: DecrypterRepository
  ) {}

  async validateToken (token: string): Promise<boolean> {
    const isValidToken = await this.decrypterRepository.validateToken(token)
    return isValidToken
  }
}
