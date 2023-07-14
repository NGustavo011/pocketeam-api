import { type HttpRequest, type HttpResponse } from './http'
import { ServerError } from '../errors'
import { serverError } from '../helpers/http/http-helper'

export abstract class Controller {
  async execute (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const output = await this.handle(httpRequest)
      return output
    } catch (error) {
      return serverError(new ServerError())
    }
  }

  abstract handle (httpRequest: HttpRequest): Promise<HttpResponse>
}
