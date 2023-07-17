import { type GetAllPokemonContract } from '../../../../domain/usecases-contracts/pokemon/get-all-pokemon'
import { Controller } from '../../../contracts/controller'
import { type HttpRequest, type HttpResponse } from '../../../contracts/http'
import { ok } from '../../../helpers/http/http-helper'

export class GetAllPokemonController extends Controller {
  constructor (
    private readonly getAllPokemon: GetAllPokemonContract
  ) {
    super()
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const allPokemon = await this.getAllPokemon.getAll()
    return ok(allPokemon)
  }
}
