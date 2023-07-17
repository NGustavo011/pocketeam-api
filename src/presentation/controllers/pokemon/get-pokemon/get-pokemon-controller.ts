import { Controller } from '../../../contracts/controller'
import { type HttpRequest, type HttpResponse } from '../../../contracts/http'
import { type Validation } from '../../../contracts/validation'
import { badRequest } from '../../../helpers/http/http-helper'

export class GetPokemonController extends Controller {
  constructor (
    private readonly validation: Validation
  ) {
    super()
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.params)
    if (error) {
      return badRequest(error)
    }
    return {
      body: {},
      statusCode: 0
    }
  }
}
