import { ValidateToken } from '../../../../../data/usecases/account/validate-token/validate-token'
import { JwtAdapter } from '../../../../../infra/cryptography/jwt-adapter/jwt-adapter'
import { type Controller } from '../../../../../presentation/contracts/controller'
import { EditTeamController } from '../../../../../presentation/controllers/team/edit-team/edit-team-controller'
import env from '../../../../config/env'
import { makeEditTeam } from '../../../usecases/team/edit-team/edit-team-factory'
import { makeEditTeamValidation } from './edit-team-validation-factory'

export const makeEditTeamController = (): Controller => {
  const controller = new EditTeamController(makeEditTeamValidation(), new ValidateToken(new JwtAdapter(env.jwtSecret)), makeEditTeam())
  return controller
}
