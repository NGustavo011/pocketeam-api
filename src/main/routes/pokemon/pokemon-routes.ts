/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeGetAllPokemonController } from '../../factories/controllers/pokemon/get-all-pokemon/get-all-pokemon-controller-factory'
import { makeGetPokemonController } from '../../factories/controllers/pokemon/get-pokemon/get-pokemon-controller-factory'

export const pokemonRoutes = Router()

pokemonRoutes.get('/all-pokemon', adaptRoute(makeGetAllPokemonController()))
pokemonRoutes.get('/pokemon/:pokemonName', adaptRoute(makeGetPokemonController()))
