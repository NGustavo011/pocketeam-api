import { mockAccountModel } from '../../data/test/mock-db-account'
import { type AccountModel } from '../../domain/models/account'
import { type AuthenticationModel } from '../../domain/models/authentication'
import { type AddAccountContract, type AddAccountParams } from '../../domain/usecases-contracts/account/add-account'
import { type AuthenticationParams, type AuthenticationContract } from '../../domain/usecases-contracts/account/authentication'

export const mockAddAccount = (): AddAccountContract => {
  class AddAccountStub implements AddAccountContract {
    async add (account: AddAccountParams): Promise<AccountModel | null> {
      return await new Promise(resolve => { resolve(mockAccountModel()) })
    }
  }
  return new AddAccountStub()
}

export const mockAuthentication = (): AuthenticationContract => {
  class AuthenticationStub implements AuthenticationContract {
    async auth (authentication: AuthenticationParams): Promise<AuthenticationModel> {
      return await new Promise(resolve => { resolve({ token: 'any_token', name: 'any_name' }) })
    }
  }
  return new AuthenticationStub()
}