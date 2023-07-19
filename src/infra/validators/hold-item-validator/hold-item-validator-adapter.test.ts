import { AxiosAdapter } from '../../http-client/adapters/axios/axios-adapter'
import { HoldItemValidatorAdapter } from './hold-item-validator-adapter'

const axiosAdapter = new AxiosAdapter()

const makeSut = (): HoldItemValidatorAdapter => {
  jest.spyOn(axiosAdapter, 'get').mockReturnValue(Promise.resolve({
    items: [
      { name: 'cheri-berry' },
      { name: 'chesto-berry' }
    ]
  }))
  return new HoldItemValidatorAdapter(axiosAdapter)
}

describe('HoldItemValidator Adapter', () => {
  test('Deve retornar false se for enviado um hold-item inválido', async () => {
    const sut = makeSut()
    const isValid = await sut.isValid('invalid_hold_item')
    expect(isValid).toBeFalsy()
  })
  test('Deve retornar false se o validador retornar um erro', async () => {
    const sut = makeSut()
    jest.spyOn(axiosAdapter, 'get').mockReturnValueOnce(Promise.reject(new Error()))
    const isValid = await sut.isValid('invalid_hold_item')
    expect(isValid).toBeFalsy()
  })
  test('Deve retornar true se o validador retornar true', async () => {
    const sut = makeSut()
    const isValid = await sut.isValid('cheri-berry')
    expect(isValid).toBeTruthy()
  })
  test('O validador deve ser chamado com o valor correto', async () => {
    const sut = makeSut()
    const getSpy = jest.spyOn(axiosAdapter, 'get')
    const pokemonName = 'ditto'
    await sut.isValid(pokemonName)
    expect(getSpy).toHaveBeenCalledWith('https://pokeapi.co/api/v2/item-attribute/holdable-active/')
  })
})
