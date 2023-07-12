import { accountSchema } from './account-schema'
import { apiKeyAuthSchema } from './api-key-auth-schema'
import { errorSchema } from './error-schema'
import { loginParamsSchema } from './login-params-schema'
import { signUpParamsSchema } from './signup-params-schema'

export const swaggerSchemas = {
  account: accountSchema,
  signUpParams: signUpParamsSchema,
  loginParams: loginParamsSchema,
  error: errorSchema,
  apiKeyAuth: apiKeyAuthSchema
}
