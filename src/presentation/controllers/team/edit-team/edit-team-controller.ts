import { type ValidateTokenContract } from '../../../../domain/usecases-contracts/account/validate-token'
import { type EditTeamContract } from '../../../../domain/usecases-contracts/team/edit-team'
import { Controller } from '../../../contracts/controller'
import { type HttpRequest, type HttpResponse } from '../../../contracts/http'
import { type Validation } from '../../../contracts/validation'
import { InvalidParamError } from '../../../errors'
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
    const error = await this.validation.validate(Object.assign({}, httpRequest.headers, httpRequest.body, httpRequest.params))
    if (error) {
      return badRequest(error)
    }
    const { authorization } = httpRequest.headers
    const payload = await this.validateToken.validateToken(authorization)
    if (!payload) {
      return unauthorized()
    }
    const { team, visible } = httpRequest.body
    const { teamId } = httpRequest.params
    const editedTeam = await this.editTeam.edit({
      team,
      visible: Boolean(visible),
      userId: payload.userId,
      teamId
    })
    if (!editedTeam) {
      return badRequest(new InvalidParamError('team not found to user specified'))
    }
    return noContent()
  }
}
