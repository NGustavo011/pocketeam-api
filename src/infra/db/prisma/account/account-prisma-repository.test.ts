import { mockAddAccountParams } from '../../../../data/test/mock-db-account'
import { prisma } from '../../../../main/config/prisma'
import { AccountPrismaRepository } from './account-prisma-repository'

const makeSut = (): AccountPrismaRepository => {
  return new AccountPrismaRepository()
}

describe('AccountPrismaRepository', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })
  afterAll(async () => {
    await prisma.$disconnect()
  })
  beforeEach(async () => {
    await prisma.account.deleteMany({})
  })
  describe('add()', () => {
    test('Deve retornar uma conta em caso de sucesso no método de add', async () => {
      const sut = makeSut()
      const account = await sut.add(mockAddAccountParams())
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email')
      expect(account.password).toBe('any_password')
    })
  })
})
