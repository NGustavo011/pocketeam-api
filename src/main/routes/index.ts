import { Router } from 'express'
import { accountRoutes } from './account/account-routes'
import { holdItemRoutes } from './hold-item/get-hold-items-routes'
import { pokemonRoutes } from './pokemon/get-all-pokemon-routes'

export const router = Router()

router.use('/api', accountRoutes, holdItemRoutes, pokemonRoutes)
