import { type Validation } from '../../../../../presentation/contracts/validation'
import { RequiredFieldValidation } from '../../../../../validation/validators/required-field-validation'
import { ValidationComposite } from '../../../../../validation/validators/validation-composite'
import { makeGetTeamValidation } from './get-team-validation-factory'

jest.mock('../../../../../validation/validators/validation-composite')

describe('GetTeam Validation Factory', () => {
  test('Deve chamar o ValidationComposite com todas os validadores', () => {
    makeGetTeamValidation()
    const validations: Validation[] = []
    for (const field of ['authorization']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
