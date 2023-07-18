/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeAddTeamController } from '../../factories/controllers/team/add-team/add-team-controller-factory'

export const teamRoutes = Router()

teamRoutes.post('/team', adaptRoute(makeAddTeamController()))
