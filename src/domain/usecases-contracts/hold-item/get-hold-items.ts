import { type HoldItemModel } from '../../models/hold-item'

export interface GetHoldItemsContract {
  get: () => Promise<HoldItemModel[] | null>
}
