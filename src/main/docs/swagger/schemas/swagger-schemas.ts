import { accountSchema } from './account-schema'
import { apiKeyAuthSchema } from './api-key-auth-schema'
import { errorSchema } from './error-schema'
import { signUpParamsSchema } from './signup-params-schema'

export const swaggerSchemas = {
  account: accountSchema,
  signUpParams: signUpParamsSchema,
  error: errorSchema,
  apiKeyAuth: apiKeyAuthSchema
}
