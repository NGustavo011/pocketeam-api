import { AxiosAdapter } from '../adapters/axios/axios-adapter'
import { HoldItemsHttpClient } from './hold-items-http-client'

const makeSut = (): HoldItemsHttpClient => {
  return new HoldItemsHttpClient(new AxiosAdapter())
}

describe('HoldItemsHttpClient', () => {
  describe('get()', () => {
    test('Deve retornar os hold-items corretamente em caso de sucesso', async () => {
      const sut = makeSut()
      const holdItems = await sut.get()
      expect(holdItems).toBeTruthy()
      expect(holdItems[0].name).toBeTruthy()
    })
  })
})
