import { type AuthenticationModel } from '../../../../domain/models/authentication'
import { type AuthenticationParams, type AuthenticationContract } from '../../../../domain/usecases-contracts/account/authentication'
import { type LoadAccountByEmailRepository } from '../../../repositories-contracts/account/load-account-by-email-repository'

export class Authentication implements AuthenticationContract {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {
  }

  async auth (authenticationParams: AuthenticationParams): Promise<AuthenticationModel | null> {
    const { email } = authenticationParams
    const accountFounded = await this.loadAccountByEmailRepository.load(email)
    if (!accountFounded) return null
    return await Promise.resolve(null)
  }
}
