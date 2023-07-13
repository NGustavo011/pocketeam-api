import { type HoldItem } from '../../models/hold-item'

export interface GetHoldItemsContract {
  get: () => Promise<HoldItem[] | null>
}
