import { type HoldItem } from '../../../../domain/models/hold-item'
import { type GetHoldItemsContract } from '../../../../domain/usecases-contracts/hold-item/get-hold-items'
import { type GetHoldItemsRepository } from '../../../repositories-contracts/hold-items/get-hold-items-repository'

export class GetHoldItems implements GetHoldItemsContract {
  constructor (private readonly getHoldItemsRepository: GetHoldItemsRepository) {}
  async get (): Promise<HoldItem[] | null> {
    await this.getHoldItemsRepository.get()
    return null
  }
}
