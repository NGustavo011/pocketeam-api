import { type AddAccountRepository } from '../../../../data/repositories-contracts/account/add-account-repository'
import { type LoadAccountByEmailRepository } from '../../../../data/repositories-contracts/account/load-account-by-email-repository'
import { type AccountModel } from '../../../../domain/models/account'
import { type AddAccountParams } from '../../../../domain/usecases-contracts/account/add-account'
import { prisma } from '../../../../main/config/prisma'

export class AccountPrismaRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  async add (addAccountParams: AddAccountParams): Promise<AccountModel> {
    const { email, name, password } = addAccountParams
    const accountResult = await prisma.account.create({
      data: {
        email,
        name,
        password
      }
    })
    return accountResult
  }

  async loadByEmail (email: string): Promise<AccountModel | null> {
    const account = await prisma.account.findFirst({
      where: { email }
    })
    return account
  }
}
