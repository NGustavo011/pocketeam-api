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
  describe('get()', () => {
    test('Deve retornar dados de um pokemon corretamente em caso de sucesso', async () => {
      const sut = makeSut()
      const pokemon = await sut.get('charmander')
      expect(pokemon).toBeTruthy()
      expect(pokemon?.name).toBe('charmander')
      expect(pokemon?.abilities).toBeTruthy()
      expect(pokemon?.moves).toBeTruthy()
    })
    test('Deve retornar null em caso de não encontrar o pokémon especificado', async () => {
      const sut = makeSut()
      const pokemon = await sut.get('agumon')
      expect(pokemon).toBeNull()
    })
  })
})
