import { type AccountModel } from '../../domain/models/account'
import { type AddAccountParams } from '../../domain/usecases-contracts/account/add-account'
import { type AuthenticationParams } from '../../domain/usecases-contracts/account/authentication'
import { type AddAccountRepository } from '../repositories-contracts/account/add-account-repository'
import { type LoadAccountByEmailRepository } from '../repositories-contracts/account/load-account-by-email-repository'

export const mockAuthentication = (): AuthenticationParams => ({
  email: 'any_mail@mail.com',
  password: 'any_password'
})

export const mockAddAccountParams = (): AddAccountParams => ({
  name: 'any_name',
  email: 'any_email',
  password: 'any_password'
})

export const mockAccountModel = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email',
  password: 'any_password'
})

export const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (addAccountParams: AddAccountParams): Promise<AccountModel> {
      return await new Promise((resolve) => {
        resolve(mockAccountModel())
      })
    }
  }
  return new AddAccountRepositoryStub()
}

export const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel> {
      return await new Promise((resolve) => {
        resolve(mockAccountModel())
      })
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}
