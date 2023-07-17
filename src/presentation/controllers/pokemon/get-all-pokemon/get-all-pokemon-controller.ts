import { type GetAllPokemonContract } from '../../../../domain/usecases-contracts/pokemon/get-all-pokemon'
import { Controller } from '../../../contracts/controller'
import { type HttpRequest, type HttpResponse } from '../../../contracts/http'

export class GetAllPokemonController extends Controller {
  constructor (
    private readonly getAllPokemon: GetAllPokemonContract
  ) {
    super()
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.getAllPokemon.getAll()
    return {
      body: {},
      statusCode: 0
    }
  }
}
