import { type Controller } from '../../../../../presentation/contracts/controller'
import { GetPokemonController } from '../../../../../presentation/controllers/pokemon/get-pokemon/get-pokemon-controller'
import { makeGetPokemon } from '../../../usecases/pokemon/get-pokemon/get-pokemon-factory'
import { makeGetPokemonValidation } from './get-pokemon-validation-factory'

export const makeGetPokemonController = (): Controller => {
  const controller = new GetPokemonController(makeGetPokemonValidation(), makeGetPokemon())
  return controller
}
