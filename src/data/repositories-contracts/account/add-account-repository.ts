import { type AccountModel } from '../../../domain/models/account'
import { type AddAccountParams } from '../../../domain/usecases-contracts/account/add-account'

export interface AddAccountRepository {
  add: (addAccountParams: AddAccountParams) => Promise<AccountModel>
}
