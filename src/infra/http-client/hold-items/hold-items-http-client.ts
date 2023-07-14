import { type GetHoldItemsRepository } from '../../../data/repositories-contracts/hold-items/get-hold-items-repository'
import { type HoldItemModel } from '../../../domain/models/hold-item'
import { type HttpClient } from '../adapters/http-client'

export class HoldItemsHttpClient implements GetHoldItemsRepository {
  constructor (private readonly httpClient: HttpClient) {
  }

  async get (): Promise<HoldItemModel[]> {
    const holdItems = await this.httpClient.get('https://pokeapi.co/api/v2/item-attribute/holdable-active/')
    return holdItems.data.items
  }
}
