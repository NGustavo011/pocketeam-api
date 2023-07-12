import { type AccountModel } from '../../../../domain/models/account'
import { type AddAccountContract, type AddAccountParams } from '../../../../domain/usecases-contracts/account/add-account'
import { type AddAccountRepository } from '../../../repositories-contracts/account/add-account-repository'
import { type LoadAccountByEmailRepository } from '../../../repositories-contracts/account/load-account-by-email-repository'
import { type Hasher } from '../../../repositories-contracts/cryptography/hasher'

export class AddAccount implements AddAccountContract {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {
  }

  async add (account: AddAccountParams): Promise<AccountModel | null> {
    const { email, name, password } = account
    await this.loadAccountByEmailRepository.load(email)
    const hashedPassword = await this.hasher.hash(password)
    await this.addAccountRepository.add({
      email,
      name,
      password: hashedPassword
    })
    return await Promise.resolve({
      id: '',
      name: '',
      email: '',
      password: ''
    })
  }
}
