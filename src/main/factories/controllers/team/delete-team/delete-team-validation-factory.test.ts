import { type Validation } from '../../../../../presentation/contracts/validation'
import { RequiredFieldValidation } from '../../../../../validation/validators/required-field-validation'
import { ValidationComposite } from '../../../../../validation/validators/validation-composite'
import { makeDeleteTeamValidation } from './delete-team-validation-factory'

jest.mock('../../../../../validation/validators/validation-composite')

describe('DeleteTeam Validation Factory', () => {
  test('Deve chamar o ValidationComposite com todas os validadores', () => {
    makeDeleteTeamValidation()
    const validations: Validation[] = []
    for (const field of ['authorization', 'teamId']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
