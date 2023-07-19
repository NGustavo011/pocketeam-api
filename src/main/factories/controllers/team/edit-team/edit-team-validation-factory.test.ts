
import { AxiosAdapter } from '../../../../../infra/http-client/adapters/axios/axios-adapter'
import { AbilityValidatorAdapter } from '../../../../../infra/validators/ability-validator/ability-validator-adapter'
import { HoldItemValidatorAdapter } from '../../../../../infra/validators/hold-item-validator/hold-item-validator-adapter'
import { MoveValidatorAdapter } from '../../../../../infra/validators/move-validator/move-validator-adapter'
import { PokemonFirstGenValidatorAdapter } from '../../../../../infra/validators/pokemon-first-gen-validator/pokemon-validator-adapter'
import { type Validation } from '../../../../../presentation/contracts/validation'
import { RequiredFieldValidation } from '../../../../../validation/validators/required-field-validation'
import { TeamPokemonValidation } from '../../../../../validation/validators/team-pokemon-validation'
import { ValidationComposite } from '../../../../../validation/validators/validation-composite'
import { makeEditTeamValidation } from './edit-team-validation-factory'

jest.mock('../../../../../validation/validators/validation-composite')

describe('EditTeam Validation Factory', () => {
  test('Deve chamar o ValidationComposite com todas os validadores', () => {
    makeEditTeamValidation()
    const validations: Validation[] = []
    for (const field of ['team', 'visible', 'authorization', 'teamId']) {
      validations.push(new RequiredFieldValidation(field))
    }
    const axiosAdapter = new AxiosAdapter()
    validations.push(new TeamPokemonValidation(
      new PokemonFirstGenValidatorAdapter(axiosAdapter),
      new AbilityValidatorAdapter(axiosAdapter),
      new HoldItemValidatorAdapter(axiosAdapter),
      new MoveValidatorAdapter(axiosAdapter)
    ))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
