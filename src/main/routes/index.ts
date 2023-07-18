import { Router } from 'express'
import { accountRoutes } from './account/account-routes'
import { holdItemRoutes } from './hold-item/hold-item-routes'
import { pokemonRoutes } from './pokemon/pokemon-routes'

export const router = Router()

router.use('/api', accountRoutes, holdItemRoutes, pokemonRoutes)
