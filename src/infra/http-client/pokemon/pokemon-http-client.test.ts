import { AxiosAdapter } from '../adapters/axios/axios-adapter'
import { PokemonHttpClient } from './pokemon-http-client'

const makeSut = (): PokemonHttpClient => {
  return new PokemonHttpClient(new AxiosAdapter())
}

describe('PokemonHttpClient', () => {
  describe('getAll()', () => {
    test('Deve retornar os pokemon corretamente em caso de sucesso', async () => {
      const sut = makeSut()
      const allPokemon = await sut.getAll()
      expect(allPokemon).toBeTruthy()
      expect(allPokemon.length).toBe(151)
      expect(allPokemon[0].name).toBe('bulbasaur')
    })
  })
})
