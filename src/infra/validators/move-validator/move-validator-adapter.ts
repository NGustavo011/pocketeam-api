import env from '../../../main/config/env'
import { type MoveValidator } from '../../../validation/contracts/move-validator'
import { type HttpClient } from '../../http-client/contract/http-client'

export class MoveValidatorAdapter implements MoveValidator {
  constructor (private readonly httpClient: HttpClient) {
  }

  async isValid (pokemonName: string, move: string): Promise<boolean> {
    try {
      const response = await this.httpClient.get(`${env.pokeApiUrl}pokemon/${pokemonName}`)
      for (const pokemonMoves of response.moves) {
        if (pokemonMoves.move.name === move) { return true }
      }
    } catch (error) {
      return false
    }
    return false
  }
}
