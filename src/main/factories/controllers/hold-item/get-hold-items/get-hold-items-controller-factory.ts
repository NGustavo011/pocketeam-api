import { type Controller } from '../../../../../presentation/contracts/controller'
import { GetHoldItemsController } from '../../../../../presentation/controllers/hold-item/get-hold-items/get-hold-items-controller'
import { makeGetHoldItems } from '../../../usecases/hold-item/get-hold-items/get-hold-items-factory'

export const makeGetHoldItemsController = (): Controller => {
  const controller = new GetHoldItemsController(makeGetHoldItems())
  return controller
}
