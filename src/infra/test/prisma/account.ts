import { mockAccountModel } from '../../../data/test/mock-db-account'
import { prisma } from '../../../main/config/prisma'

export const mockPrismaAccountToTeam = async (): Promise<void> => {
  const accountModel = mockAccountModel()
  await prisma.account.create({
    data: {
      id: 'user_id',
      name: accountModel.name,
      email: accountModel.email,
      password: accountModel.password
    }
  })
}
