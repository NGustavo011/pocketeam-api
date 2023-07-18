import { type Validation } from '../../presentation/contracts/validation'

export const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

export const mockValidationPromise = (): Validation => {
  class ValidationStub implements Validation {
    async validate (input: any): Promise<Error | null> {
      return await Promise.resolve(null)
    }
  }
  return new ValidationStub()
}
