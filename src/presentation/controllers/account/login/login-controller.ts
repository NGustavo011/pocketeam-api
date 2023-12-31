import { type AuthenticationContract } from '../../../../domain/usecases-contracts/account/authentication'
import { Controller } from '../../../contracts/controller'
import { type HttpRequest, type HttpResponse } from '../../../contracts/http'
import { type Validation } from '../../../contracts/validation'
import { badRequest, ok, unauthorized } from '../../../helpers/http/http-helper'

export class LoginController extends Controller {
  constructor (
    private readonly validation: Validation,
    private readonly authentication: AuthenticationContract
  ) {
    super()
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = await this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    const { email, password } = httpRequest.body
    const authenticationModel = await this.authentication.auth({ email, password })
    if (!authenticationModel) { return unauthorized() }
    return ok(authenticationModel)
  }
}
