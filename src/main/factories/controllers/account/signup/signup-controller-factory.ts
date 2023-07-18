import { type Controller } from '../../../../../presentation/contracts/controller'
import { SignUpController } from '../../../../../presentation/controllers/account/signup/signup-controller'
import { makeAddAccount } from '../../../usecases/account/add-account/add-account-factory'
import { makeAuthentication } from '../../../usecases/account/authentication/authentication-factory'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeAddAccount(), makeSignUpValidation(), makeAuthentication())
  return controller
}
