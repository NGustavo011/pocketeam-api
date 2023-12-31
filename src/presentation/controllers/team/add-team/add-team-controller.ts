import { type ValidateTokenContract } from '../../../../domain/usecases-contracts/account/validate-token'
import { type AddTeamContract } from '../../../../domain/usecases-contracts/team/add-team'
import { Controller } from '../../../contracts/controller'
import { type HttpRequest, type HttpResponse } from '../../../contracts/http'
import { type Validation } from '../../../contracts/validation'
import { badRequest, noContent, unauthorized } from '../../../helpers/http/http-helper'

export class AddTeamController extends Controller {
  constructor (
    private readonly validation: Validation,
    private readonly validateToken: ValidateTokenContract,
    private readonly addTeam: AddTeamContract
  ) {
    super()
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = await this.validation.validate(Object.assign({}, httpRequest.headers, httpRequest.body))
    if (error) {
      return badRequest(error)
    }
    const { authorization } = httpRequest.headers
    const payload = await this.validateToken.validateToken(authorization)
    if (!payload) {
      return unauthorized()
    }
    const { team, visible } = httpRequest.body
    await this.addTeam.add({
      team,
      visible: Boolean(visible),
      userId: payload.userId
    })
    return noContent()
  }
}
