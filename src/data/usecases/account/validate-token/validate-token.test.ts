import { throwError } from '../../../../domain/test/test-helpers'
import { type DecrypterRepository } from '../../../repositories-contracts/cryptography/decrypter-repository'
import { mockDecrypterRepository, mockToken } from '../../../test/mock-cryptography'
import { ValidateToken } from './validate-token'

interface SutTypes {
  decrypterRepositoryStub: DecrypterRepository
  sut: ValidateToken
}

const makeSut = (): SutTypes => {
  const decrypterRepositoryStub = mockDecrypterRepository()
  const sut = new ValidateToken(decrypterRepositoryStub)
  return {
    decrypterRepositoryStub,
    sut
  }
}

describe('ValidateToken usecase', () => {
  describe('DecrypterRepository dependency', () => {
    test('Deve chamar o DecrypterRepository com o valor correto', async () => {
      const { sut, decrypterRepositoryStub } = makeSut()
      const validateTokenSpy = jest.spyOn(decrypterRepositoryStub, 'validateToken')
      await sut.validateToken(mockToken())
      expect(validateTokenSpy).toHaveBeenCalledWith(mockToken())
    })
    test('Deve propagar o erro caso o DecrypterRepository lance um erro', async () => {
      const { sut, decrypterRepositoryStub } = makeSut()
      jest.spyOn(decrypterRepositoryStub, 'validateToken').mockImplementationOnce(throwError)
      const promise = sut.validateToken(mockToken())
      await expect(promise).rejects.toThrow()
    })
    test('Deve retornar null caso DecrypterRepository retorne null', async () => {
      const { sut, decrypterRepositoryStub } = makeSut()
      jest.spyOn(decrypterRepositoryStub, 'validateToken').mockReturnValueOnce(Promise.resolve(null))
      const payload = await sut.validateToken(mockToken())
      expect(payload).toBeNull()
    })
  })
  test('Deve retornar true em caso de sucesso', async () => {
    const { sut } = makeSut()
    const payload = await sut.validateToken(mockToken())
    expect(payload).toEqual({ userId: 'any_user_id' })
  })
})
