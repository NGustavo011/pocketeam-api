import { ValidateToken } from '../../../../../data/usecases/account/validate-token/validate-token'
import { JwtAdapter } from '../../../../../infra/cryptography/jwt-adapter/jwt-adapter'
import { type Controller } from '../../../../../presentation/contracts/controller'
import { DeleteTeamController } from '../../../../../presentation/controllers/team/delete-team/delete-team-controller'
import env from '../../../../config/env'
import { makeDeleteTeam } from '../../../usecases/team/delete-team/delete-team-factory'
import { makeDeleteTeamValidation } from './delete-team-validation-factory'

export const makeDeleteTeamController = (): Controller => {
  const controller = new DeleteTeamController(makeDeleteTeamValidation(), new ValidateToken(new JwtAdapter(env.jwtSecret)), makeDeleteTeam())
  return controller
}
