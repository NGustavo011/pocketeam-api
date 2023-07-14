import { type GetHoldItemsRepository } from '../../../data/repositories-contracts/hold-items/get-hold-items-repository'
import { type HoldItemModel } from '../../../domain/models/hold-item'
import { type HttpClient } from '../contract/http-client'

export class HoldItemsHttpClient implements GetHoldItemsRepository {
  constructor (private readonly httpClient: HttpClient) {
  }

  async get (): Promise<HoldItemModel[]> {
    const response = await this.httpClient.get('https://pokeapi.co/api/v2/item-attribute/holdable-active/')
    return response.data.items.map((item) => {
      return { name: item.name }
    })
  }
}
