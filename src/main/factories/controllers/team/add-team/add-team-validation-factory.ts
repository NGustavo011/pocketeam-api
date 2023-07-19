import { AxiosAdapter } from '../../../../../infra/http-client/adapters/axios/axios-adapter'
import { PokemonFirstGenValidatorAdapter } from '../../../../../infra/validators/pokemon-first-gen-validator/pokemon-validator-adapter'
import { type Validation } from '../../../../../presentation/contracts/validation'
import { RequiredFieldValidation } from '../../../../../validation/validators/required-field-validation'
import { TeamPokemonValidation } from '../../../../../validation/validators/team-pokemon-validation'
import { ValidationComposite } from '../../../../../validation/validators/validation-composite'

export const makeAddTeamValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['team', 'visible', 'authorization']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new TeamPokemonValidation(new PokemonFirstGenValidatorAdapter(new AxiosAdapter())))
  return new ValidationComposite(validations)
}
