import { throwError } from '../../../../domain/test/test-helpers'
import { type GetHoldItemsRepository } from '../../../repositories-contracts/hold-items/get-hold-items-repository'
import { mockGetHoldItemsRepository, mockHoldItemsModel } from '../../../test/mock-hold-items'
import { GetHoldItems } from './get-hold-items'

interface SutTypes {
  getHoldItemsRepositoryStub: GetHoldItemsRepository
  sut: GetHoldItems
}

const makeSut = (): SutTypes => {
  const getHoldItemsRepositoryStub = mockGetHoldItemsRepository()
  const sut = new GetHoldItems(getHoldItemsRepositoryStub)
  return {
    getHoldItemsRepositoryStub,
    sut
  }
}

describe('GetHoldItems usecase', () => {
  describe('GetHoldItemsRepository dependency', () => {
    test('Deve chamar GetHoldItemsRepository', async () => {
      const { sut, getHoldItemsRepositoryStub } = makeSut()
      const getSpy = jest.spyOn(getHoldItemsRepositoryStub, 'get')
      await sut.get()
      expect(getSpy).toHaveBeenCalled()
    })
    test('Deve repassar a exceção se o GetHoldItemsRepository lançar um erro', async () => {
      const { sut, getHoldItemsRepositoryStub } = makeSut()
      jest.spyOn(getHoldItemsRepositoryStub, 'get').mockImplementationOnce(throwError)
      const promise = sut.get()
      await expect(promise).rejects.toThrow()
    })
  })
  test('Deve retornar um HoldItemModel[] com sucesso', async () => {
    const { sut } = makeSut()
    const holdItems = await sut.get()
    expect(holdItems).toEqual(mockHoldItemsModel())
  })
})
