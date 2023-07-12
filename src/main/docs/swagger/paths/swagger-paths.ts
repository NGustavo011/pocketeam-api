import { holdItemPath } from './hold-item/hold-item-path'
import { loginPath } from './login/login-path'
import { signUpPath } from './login/signup-path'
import { allPokemonPath } from './pokemon/all-pokemon-path'
import { pokemonPath } from './pokemon/pokemon-path'

export const swaggerPaths = {
  '/login': loginPath,
  '/signup': signUpPath,
  '/hold-item': holdItemPath,
  '/all-pokemon': allPokemonPath,
  '/pokemon': pokemonPath
}
