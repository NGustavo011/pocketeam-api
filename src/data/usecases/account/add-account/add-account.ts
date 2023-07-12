import { type AccountModel } from '../../../../domain/models/account'
import { type AddAccountContract, type AddAccountParams } from '../../../../domain/usecases-contracts/account/add-account'
import { type AddAccountRepository } from '../../../repositories-contracts/account/add-account-repository'
import { type Hasher } from '../../../repositories-contracts/cryptography/hasher'

export class AddAccount implements AddAccountContract {
  constructor (private readonly hasher: Hasher, private readonly addAccountRepository: AddAccountRepository) {
  }

  async add (account: AddAccountParams): Promise<AccountModel> {
    const { email, name, password } = account
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
