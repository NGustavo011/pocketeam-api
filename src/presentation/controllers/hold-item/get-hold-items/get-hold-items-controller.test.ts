import { throwError } from '../../../../domain/test/test-helpers'
import { type GetHoldItemsContract } from '../../../../domain/usecases-contracts/hold-item/get-hold-items'
import { type HttpRequest } from '../../../contracts/http'
import { ServerError } from '../../../errors'
import { serverError } from '../../../helpers/http/http-helper'
import { mockGetHoldItems } from '../../../test/mock-hold-items'
import { GetHoldItemsController } from './get-hold-items-controller'

const mockRequest = (): HttpRequest => {
  return {
  }
}

interface SutTypes {
  sut: GetHoldItemsController
  getHoldItemsStub: GetHoldItemsContract
}

const makeSut = (): SutTypes => {
  const getHoldItemsStub = mockGetHoldItems()
  const sut = new GetHoldItemsController(getHoldItemsStub)
  return {
    sut,
    getHoldItemsStub
  }
}

describe('GetHoldItems Controller', () => {
  describe('GetHoldItems dependency', () => {
    test('Deve chamar GetHoldItems', async () => {
      const { sut, getHoldItemsStub } = makeSut()
      const getSpy = jest.spyOn(getHoldItemsStub, 'get')
      await sut.execute(mockRequest())
      expect(getSpy).toHaveBeenCalled()
    })
    test('Retorne status de erro 500 se o execute lançar um erro', async () => {
      const { sut, getHoldItemsStub } = makeSut()
      jest.spyOn(getHoldItemsStub, 'get').mockImplementationOnce(throwError)
      const httpResponse = await sut.execute(mockRequest())
      expect(httpResponse).toEqual(serverError(new ServerError()))
    })
  })
})
