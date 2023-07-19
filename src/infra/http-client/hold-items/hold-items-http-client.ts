import { type GetHoldItemsRepository } from '../../../data/repositories-contracts/hold-items/get-hold-items-repository'
import { type HoldItemModel } from '../../../domain/models/hold-item'
import env from '../../../main/config/env'
import { type HttpClient } from '../contract/http-client'

export class HoldItemsHttpClient implements GetHoldItemsRepository {
  constructor (private readonly httpClient: HttpClient) {
  }

  async get (): Promise<HoldItemModel[]> {
    const response = await this.httpClient.get(`${env.pokeApiUrl}item-attribute/holdable-active/`)
    return response.items.map((item) => {
      return { name: item.name }
    })
  }
}
