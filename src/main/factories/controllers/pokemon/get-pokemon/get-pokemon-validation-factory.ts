import { AxiosAdapter } from '../../../../../infra/http-client/adapters/axios/axios-adapter'
import { PokemonFirstGenValidatorAdapter } from '../../../../../infra/validators/pokemon-first-gen-validator/pokemon-validator-adapter'
import { type Validation } from '../../../../../presentation/contracts/validation'
import { PokemonFirstGenValidation } from '../../../../../validation/validators/pokemon-first-gen-validation'
import { RequiredFieldValidation } from '../../../../../validation/validators/required-field-validation'
import { ValidationComposite } from '../../../../../validation/validators/validation-composite'

export const makeGetPokemonValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['pokemonName']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new PokemonFirstGenValidation('pokemonName', new PokemonFirstGenValidatorAdapter(new AxiosAdapter())))
  return new ValidationComposite(validations)
}
