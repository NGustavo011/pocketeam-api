import { prisma } from '../../../main/config/prisma'

export const clearDatabase = async (): Promise<void> => {
  await prisma.pokemon.deleteMany({})
  await prisma.team.deleteMany({})
  await prisma.account.deleteMany({})
}
