import request from 'supertest'
import { app } from '../../config/app'

describe('Pokemon Routes', () => {
  describe('GET /all-pokemon', () => {
    test('Deve retornar status code 200 em caso de sucesso na busca de todos os pokemon', async () => {
      await request(app).get('/api/all-pokemon').expect(200)
    })
  })
})
