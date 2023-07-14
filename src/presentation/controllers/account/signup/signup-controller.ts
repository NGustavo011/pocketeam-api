import { type AddAccountContract } from '../../../../domain/usecases-contracts/account/add-account'
import { Controller } from '../../../contracts/controller'
import { type HttpRequest, type HttpResponse } from '../../../contracts/http'

export class SignUpController extends Controller {
  constructor (private readonly addAccount: AddAccountContract) {
    super()
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name, email, password } = httpRequest.body
    await this.addAccount.add({
      email,
      name,
      password
    })
    return {
      body: {},
      statusCode: 0
    }
  }
}
