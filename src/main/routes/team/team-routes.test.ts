import request from 'supertest'
import { app } from '../../config/app'
import { prisma } from '../../config/prisma'
import { clearDatabase } from '../../../infra/test/prisma/clear-database'
import env from '../../config/env'
import { sign } from 'jsonwebtoken'

const mockToken = async (): Promise<string> => {
  const account = await prisma.account.create({
    data: {
      name: 'test',
      email: 'test@gmail.com',
      password: 'test'
    }
  })
  return sign({ id: account.id }, env.jwtSecret)
}

describe('Pokemon Routes', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })
  afterAll(async () => {
    await prisma.$disconnect()
  })
  beforeEach(async () => {
    await clearDatabase()
  })
  describe('POST /team', () => {
    test('Deve retornar status code 204 em caso de sucesso na criação de um time', async () => {
      const token = await mockToken()
      await request(app).post('/api/team').set('authorization', token).send({
        team: [
          {
            pokemon: {
              name: 'pokemon-1',
              ability: 'ability-1',
              holdItem: 'hold-item-1',
              moves: [
                {
                  name: 'move-1'
                },
                {
                  name: 'move-2'
                }
              ]
            }
          }
        ],
        visible: true
      }).expect(204)
    })
  })
})
