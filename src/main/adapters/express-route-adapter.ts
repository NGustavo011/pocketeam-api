
import { type Request, type Response } from 'express'
import { type Controller } from '../../presentation/contracts/controller'
import { type HttpRequest } from '../../presentation/contracts/http'
export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const queryParams = {}
    if (req.query) {
      const params = Object.keys(req.query)
      params.forEach(param => {
        if (req.query[param]) {
          queryParams[param] = req.query[param]
        }
      })
    }
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      headers: req.headers,
      query: queryParams
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
