
import validator from 'validator'
import { type EmailValidator } from '../../../validation/contracts/email-validator'

export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    return validator.isEmail(email)
  }
}
