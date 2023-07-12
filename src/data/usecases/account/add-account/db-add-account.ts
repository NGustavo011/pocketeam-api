import { type AccountModel } from '../../../../domain/models/account'
import { type AddAccount, type AddAccountParams } from '../../../../domain/usecases-contracts/account/add-account'
import { type Hasher } from '../../../repositories-contracts/cryptography/hasher'

export class DbAddAccount implements AddAccount {
  constructor (private readonly hasher: Hasher) {
  }

  async add (account: AddAccountParams): Promise<AccountModel> {
    await this.hasher.hash(account.password)
    return await Promise.resolve({
      id: '',
      name: '',
      email: '',
      password: ''
    })
  }
}
