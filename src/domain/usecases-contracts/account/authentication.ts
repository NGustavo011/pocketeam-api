import { type AuthenticationModel } from '../../models/authentication'

export interface AuthenticationParams {
  email: string
  password: string
}

export interface AuthenticationContract {
  auth: (authenticationParams: AuthenticationParams) => Promise<AuthenticationModel | null>
}
