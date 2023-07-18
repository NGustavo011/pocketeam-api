import { GetHoldItems } from '../../../../../data/usecases/hold-item/get-hold-items/get-hold-items'
import { type GetHoldItemsContract } from '../../../../../domain/usecases-contracts/hold-item/get-hold-items'
import { AxiosAdapter } from '../../../../../infra/http-client/adapters/axios/axios-adapter'
import { HoldItemsHttpClient } from '../../../../../infra/http-client/hold-items/hold-items-http-client'

export const makeGetHoldItems = (): GetHoldItemsContract => {
  const holdItemsHttpClient = new HoldItemsHttpClient(new AxiosAdapter())
  return new GetHoldItems(holdItemsHttpClient)
}
