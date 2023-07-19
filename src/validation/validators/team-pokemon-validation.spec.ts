
import { type Team } from '../../domain/models/team'
import { PokemonInvalidError } from '../../presentation/errors'
import { AbilityInvalidError } from '../../presentation/errors/ability-invalid-error'
import { type AbilityValidator } from '../contracts/ability-validator'
import { type PokemonFirstGenValidator } from '../contracts/pokemon-first-gen-validator'
import { mockAbilityValidator } from '../test/mock-ability-validator'
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
  abilityValidatorStub: AbilityValidator
}

const makeSut = (): SutTypes => {
  const pokemonFirstGenValidatorStub = mockPokemonFirstGenValidator()
  const abilityValidatorStub = mockAbilityValidator()
  const sut = new TeamPokemonValidation(pokemonFirstGenValidatorStub, abilityValidatorStub)
  return {
    sut,
    pokemonFirstGenValidatorStub,
    abilityValidatorStub
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
  describe('AbilityValidator dependency', () => {
    test('Deve retornar um erro se o AbilityValidator retornar false', async () => {
      const { sut, abilityValidatorStub } = makeSut()
      jest.spyOn(abilityValidatorStub, 'isValid').mockReturnValueOnce(Promise.resolve(false))
      const fakeInput = mockInput()
      fakeInput.team[0].pokemon.ability = 'invalid_ability'
      const error = await sut.validate(fakeInput)
      expect(error).toEqual(new AbilityInvalidError('invalid_ability'))
    })
    test('Deve chamar o AbilityValidator utilizando uma habilidade válida', async () => {
      const { sut, abilityValidatorStub } = makeSut()
      const isValidSpy = jest.spyOn(abilityValidatorStub, 'isValid')
      await sut.validate(mockInput())
      expect(isValidSpy).toHaveBeenCalledWith('ditto', 'imposter')
    })
    test('Propague o erro se o AbilityValidator lançar um erro', async () => {
      const { sut, abilityValidatorStub } = makeSut()
      jest.spyOn(abilityValidatorStub, 'isValid').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.validate(mockInput())
      await expect(promise).rejects.toThrow()
    })
  })
})