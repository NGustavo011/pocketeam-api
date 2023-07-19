import { type MoveValidator } from '../contracts/move-validator'

export const mockMoveValidator = (): MoveValidator => {
  class MoveValidatorStub implements MoveValidator {
    async isValid (pokemonName: string, move: string): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new MoveValidatorStub()
}
