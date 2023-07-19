import { ValidateToken } from '../../../../../data/usecases/account/validate-token/validate-token'
import { JwtAdapter } from '../../../../../infra/cryptography/jwt-adapter/jwt-adapter'
import { type Controller } from '../../../../../presentation/contracts/controller'
import { GetTeamController } from '../../../../../presentation/controllers/team/get-team/get-team-controller'
import env from '../../../../config/env'
import { makeGetTeam } from '../../../usecases/team/get-team/get-team-factory'
import { makeGetTeamValidation } from './get-team-validation-factory'

export const makeGetTeamController = (): Controller => {
  const controller = new GetTeamController(makeGetTeamValidation(), new ValidateToken(new JwtAdapter(env.jwtSecret)), makeGetTeam())
  return controller
}
