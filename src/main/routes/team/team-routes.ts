/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeAddTeamController } from '../../factories/controllers/team/add-team/add-team-controller-factory'
import { makeEditTeamController } from '../../factories/controllers/team/edit-team/edit-team-controller-factory'
import { makeDeleteTeamController } from '../../factories/controllers/team/delete-team/delete-team-controller-factory'
import { makeGetTeamController } from '../../factories/controllers/team/get-team/get-team-controller-factory'

export const teamRoutes = Router()

teamRoutes.get('/team/:userId?/:id?', adaptRoute(makeGetTeamController()))
teamRoutes.post('/team', adaptRoute(makeAddTeamController()))
teamRoutes.put('/team/:teamId', adaptRoute(makeEditTeamController()))
teamRoutes.delete('/team/:teamId', adaptRoute(makeDeleteTeamController()))
