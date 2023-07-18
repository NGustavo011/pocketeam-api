/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeGetHoldItemsController } from '../../factories/controllers/hold-item/get-hold-items/get-hold-items-controller-factory'

export const holdItemRoutes = Router()

holdItemRoutes.get('/hold-item', adaptRoute(makeGetHoldItemsController()))
