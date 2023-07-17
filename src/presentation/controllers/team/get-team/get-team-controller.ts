import { type ValidateTokenContract } from '../../../../domain/usecases-contracts/account/validate-token'
import { type GetTeamContract } from '../../../../domain/usecases-contracts/team/get-team'
import { Controller } from '../../../contracts/controller'
import { type HttpRequest, type HttpResponse } from '../../../contracts/http'
import { type Validation } from '../../../contracts/validation'
import { badRequest, ok, unauthorized } from '../../../helpers/http/http-helper'

export class GetTeamController extends Controller {
  constructor (
    private readonly validation: Validation,
    private readonly validateToken: ValidateTokenContract,
    private readonly getTeam: GetTeamContract
  ) {
    super()
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(Object.assign({}, httpRequest.headers, httpRequest.params))
    if (error) {
      return badRequest(error)
    }
    const { Authorization } = httpRequest.headers
    const payload = await this.validateToken.validateToken(Authorization)
    if (!payload) {
      return unauthorized()
    }
    const { userId } = httpRequest.params
    await this.getTeam.get({ userId: payload.userId, searchUserId: userId })
    return ok({})
  }
}
