import { accountSchema } from './account-schema'
import { allPokemonSchema } from './all-pokemon-schema'
import { apiKeyAuthSchema } from './api-key-auth-schema'
import { errorSchema } from './error-schema'
import { loginParamsSchema } from './login-params-schema'
import { signUpParamsSchema } from './signup-params-schema'

export const swaggerSchemas = {
  account: accountSchema,
  signUpParams: signUpParamsSchema,
  loginParams: loginParamsSchema,
  allPokemon: allPokemonSchema,
  error: errorSchema,
  apiKeyAuth: apiKeyAuthSchema
}
