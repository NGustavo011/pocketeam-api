import { type AddAccountContract } from '../../../../domain/usecases-contracts/account/add-account'
import { type AuthenticationContract } from '../../../../domain/usecases-contracts/account/authentication'
import { Controller } from '../../../contracts/controller'
import { type HttpRequest, type HttpResponse } from '../../../contracts/http'
import { type Validation } from '../../../contracts/validation'
import { EmailInUseError } from '../../../errors'
import { badRequest, forbidden } from '../../../helpers/http/http-helper'

export class SignUpController extends Controller {
  constructor (
    private readonly addAccount: AddAccountContract,
    private readonly validation: Validation,
    private readonly authentication: AuthenticationContract
  ) {
    super()
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) return badRequest(error)
    const { name, email, password } = httpRequest.body
    const account = await this.addAccount.add({
      name,
      email,
      password
    })
    if (!account) { return forbidden(new EmailInUseError()) }
    await this.authentication.auth({
      email,
      password
    })
    return {
      body: {},
      statusCode: 0
    }
  }
}
