import { type PokemonFirstGenValidator } from '../../../validation/contracts/pokemon-first-gen-validator'
import { type HttpClient } from '../../http-client/contract/http-client'

export class PokemonFirstGenValidatorAdapter implements PokemonFirstGenValidator {
  constructor (private readonly httpClient: HttpClient) {
  }

  async isValid (pokemonName: string): Promise<boolean> {
    const response = await this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    if (!response.data || response.data.id > 151) { return false }
    return true
  }
}
