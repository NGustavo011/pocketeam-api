
import { AxiosAdapter } from '../../../../../infra/http-client/adapters/axios/axios-adapter'
import { PokemonFirstGenValidatorAdapter } from '../../../../../infra/validators/pokemon-first-gen-validator/pokemon-validator-adapter'
import { type Validation } from '../../../../../presentation/contracts/validation'
import { PokemonFirstGenValidation } from '../../../../../validation/validators/pokemon-first-gen-validation'
import { RequiredFieldValidation } from '../../../../../validation/validators/required-field-validation'
import { ValidationComposite } from '../../../../../validation/validators/validation-composite'
import { makeGetPokemonValidation } from './get-pokemon-validation-factory'

jest.mock('../../../../../validation/validators/validation-composite')

describe('GetPokemon Validation Factory', () => {
  test('Deve chamar o ValidationComposite com todos os validadores', () => {
    makeGetPokemonValidation()
    const validations: Validation[] = []
    for (const field of ['pokemonName']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new PokemonFirstGenValidation('pokemonName', new PokemonFirstGenValidatorAdapter(new AxiosAdapter())))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
