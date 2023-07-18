import { type ValidateTokenContract } from '../../../../domain/usecases-contracts/account/validate-token'
import { type DeleteTeamContract } from '../../../../domain/usecases-contracts/team/delete-team'
import { Controller } from '../../../contracts/controller'
import { type HttpRequest, type HttpResponse } from '../../../contracts/http'
import { type Validation } from '../../../contracts/validation'
import { badRequest, noContent, unauthorized } from '../../../helpers/http/http-helper'

export class DeleteTeamController extends Controller {
  constructor (
    private readonly validation: Validation,
    private readonly validateToken: ValidateTokenContract,
    private readonly deleteTeam: DeleteTeamContract
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
    const { teamId } = httpRequest.params
    await this.deleteTeam.delete({
      userId: payload.userId,
      teamId
    })
    return noContent()
  }
}
