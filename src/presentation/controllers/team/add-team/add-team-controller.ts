import { type ValidateTokenContract } from '../../../../domain/usecases-contracts/account/validate-token'
import { type AddTeamContract } from '../../../../domain/usecases-contracts/team/add-team'
import { Controller } from '../../../contracts/controller'
import { type HttpRequest, type HttpResponse } from '../../../contracts/http'
import { type Validation } from '../../../contracts/validation'
import { badRequest, unauthorized } from '../../../helpers/http/http-helper'

export class AddTeamController extends Controller {
  constructor (
    private readonly validation: Validation,
    private readonly validateToken: ValidateTokenContract,
    private readonly addTeam: AddTeamContract
  ) {
    super()
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const errorBody = this.validation.validate(httpRequest.body)
    const errorHeaders = this.validation.validate(httpRequest.headers)
    const error = errorBody ?? errorHeaders
    if (error) {
      return badRequest(error)
    }
    const { Authorization } = httpRequest.headers
    const payload = await this.validateToken.validateToken(Authorization)
    if (!payload) {
      return unauthorized()
    }
    const { team, visible } = httpRequest.body
    await this.addTeam.add({
      team,
      visible,
      userId: payload.userId
    })
    return {
      body: {},
      statusCode: 0
    }
  }
}
