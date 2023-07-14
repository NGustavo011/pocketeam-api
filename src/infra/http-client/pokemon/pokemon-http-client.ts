
import { type GetAllPokemonRepository } from '../../../data/repositories-contracts/pokemon/get-all-pokemon-repository'
import { type AllPokemonModel } from '../../../domain/models/pokemon'
import { type HttpClient } from '../contract/http-client'

export class PokemonHttpClient implements GetAllPokemonRepository {
  constructor (private readonly httpClient: HttpClient) {
  }

  async getAll (): Promise<AllPokemonModel> {
    const allPokemon = await this.httpClient.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151')
    return allPokemon.data.results.map((pokemon) => {
      return { name: pokemon.name }
    })
  }
}
