import env from '../../../main/config/env'
import { type AbilityValidator } from '../../../validation/contracts/ability-validator'
import { type HttpClient } from '../../http-client/contract/http-client'

export class AbilityValidatorAdapter implements AbilityValidator {
  constructor (private readonly httpClient: HttpClient) {
  }

  async isValid (pokemonName: string, ability: string): Promise<boolean> {
    try {
      const response = await this.httpClient.get(`${env.pokeApiUrl}pokemon/${pokemonName}`)
      for (const pokemonAbility of response.abilities) {
        if (pokemonAbility.ability.name === ability) { return true }
      }
    } catch (error) {
      return false
    }
    return false
  }
}
