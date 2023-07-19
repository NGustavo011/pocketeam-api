import { type HoldItemValidator } from '../../../validation/contracts/hold-item-validator'
import { type HttpClient } from '../../http-client/contract/http-client'

export class HoldItemValidatorAdapter implements HoldItemValidator {
  constructor (private readonly httpClient: HttpClient) {
  }

  async isValid (holdItem: string): Promise<boolean> {
    try {
      const response = await this.httpClient.get('https://pokeapi.co/api/v2/item-attribute/holdable-active/')
      return response.items.filter((item) => holdItem === item.name.toString()).length > 0
    } catch (error) {
      return false
    }
  }
}
