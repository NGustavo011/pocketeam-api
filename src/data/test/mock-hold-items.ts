import { type HoldItem } from '../../domain/models/hold-item'
import { type GetHoldItemsRepository } from '../repositories-contracts/hold-items/get-hold-items-repository'

export const mockGetHoldItemsRepository = (): GetHoldItemsRepository => {
  class GetHoldItemsRepositoryStub implements GetHoldItemsRepository {
    async get (): Promise<HoldItem[]> {
      return await Promise.resolve(
        [
          {
            name: 'hold-item-1'
          },
          {
            name: 'hold-item-2'
          }
        ]
      )
    }
  }
  return new GetHoldItemsRepositoryStub()
}
