import { accountSchema } from './account-schema'
import { addTeamParamsSchema } from './add-team-params'
import { allPokemonSchema } from './all-pokemon-schema'
import { apiKeyAuthSchema } from './api-key-auth-schema'
import { errorSchema } from './error-schema'
import { holdItemsSchema } from './hold-items-schema'
import { loginParamsSchema } from './login-params-schema'
import { pokemonSchema } from './pokemon-schema'
import { signUpParamsSchema } from './signup-params-schema'
import { teamSchema } from './team'
import { teamsSchema } from './teams'

export const swaggerSchemas = {
  account: accountSchema,
  signUpParams: signUpParamsSchema,
  loginParams: loginParamsSchema,
  allPokemon: allPokemonSchema,
  pokemon: pokemonSchema,
  holdItems: holdItemsSchema,
  addTeamParams: addTeamParamsSchema,
  team: teamSchema,
  teams: teamsSchema,
  error: errorSchema,
  apiKeyAuth: apiKeyAuthSchema
}
