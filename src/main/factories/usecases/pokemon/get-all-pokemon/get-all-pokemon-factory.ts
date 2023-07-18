import { GetAllPokemon } from '../../../../../data/usecases/pokemon/get-all-pokemon/get-all-pokemon'
import { type GetAllPokemonContract } from '../../../../../domain/usecases-contracts/pokemon/get-all-pokemon'
import { AxiosAdapter } from '../../../../../infra/http-client/adapters/axios/axios-adapter'
import { PokemonHttpClient } from '../../../../../infra/http-client/pokemon/pokemon-http-client'

export const makeGetAllPokemon = (): GetAllPokemonContract => {
  const pokemonHttpClient = new PokemonHttpClient(new AxiosAdapter())
  return new GetAllPokemon(pokemonHttpClient)
}
