import { type Validation } from '../../presentation/contracts/validation'
import { InvalidParamError } from '../../presentation/errors'
import { type EmailValidator } from '../contracts/email-validator'

export class EmailValidation implements Validation {
  constructor (private readonly fieldName: string, private readonly emailValidator: EmailValidator) {
  }

  validate (input: any): Error | null {
    const isValidEmail = this.emailValidator.isValid(input[this.fieldName])
    if (!isValidEmail) { return new InvalidParamError(this.fieldName) }
    return null
  }
}
