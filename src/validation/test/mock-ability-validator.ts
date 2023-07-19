import { type AbilityValidator } from '../contracts/ability-validator'

export const mockAbilityValidator = (): AbilityValidator => {
  class AbilityValidatorStub implements AbilityValidator {
    async isValid (pokemonName: string, ability: string): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new AbilityValidatorStub()
}
