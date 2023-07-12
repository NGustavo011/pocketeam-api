import { type AuthenticationModel } from '../../../../domain/models/authentication'
import { type AuthenticationParams, type AuthenticationContract } from '../../../../domain/usecases-contracts/account/authentication'
import { type LoadAccountByEmailRepository } from '../../../repositories-contracts/account/load-account-by-email-repository'
import { type Encrypter } from '../../../repositories-contracts/cryptography/encrypter'
import { type HashComparer } from '../../../repositories-contracts/cryptography/hash-comparer'

export class Authentication implements AuthenticationContract {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter
  ) {
  }

  async auth (authenticationParams: AuthenticationParams): Promise<AuthenticationModel | null> {
    const { email, password } = authenticationParams
    const accountFounded = await this.loadAccountByEmailRepository.load(email)
    if (!accountFounded) return null
    const passwordIsValid = await this.hashComparer.compare(password, accountFounded.password)
    if (!passwordIsValid) return null
    await this.encrypter.encrypt(accountFounded.id)
    return await Promise.resolve(null)
  }
}
