import { type Validation } from '../../presentation/contracts/validation'
import { MissingParamError } from '../../presentation/errors'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) {
  }

  validate (input: any): Error | null {
    if (input[this.fieldName] === undefined) {
      return new MissingParamError(this.fieldName)
    }
    return null
  }
}
