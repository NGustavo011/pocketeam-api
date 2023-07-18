import request from 'supertest'
import { app } from '../../config/app'

describe('Account Routes', () => {
  describe('GET /hold-item', () => {
    test('Deve retornar status code 200 em caso de sucesso na busca de Hold Items', async () => {
      await request(app).get('/api/hold-item').expect(200)
    })
  })
})
