import { Router } from 'express'
import { accountRoutes } from './account-routes'

export const router = Router()

router.use('/api', accountRoutes)
