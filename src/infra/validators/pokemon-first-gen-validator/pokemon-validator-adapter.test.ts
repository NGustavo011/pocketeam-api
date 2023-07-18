import { AxiosAdapter } from '../../http-client/adapters/axios/axios-adapter'
import { PokemonFirstGenValidatorAdapter } from './pokemon-validator-adapter'

const axiosAdapter = new AxiosAdapter()

const makeSut = (): PokemonFirstGenValidatorAdapter => {
  jest.spyOn(axiosAdapter, 'get').mockReturnValue(Promise.resolve({
    forms: [
      {
        name: 'ditto'
      }
    ],
    abilities: [
      {
        name: 'limber'
      },
      {
        name: 'imposter'
      }
    ],
    moves: [
      {
        name: 'transform'
      }
    ],
    id: 132
  }))
  return new PokemonFirstGenValidatorAdapter(axiosAdapter)
}

describe('PokemonFirstGenValidator Adapter', () => {
  test('Deve retornar false se o validador retornar um pokémon inválido', async () => {
    const sut = makeSut()
    jest.spyOn(axiosAdapter, 'get').mockReturnValueOnce(Promise.resolve(
      {
        forms: [
          {
            name: 'invalid_pokemon'
          }
        ],
        abilities: [
          {
            name: 'invalid_ability'
          },
          {
            name: 'invalid_ability'
          }
        ],
        moves: [
          {
            name: 'invalid_move'
          }
        ],
        id: 180
      }
    ))
    const isValid = await sut.isValid('invalid_pokemon')
    expect(isValid).toBeFalsy()
  })
  test('Deve retornar false se o validador retornar um erro', async () => {
    const sut = makeSut()
    jest.spyOn(axiosAdapter, 'get').mockReturnValueOnce(Promise.reject(new Error()))
    const isValid = await sut.isValid('invalid_pokemon')
    expect(isValid).toBeFalsy()
  })
  test('Deve retornar true se o validador retornar true', async () => {
    const sut = makeSut()
    const isValid = await sut.isValid('ditto')
    expect(isValid).toBeTruthy()
  })
  test('O validador deve ser chamado com o valor correto', async () => {
    const sut = makeSut()
    const getSpy = jest.spyOn(axiosAdapter, 'get')
    const pokemonName = 'ditto'
    await sut.isValid(pokemonName)
    expect(getSpy).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/ditto')
  })
})
