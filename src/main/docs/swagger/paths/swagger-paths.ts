import { holdItemsPath } from './hold-items/hold-items-path'
import { loginPath } from './login/login-path'
import { signUpPath } from './login/signup-path'
import { allPokemonPath } from './pokemon/all-pokemon-path'
import { pokemonPath } from './pokemon/pokemon-path'

export const swaggerPaths = {
  '/login': loginPath,
  '/signup': signUpPath,
  '/hold-items': holdItemsPath,
  '/all-pokemon': allPokemonPath,
  '/pokemon': pokemonPath
}
