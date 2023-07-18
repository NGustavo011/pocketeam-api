import request from 'supertest'
import { app } from '../../config/app'

describe('Pokemon Routes', () => {
  describe('GET /all-pokemon', () => {
    test('Deve retornar status code 200 em caso de sucesso na busca de todos os pokemon', async () => {
      await request(app).get('/api/all-pokemon').expect(200)
    })
  })
  describe('GET /pokemon/:pokemonName', () => {
    test('Deve retornar status code 200 em caso de sucesso na busca de informações de um pokemon', async () => {
      await request(app).get('/api/pokemon/ditto').expect(200)
    })
    test('Deve retornar status code 400 em caso de sucesso na busca de informações de um pokemon inválido', async () => {
      await request(app).get('/api/pokemon/chikorita').expect(400)
    })
  })
})
