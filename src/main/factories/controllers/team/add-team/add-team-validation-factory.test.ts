
import { type Validation } from '../../../../../presentation/contracts/validation'
import { RequiredFieldValidation } from '../../../../../validation/validators/required-field-validation'
import { ValidationComposite } from '../../../../../validation/validators/validation-composite'
import { makeAddTeamValidation } from './add-team-validation-factory'

jest.mock('../../../../../validation/validators/validation-composite')

describe('SignUp Validation Factory', () => {
  test('Deve chamar o ValidationComposite com todas os validadores', () => {
    makeAddTeamValidation()
    const validations: Validation[] = []
    for (const field of ['team', 'visible']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
