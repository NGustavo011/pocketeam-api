
import { type Request, type Response } from 'express'
import { type Controller } from '../../presentation/contracts/controller'
import { type HttpRequest } from '../../presentation/contracts/http'
export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      headers: req.headers
    }
    const httpResponse = await controller.execute(httpRequest)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode < 300) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
