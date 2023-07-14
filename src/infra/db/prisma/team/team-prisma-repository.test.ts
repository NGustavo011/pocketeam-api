import { mockAccountModel } from '../../../../data/test/mock-db-account'
import { mockAddTeamParams } from '../../../../data/test/mock-team'
import { prisma } from '../../../../main/config/prisma'
import { clearDatabase } from '../../../test/prisma/clear-database'
import { TeamPrismaRepository } from './team-prisma-repository'

const makeSut = (): TeamPrismaRepository => {
  return new TeamPrismaRepository()
}

describe('TeamPrismaRepository', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })
  afterAll(async () => {
    await prisma.$disconnect()
  })
  beforeEach(async () => {
    await clearDatabase()
  })
  describe('add()', () => {
    test('Deve realizar com sucesso o método de add', async () => {
      const sut = makeSut()
      const accountModel = mockAccountModel()
      await prisma.account.create({
        data: {
          id: 'user_id',
          name: accountModel.name,
          email: accountModel.email,
          password: accountModel.password
        }
      })
      const teamCreated = await sut.add(mockAddTeamParams())
      expect(teamCreated).toBeTruthy()
      expect(teamCreated?.id).toBeTruthy()
      const team = await prisma.team.findFirst({ where: { id: teamCreated?.id } })
      expect(team).toBeTruthy()
    })
  })
})
