
import { type GetAllPokemonRepository } from '../../../data/repositories-contracts/pokemon/get-all-pokemon-repository'
import { type GetPokemonRepository } from '../../../data/repositories-contracts/pokemon/get-pokemon-repository'
import { type PokemonModel, type AllPokemonModel } from '../../../domain/models/pokemon'
import { type HttpClient } from '../contract/http-client'

export class PokemonHttpClient implements GetAllPokemonRepository, GetPokemonRepository {
  constructor (private readonly httpClient: HttpClient) {
  }

  async getAll (): Promise<AllPokemonModel> {
    const response = await this.httpClient.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151')
    return response.data.results.map((pokemon) => {
      return { name: pokemon.name }
    })
  }

  async get (name: string): Promise<PokemonModel | null> {
    try {
      const response = await this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      return {
        name: response.data.forms[0].name,
        abilities: response.data.abilities.map(ability => {
          return { name: ability.name }
        }),
        moves: response.data.moves.map(move => {
          return { name: move.name }
        })
      }
    } catch (error) {
      return null
    }
  }
}
