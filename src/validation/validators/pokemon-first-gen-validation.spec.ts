
import { PokemonInvalidError } from '../../presentation/errors'
import { type PokemonFirstGenValidator } from '../contracts/pokemon-first-gen-validator'
import { mockPokemonFirstGenValidator } from '../test/mock-pokemon-first-gen-validator'
import { PokemonFirstGenValidation } from './pokemon-first-gen-validation'

interface SutTypes {
  sut: PokemonFirstGenValidation
  pokemonFirstGenValidatorStub: PokemonFirstGenValidator
}

const makeSut = (): SutTypes => {
  const pokemonFirstGenValidatorStub = mockPokemonFirstGenValidator()
  const sut = new PokemonFirstGenValidation('pokemonName', pokemonFirstGenValidatorStub)
  return {
    sut, pokemonFirstGenValidatorStub
  }
}

describe('Pokemon First Gen Validation', () => {
  test('Deve retornar um erro se o PokemonFirstGenValidator retornar false', async () => {
    const { sut, pokemonFirstGenValidatorStub } = makeSut()
    jest.spyOn(pokemonFirstGenValidatorStub, 'isValid').mockReturnValueOnce(Promise.resolve(false))
    const error = await sut.validate({ pokemonName: 'agumon' })
    expect(error).toEqual(new PokemonInvalidError('agumon'))
  })
  test('Deve chamar o PokemonFirstGenValidator utilizando um pokemon válido', async () => {
    const { sut, pokemonFirstGenValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(pokemonFirstGenValidatorStub, 'isValid')
    await sut.validate({ pokemonName: 'bulbasaur' })
    expect(isValidSpy).toHaveBeenCalledWith('bulbasaur')
  })
  test('Propague o erro se o PokemonFirstGenValidator lançar um erro', async () => {
    const { sut, pokemonFirstGenValidatorStub } = makeSut()
    jest.spyOn(pokemonFirstGenValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.validate({ pokemonName: 'bulbasaur' })
    await expect(promise).rejects.toThrow()
  })
})
