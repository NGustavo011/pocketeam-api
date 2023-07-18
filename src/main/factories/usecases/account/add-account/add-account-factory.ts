import { AddAccount } from '../../../../../data/usecases/account/add-account/add-account'
import { BcryptAdapter } from '../../../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { AccountPrismaRepository } from '../../../../../infra/db/prisma/account/account-prisma-repository'

export const makeAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountPrismaRepository = new AccountPrismaRepository()
  return new AddAccount(bcryptAdapter, accountPrismaRepository, accountPrismaRepository)
}
