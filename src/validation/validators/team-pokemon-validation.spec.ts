
import { type Team } from '../../domain/models/team'
import { PokemonInvalidError } from '../../presentation/errors'
import { type PokemonFirstGenValidator } from '../contracts/pokemon-first-gen-validator'
import { mockPokemonFirstGenValidator } from '../test/mock-pokemon-first-gen-validator'
import { TeamPokemonValidation } from './team-pokemon-validation'

export const mockInput = (): Team => {
  return {
    team: [
      {
        pokemon: {
          name: 'ditto',
          ability: 'imposter',
          holdItem: 'cheri-berry',
          moves: [
            {
              name: 'transform'
            }
          ]
        }
      }
    ],
    visible: true
  }
}

interface SutTypes {
  sut: TeamPokemonValidation
  pokemonFirstGenValidatorStub: PokemonFirstGenValidator
}

const makeSut = (): SutTypes => {
  const pokemonFirstGenValidatorStub = mockPokemonFirstGenValidator()
  const sut = new TeamPokemonValidation(pokemonFirstGenValidatorStub)
  return {
    sut, pokemonFirstGenValidatorStub
  }
}

describe('Team Pokemon Validation', () => {
  describe('PokemonFirstGenValidator dependency', () => {
    test('Deve retornar um erro se o PokemonFirstGenValidator retornar false', async () => {
      const { sut, pokemonFirstGenValidatorStub } = makeSut()
      jest.spyOn(pokemonFirstGenValidatorStub, 'isValid').mockReturnValueOnce(Promise.resolve(false))
      const fakeInput = mockInput()
      fakeInput.team[0].pokemon.name = 'agumon'
      const error = await sut.validate(fakeInput)
      expect(error).toEqual(new PokemonInvalidError('agumon'))
    })
    test('Deve chamar o PokemonFirstGenValidator utilizando um pokemon válido', async () => {
      const { sut, pokemonFirstGenValidatorStub } = makeSut()
      const isValidSpy = jest.spyOn(pokemonFirstGenValidatorStub, 'isValid')
      await sut.validate(mockInput())
      expect(isValidSpy).toHaveBeenCalledWith('ditto')
    })
    test('Propague o erro se o PokemonFirstGenValidator lançar um erro', async () => {
      const { sut, pokemonFirstGenValidatorStub } = makeSut()
      jest.spyOn(pokemonFirstGenValidatorStub, 'isValid').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.validate(mockInput())
      await expect(promise).rejects.toThrow()
    })
  })
})
