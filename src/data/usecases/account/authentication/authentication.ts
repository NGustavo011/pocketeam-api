import { type AuthenticationModel } from '../../../../domain/models/authentication'
import { type AuthenticationParams, type AuthenticationContract } from '../../../../domain/usecases-contracts/account/authentication'
import { type LoadAccountByEmailRepository } from '../../../repositories-contracts/account/load-account-by-email-repository'
import { type EncrypterRepository } from '../../../repositories-contracts/cryptography/encrypter-repository'
import { type HashComparerRepository } from '../../../repositories-contracts/cryptography/hash-comparer-repository'

export class Authentication implements AuthenticationContract {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparerRepository: HashComparerRepository,
    private readonly encrypterRepository: EncrypterRepository
  ) {
  }

  async auth (authenticationParams: AuthenticationParams): Promise<AuthenticationModel | null> {
    const { email, password } = authenticationParams
    const accountFounded = await this.loadAccountByEmailRepository.load(email)
    if (!accountFounded) return null
    const passwordIsValid = await this.hashComparerRepository.compare(password, accountFounded.password)
    if (!passwordIsValid) return null
    const token = await this.encrypterRepository.encrypt(accountFounded.id)
    return {
      token,
      name: accountFounded.name
    }
  }
}
