import env from '../../../main/config/env'
import { AxiosAdapter } from '../../http-client/adapters/axios/axios-adapter'
import { AbilityValidatorAdapter } from './ability-validator-adapter'

const axiosAdapter = new AxiosAdapter()

const makeSut = (): AbilityValidatorAdapter => {
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
        name: 'transform'
      }
    ],
    id: 132
  }))
  return new AbilityValidatorAdapter(axiosAdapter)
}

describe('AbilityValidator Adapter', () => {
  test('Deve retornar false se o validador se for enviado uma habilidade inválida', async () => {
    const sut = makeSut()
    const isValid = await sut.isValid('ditto', 'invalid_ability')
    expect(isValid).toBeFalsy()
  })
  test('Deve retornar false se o validador retornar um erro', async () => {
    const sut = makeSut()
    jest.spyOn(axiosAdapter, 'get').mockReturnValueOnce(Promise.reject(new Error()))
    const isValid = await sut.isValid('ditto', 'limber')
    expect(isValid).toBeFalsy()
  })
  test('Deve retornar true se o validador retornar true', async () => {
    const sut = makeSut()
    const isValid = await sut.isValid('ditto', 'limber')
    expect(isValid).toBeTruthy()
  })
  test('O validador deve ser chamado com o valor correto', async () => {
    const sut = makeSut()
    const getSpy = jest.spyOn(axiosAdapter, 'get')
    const pokemonName = 'ditto'
    await sut.isValid(pokemonName, 'limber')
    expect(getSpy).toHaveBeenCalledWith(`${env.pokeApiUrl}pokemon/${pokemonName}`)
  })
})
