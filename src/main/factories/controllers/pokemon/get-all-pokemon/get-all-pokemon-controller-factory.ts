import { type Controller } from '../../../../../presentation/contracts/controller'
import { GetAllPokemonController } from '../../../../../presentation/controllers/pokemon/get-all-pokemon/get-all-pokemon-controller'
import { makeGetAllPokemon } from '../../../usecases/pokemon/get-all-pokemon/get-all-pokemon-factory'

export const makeGetAllPokemonController = (): Controller => {
  const controller = new GetAllPokemonController(makeGetAllPokemon())
  return controller
}
