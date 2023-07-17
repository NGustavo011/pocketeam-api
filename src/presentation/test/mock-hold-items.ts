import { type HoldItemModel } from '../../domain/models/hold-item'
import { type GetHoldItemsContract } from '../../domain/usecases-contracts/hold-item/get-hold-items'

export const mockGetHoldItems = (): GetHoldItemsContract => {
  class GetHoldItemsStub implements GetHoldItemsContract {
    async get (): Promise<HoldItemModel[] | null> {
      return await Promise.resolve(
        [
          {
            name: 'hold-item-1'
          },
          {
            name: 'hold-item-2'
          },
          {
            name: 'hold-item-3'
          }
        ]
      )
    }
  }
  return new GetHoldItemsStub()
}
