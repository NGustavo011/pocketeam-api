import { loginPath } from './login/login-path'
import { signUpPath } from './login/signup-path'
import { allPokemonPath } from './pokemon/all-pokemon-path'

export const swaggerPaths = {
  '/login': loginPath,
  '/signup': signUpPath,
  '/all-pokemon': allPokemonPath
}
