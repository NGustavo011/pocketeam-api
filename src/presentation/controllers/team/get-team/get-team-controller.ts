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
    const error = await this.validation.validate(Object.assign({}, httpRequest.headers, httpRequest.params))
    if (error) {
      return badRequest(error)
    }
    const { authorization } = httpRequest.headers
    const payload = await this.validateToken.validateToken(authorization)
    if (!payload) {
      return unauthorized()
    }
    const { userId } = httpRequest.params
    const teams = await this.getTeam.get({ userId: payload.userId, searchUserId: userId })
    return ok(teams)
  }
}
