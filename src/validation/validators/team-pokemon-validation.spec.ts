
import { type PokemonTeam, type Team } from '../../domain/models/team'
import { PokemonInvalidError } from '../../presentation/errors'
import { AbilityInvalidError } from '../../presentation/errors/ability-invalid-error'
import { HoldItemInvalidError } from '../../presentation/errors/hold-item-invalid-error'
import { LengthInvalidError } from '../../presentation/errors/length-invalid-error'
import { MoveInvalidError } from '../../presentation/errors/move-invalid-error'
import { type AbilityValidator } from '../contracts/ability-validator'
import { type HoldItemValidator } from '../contracts/hold-item-validator'
import { type MoveValidator } from '../contracts/move-validator'
import { type PokemonFirstGenValidator } from '../contracts/pokemon-first-gen-validator'
import { mockAbilityValidator } from '../test/mock-ability-validator'
import { mockHoldItemValidator } from '../test/mock-hold-item-validator'
import { mockMoveValidator } from '../test/mock-move-validator'
import { mockPokemonFirstGenValidator } from '../test/mock-pokemon-first-gen-validator'
import { TeamPokemonValidation } from './team-pokemon-validation'

const mockPokemonWithZeroMoves = (): PokemonTeam[0] => {
  return {
    pokemon: {
      name: 'ditto',
      ability: 'imposter',
      holdItem: 'cheri-berry',
      moves: [
      ]
    }
  }
}

const mockPokemonWithFiveMoves = (): PokemonTeam[0] => {
  return {
    pokemon: {
      name: 'ditto',
      ability: 'imposter',
      holdItem: 'cheri-berry',
      moves: [
        {
          name: 'transform'
        },
        {
          name: 'transform'
        },
        {
          name: 'transform'
        },
        {
          name: 'transform'
        },
        {
          name: 'transform'
        }
      ]
    }
  }
}

const mockPokemon = (): PokemonTeam[0] => {
  return {
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
}

let mockInput = (): Team => {
  return {
    team: [
      mockPokemon()
    ],
    visible: true
  }
}

interface SutTypes {
  sut: TeamPokemonValidation
  pokemonFirstGenValidatorStub: PokemonFirstGenValidator
  abilityValidatorStub: AbilityValidator
  holdItemValidatorStub: HoldItemValidator
  moveValidatorStub: MoveValidator
}

const makeSut = (): SutTypes => {
  const pokemonFirstGenValidatorStub = mockPokemonFirstGenValidator()
  const abilityValidatorStub = mockAbilityValidator()
  const holdItemValidatorStub = mockHoldItemValidator()
  const moveValidatorStub = mockMoveValidator()
  const sut = new TeamPokemonValidation(
    pokemonFirstGenValidatorStub,
    abilityValidatorStub,
    holdItemValidatorStub,
    moveValidatorStub
  )
  return {
    sut,
    pokemonFirstGenValidatorStub,
    abilityValidatorStub,
    holdItemValidatorStub,
    moveValidatorStub
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
  describe('HoldItemValidator dependency', () => {
    test('Deve retornar um erro se o HoldItemValidator retornar false', async () => {
      const { sut, holdItemValidatorStub } = makeSut()
      jest.spyOn(holdItemValidatorStub, 'isValid').mockReturnValueOnce(Promise.resolve(false))
      const fakeInput = mockInput()
      fakeInput.team[0].pokemon.holdItem = 'invalid_hold_item'
      const error = await sut.validate(fakeInput)
      expect(error).toEqual(new HoldItemInvalidError('invalid_hold_item'))
    })
    test('Deve chamar o HoldItemValidator utilizando uma habilidade válida', async () => {
      const { sut, holdItemValidatorStub } = makeSut()
      const isValidSpy = jest.spyOn(holdItemValidatorStub, 'isValid')
      await sut.validate(mockInput())
      expect(isValidSpy).toHaveBeenCalledWith('cheri-berry')
    })
    test('Propague o erro se o AbilityValidator lançar um erro', async () => {
      const { sut, holdItemValidatorStub } = makeSut()
      jest.spyOn(holdItemValidatorStub, 'isValid').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.validate(mockInput())
      await expect(promise).rejects.toThrow()
    })
  })
  describe('MoveValidator dependency', () => {
    test('Deve retornar um erro se o MoveValidator retornar false', async () => {
      const { sut, moveValidatorStub } = makeSut()
      jest.spyOn(moveValidatorStub, 'isValid').mockReturnValueOnce(Promise.resolve(false))
      const fakeInput = mockInput()
      fakeInput.team[0].pokemon.moves[0].name = 'invalid_move'
      const error = await sut.validate(fakeInput)
      expect(error).toEqual(new MoveInvalidError('invalid_move'))
    })
    test('Deve chamar o MoveValidator utilizando um move válido', async () => {
      const { sut, moveValidatorStub } = makeSut()
      const isValidSpy = jest.spyOn(moveValidatorStub, 'isValid')
      await sut.validate(mockInput())
      expect(isValidSpy).toHaveBeenCalledWith('ditto', 'transform')
    })
    test('Propague o erro se o MoveValidator lançar um erro', async () => {
      const { sut, moveValidatorStub } = makeSut()
      jest.spyOn(moveValidatorStub, 'isValid').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.validate(mockInput())
      await expect(promise).rejects.toThrow()
    })
  })
  describe('Length validations', () => {
    describe('Team', () => {
      test('Deve retornar um erro caso o tamanho do time seja <1', async () => {
        const { sut } = makeSut()
        mockInput = jest.fn().mockImplementationOnce(() => {
          return {
            team: [
            ],
            visible: true
          }
        })
        const error = await sut.validate(mockInput())
        expect(error).toEqual(new LengthInvalidError('a pokemon team must have between 1 to 6 pokemon'))
      })
      test('Deve retornar um erro caso o tamanho do time seja >6', async () => {
        const { sut } = makeSut()
        mockInput = jest.fn().mockImplementationOnce(() => {
          return {
            team: [
              mockPokemon(),
              mockPokemon(),
              mockPokemon(),
              mockPokemon(),
              mockPokemon(),
              mockPokemon(),
              mockPokemon()
            ],
            visible: true
          }
        })
        const error = await sut.validate(mockInput())
        expect(error).toEqual(new LengthInvalidError('a pokemon team must have between 1 to 6 pokemon'))
      })
    })
    describe('Move', () => {
      test('Deve retornar um erro caso a quantidade de moves de um pokemon seja <1', async () => {
        const { sut } = makeSut()
        mockInput = jest.fn().mockImplementationOnce(() => {
          return {
            team: [
              mockPokemonWithZeroMoves()
            ],
            visible: true
          }
        })
        const error = await sut.validate(mockInput())
        expect(error).toEqual(new LengthInvalidError('a pokemon must have between 1 to 4 moves'))
      })
      test('Deve retornar um erro caso a quantidade de moves de um pokemon seja >6', async () => {
        const { sut } = makeSut()
        mockInput = jest.fn().mockImplementationOnce(() => {
          return {
            team: [
              mockPokemonWithFiveMoves()
            ],
            visible: true
          }
        })
        const error = await sut.validate(mockInput())
        expect(error).toEqual(new LengthInvalidError('a pokemon must have between 1 to 4 moves'))
      })
    })
  })
})
