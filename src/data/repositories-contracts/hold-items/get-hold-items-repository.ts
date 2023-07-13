import { type HoldItemModel } from '../../../domain/models/hold-item'

export interface GetHoldItemsRepository {
  get: () => Promise<HoldItemModel[]>
}
