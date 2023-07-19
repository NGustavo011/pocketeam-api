import { type HoldItemValidator } from '../contracts/hold-item-validator'

export const mockHoldItemValidator = (): HoldItemValidator => {
  class HoldItemValidatorStub implements HoldItemValidator {
    async isValid (holdItem: string): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new HoldItemValidatorStub()
}
