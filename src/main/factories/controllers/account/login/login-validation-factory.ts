import { EmailValidatorAdapter } from '../../../../../infra/validators/email-validator/email-validator-adapter'
import { type Validation } from '../../../../../presentation/contracts/validation'
import { EmailValidation } from '../../../../../validation/validators/email-validation'
import { RequiredFieldValidation } from '../../../../../validation/validators/required-field-validation'
import { ValidationComposite } from '../../../../../validation/validators/validation-composite'

export const makeLoginValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
