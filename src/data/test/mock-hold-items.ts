import { type HoldItemModel } from '../../domain/models/hold-item'
import { type GetHoldItemsRepository } from '../repositories-contracts/hold-items/get-hold-items-repository'

export const mockHoldItemsModel = (): HoldItemModel[] => (
  [
    {
      name: 'hold-item-1'
    },
    {
      name: 'hold-item-2'
    }
  ]
)

export const mockGetHoldItemsRepository = (): GetHoldItemsRepository => {
  class GetHoldItemsRepositoryStub implements GetHoldItemsRepository {
    async get (): Promise<HoldItemModel[]> {
      return await Promise.resolve(mockHoldItemsModel())
    }
  }
  return new GetHoldItemsRepositoryStub()
}
