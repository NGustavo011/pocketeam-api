import { type AddAccountContract } from '../../../../domain/usecases-contracts/account/add-account'
import { Controller } from '../../../contracts/controller'
import { type HttpRequest, type HttpResponse } from '../../../contracts/http'
import { EmailInUseError } from '../../../errors'
import { forbidden } from '../../../helpers/http/http-helper'

export class SignUpController extends Controller {
  constructor (private readonly addAccount: AddAccountContract) {
    super()
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name, email, password } = httpRequest.body
    const account = await this.addAccount.add({
      name,
      email,
      password
    })
    if (!account) { return forbidden(new EmailInUseError()) }
    return {
      body: {},
      statusCode: 0
    }
  }
}
