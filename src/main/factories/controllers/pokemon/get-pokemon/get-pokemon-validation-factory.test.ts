
import { type Validation } from '../../../../../presentation/contracts/validation'
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
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
