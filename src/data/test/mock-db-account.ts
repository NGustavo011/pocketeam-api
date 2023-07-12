import { type AccountModel } from '../../domain/models/account'
import { type AddAccountParams } from '../../domain/usecases-contracts/account/add-account'
import { type AddAccountRepository } from '../repositories-contracts/account/add-account-repository'

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
