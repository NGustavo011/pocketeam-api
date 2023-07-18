import request from 'supertest'
import { prisma } from '../config/prisma'
import { clearDatabase } from '../../infra/test/prisma/clear-database'
import { app } from '../server'

describe('Account Routes', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })
  afterAll(async () => {
    await prisma.$disconnect()
  })
  beforeEach(async () => {
    await clearDatabase()
  })
  describe('POST /signup', () => {
    test('Deve retornar status code 200 em caso de sucesso no SignUp', async () => {
      await request(app).post('/api/signup').send({
        name: 'Gustavo',
        email: 'gustavo.nogueira@gmail.com',
        password: '123',
        passwordConfirmation: '123'
      }).expect(200)
    })
  })
})
