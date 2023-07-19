import { holdItemPath } from './hold-item/hold-item-path'
import { loginPath } from './login/login-path'
import { signUpPath } from './login/signup-path'
import { allPokemonPath } from './pokemon/all-pokemon-path'
import { pokemonPath } from './pokemon/pokemon-path'
import { teamPath } from './team/team-path'
import { teamPathGet } from './team/team-path-get'
import { teamPathTeamId } from './team/team-path-team-id'

export const swaggerPaths = {
  '/login': loginPath,
  '/signup': signUpPath,
  '/hold-item': holdItemPath,
  '/all-pokemon': allPokemonPath,
  '/pokemon/{pokemonName}': pokemonPath,
  '/team?userId&id': teamPathGet,
  '/team': teamPath,
  '/team/{teamId}': teamPathTeamId
}
