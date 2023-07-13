import { type HoldItem } from '../../models/hold-item'

export interface GetHoldItems {
  get: () => Promise<HoldItem[] | null>
}
