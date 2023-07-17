import { type ValidateTokenContract } from '../../../../domain/usecases-contracts/account/validate-token'
import { type EditTeamContract } from '../../../../domain/usecases-contracts/team/edit-team'
import { Controller } from '../../../contracts/controller'
import { type HttpRequest, type HttpResponse } from '../../../contracts/http'
import { type Validation } from '../../../contracts/validation'
import { badRequest, noContent, unauthorized } from '../../../helpers/http/http-helper'

export class EditTeamController extends Controller {
  constructor (
    private readonly validation: Validation,
    private readonly validateToken: ValidateTokenContract,
    private readonly editTeam: EditTeamContract
  ) {
    super()
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(Object.assign({}, httpRequest.headers, httpRequest.body, httpRequest.params))
    if (error) {
      return badRequest(error)
    }
    const { Authorization } = httpRequest.headers
    const payload = await this.validateToken.validateToken(Authorization)
    if (!payload) {
      return unauthorized()
    }
    const { team, visible } = httpRequest.body
    const { teamId } = httpRequest.params
    await this.editTeam.edit({
      team,
      visible,
      userId: payload.userId,
      teamId
    })
    return noContent()
  }
}
