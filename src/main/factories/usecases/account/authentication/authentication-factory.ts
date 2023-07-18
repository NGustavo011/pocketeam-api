
import { Authentication } from '../../../../../data/usecases/account/authentication/authentication'
import { JwtAdapter } from '../../../../../infra/cryptography/jwt-adapter/jwt-adapter'
import { AccountPrismaRepository } from '../../../../../infra/db/prisma/account/account-prisma-repository'
import { BcryptAdapter } from '../../../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import env from '../../../../config/env'

export const makeAuthentication = (): Authentication => {
  const salt = 12
  const accountPrismaRepository = new AccountPrismaRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  return new Authentication(accountPrismaRepository, bcryptAdapter, jwtAdapter)
}
