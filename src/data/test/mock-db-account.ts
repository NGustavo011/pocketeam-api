import { type AddAccountParams } from '../../domain/usecases-contracts/account/add-account'

export const mockAddAccountParams = (): AddAccountParams => ({
  name: 'any_name',
  email: 'any_email',
  password: 'any_password'
})
