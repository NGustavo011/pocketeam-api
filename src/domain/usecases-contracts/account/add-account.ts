import { type AccountModel } from '../../models/account'

export interface AddAccountParams {
  name: string
  email: string
  password: string
}

export interface AddAccountContract {
  add: (account: AddAccountParams) => Promise<AccountModel | null>
}
