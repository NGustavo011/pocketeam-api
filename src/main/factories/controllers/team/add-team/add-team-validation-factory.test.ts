
import { AxiosAdapter } from '../../../../../infra/http-client/adapters/axios/axios-adapter'
import { PokemonFirstGenValidatorAdapter } from '../../../../../infra/validators/pokemon-first-gen-validator/pokemon-validator-adapter'
import { type Validation } from '../../../../../presentation/contracts/validation'
import { RequiredFieldValidation } from '../../../../../validation/validators/required-field-validation'
import { TeamPokemonValidation } from '../../../../../validation/validators/team-pokemon-validation'
import { ValidationComposite } from '../../../../../validation/validators/validation-composite'
import { makeAddTeamValidation } from './add-team-validation-factory'

jest.mock('../../../../../validation/validators/validation-composite')

describe('SignUp Validation Factory', () => {
  test('Deve chamar o ValidationComposite com todas os validadores', () => {
    makeAddTeamValidation()
    const validations: Validation[] = []
    for (const field of ['team', 'visible', 'authorization']) {
      validations.push(new RequiredFieldValidation(field))
    }
    const axiosAdapter = new AxiosAdapter()
    validations.push(new TeamPokemonValidation(new PokemonFirstGenValidatorAdapter(axiosAdapter)))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
