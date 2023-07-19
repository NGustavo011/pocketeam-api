import { AxiosAdapter } from '../../http-client/adapters/axios/axios-adapter'
import { MoveValidatorAdapter } from './move-validator-adapter'

const axiosAdapter = new AxiosAdapter()

const makeSut = (): MoveValidatorAdapter => {
  jest.spyOn(axiosAdapter, 'get').mockReturnValue(Promise.resolve({
    forms: [
      {
        name: 'ditto'
      }
    ],
    abilities: [
      {
        ability: {
          name: 'limber'
        }
      },
      {
        ability: {
          name: 'imposter'
        }
      }
    ],
    moves: [
      {
        move: {
          name: 'transform'
        }
      }
    ],
    id: 132
  }))
  return new MoveValidatorAdapter(axiosAdapter)
}

describe('MoveValidator Adapter', () => {
  test('Deve retornar false se o validador se for enviado um move inválido', async () => {
    const sut = makeSut()
    const isValid = await sut.isValid('ditto', 'invalid_move')
    expect(isValid).toBeFalsy()
  })
  test('Deve retornar false se o validador retornar um erro', async () => {
    const sut = makeSut()
    jest.spyOn(axiosAdapter, 'get').mockReturnValueOnce(Promise.reject(new Error()))
    const isValid = await sut.isValid('ditto', 'transform')
    expect(isValid).toBeFalsy()
  })
  test('Deve retornar true se o validador retornar true', async () => {
    const sut = makeSut()
    const isValid = await sut.isValid('ditto', 'transform')
    expect(isValid).toBeTruthy()
  })
  test('O validador deve ser chamado com o valor correto', async () => {
    const sut = makeSut()
    const getSpy = jest.spyOn(axiosAdapter, 'get')
    const pokemonName = 'ditto'
    await sut.isValid(pokemonName, 'transform')
    expect(getSpy).toHaveBeenCalledWith(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
  })
})
