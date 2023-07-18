import { GetPokemon } from '../../../../../data/usecases/pokemon/get-pokemon/get-pokemon'
import { type GetPokemonContract } from '../../../../../domain/usecases-contracts/pokemon/get-pokemon'
import { AxiosAdapter } from '../../../../../infra/http-client/adapters/axios/axios-adapter'
import { PokemonHttpClient } from '../../../../../infra/http-client/pokemon/pokemon-http-client'

export const makeGetPokemon = (): GetPokemonContract => {
  const pokemonHttpClient = new PokemonHttpClient(new AxiosAdapter())
  return new GetPokemon(pokemonHttpClient)
}
