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

const mockTeam = async (): Promise<{
  token: string
  teamId: string
}> => {
  const account = await prisma.account.create({
    data: {
      name: 'test',
      email: 'test@gmail.com',
      password: 'test'
    }
  })
  const teamCreated = await prisma.team.create({
    data: {
      userId: account.id,
      visible: true
    }
  })
  await prisma.pokemon.createMany({
    data: [
      {
        name: 'ditto',
        ability: 'limber',
        holdItem: 'chesto-berry',
        teamId: teamCreated.id,
        moves: ['transform']
      }
    ]
  })
  const token = sign({ id: account.id }, env.jwtSecret)
  return {
    token,
    teamId: teamCreated.id
  }
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
  describe('GET /team/:userId?/:id?', () => {
    test('Deve retornar status code 200 em caso de sucesso na listagem de times', async () => {
      const token = await mockToken()
      await request(app).get('/api/team').set('authorization', token).expect(200)
    })
  })
  describe('POST /team', () => {
    test('Deve retornar status code 204 em caso de sucesso na criação de um time', async () => {
      const token = await mockToken()
      await request(app).post('/api/team').set('authorization', token).send({
        team: [
          {
            pokemon: {
              name: 'ditto',
              ability: 'imposter',
              holdItem: 'cheri-berry',
              moves: [
                {
                  name: 'transform'
                }
              ]
            }
          }
        ],
        visible: true
      }).expect(204)
    })
  })
  describe('PUT /team/:teamId', () => {
    test('Deve retornar status code 204 em caso de sucesso na edição de um time', async () => {
      const { token, teamId } = await mockTeam()
      await request(app).put(`/api/team/${teamId}`).set('authorization', token).send({
        team: [
          {
            pokemon: {
              name: 'ditto',
              ability: 'imposter',
              holdItem: 'cheri-berry',
              moves: [
                {
                  name: 'transform'
                }
              ]
            }
          }
        ],
        visible: false
      }).expect(204)
    })
  })
  describe('DELETE /team/:teamId', () => {
    test('Deve retornar status code 204 em caso de sucesso na remoção de um time', async () => {
      const { token, teamId } = await mockTeam()
      await request(app).delete(`/api/team/${teamId}`).set('authorization', token).expect(204)
    })
  })
})
