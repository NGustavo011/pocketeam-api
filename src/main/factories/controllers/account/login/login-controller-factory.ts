import { type Controller } from '../../../../../presentation/contracts/controller'
import { LoginController } from '../../../../../presentation/controllers/account/login/login-controller'
import { makeAuthentication } from '../../../usecases/account/authentication/authentication-factory'
import { makeLoginValidation } from './login-validation-factory'

export const makeLoginControllerFactory = (): Controller => {
  const controller = new LoginController(makeLoginValidation(), makeAuthentication())
  return controller
}
