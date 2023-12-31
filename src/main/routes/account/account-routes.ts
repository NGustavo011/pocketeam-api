/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeSignUpController } from '../../factories/controllers/account/signup/signup-controller-factory'
import { makeLoginController } from '../../factories/controllers/account/login/login-controller-factory'

export const accountRoutes = Router()

accountRoutes.post('/signup', adaptRoute(makeSignUpController()))
accountRoutes.post('/login', adaptRoute(makeLoginController()))
