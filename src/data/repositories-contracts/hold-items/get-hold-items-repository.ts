import { type HoldItem } from '../../../domain/models/hold-item'

export interface GetHoldItemsRepository {
  get: () => Promise<HoldItem[]>
}
