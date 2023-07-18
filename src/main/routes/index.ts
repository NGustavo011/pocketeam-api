import { Router } from 'express'
import { accountRoutes } from './account/account-routes'
import { holdItemRoutes } from './hold-item/get-hold-items-routes'

export const router = Router()

router.use('/api', accountRoutes, holdItemRoutes)
