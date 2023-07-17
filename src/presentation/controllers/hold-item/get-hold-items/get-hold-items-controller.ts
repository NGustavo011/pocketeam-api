import { type GetHoldItemsContract } from '../../../../domain/usecases-contracts/hold-item/get-hold-items'
import { Controller } from '../../../contracts/controller'
import { type HttpRequest, type HttpResponse } from '../../../contracts/http'

export class GetHoldItemsController extends Controller {
  constructor (
    private readonly getHoldItems: GetHoldItemsContract
  ) {
    super()
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.getHoldItems.get()
    return {
      body: {},
      statusCode: 0
    }
  }
}
