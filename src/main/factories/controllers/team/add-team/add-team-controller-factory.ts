import { ValidateToken } from '../../../../../data/usecases/account/validate-token/validate-token'
import { JwtAdapter } from '../../../../../infra/cryptography/jwt-adapter/jwt-adapter'
import { type Controller } from '../../../../../presentation/contracts/controller'
import { AddTeamController } from '../../../../../presentation/controllers/team/add-team/add-team-controller'
import env from '../../../../config/env'
import { makeAddTeam } from '../../../usecases/team/add-team/add-team-factory'
import { makeAddTeamValidation } from './add-team-validation-factory'

export const makeAddTeamController = (): Controller => {
  const controller = new AddTeamController(makeAddTeamValidation(), new ValidateToken(new JwtAdapter(env.jwtSecret)), makeAddTeam())
  return controller
}
