import { isPromise } from 'util/types'
import { type Validation } from '../../presentation/contracts/validation'

export class ValidationComposite implements Validation {
  constructor (private readonly validations: Validation[]) {
  }

  async validate (input: any): Promise<Error | null> {
    for (const validation of this.validations) {
      const error = validation.validate(input)
      if (isPromise(error)) {
        return await Promise.resolve(error)
      }
      if (error) {
        return error
      }
    }
    return null
  }
}
