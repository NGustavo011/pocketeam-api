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
    test('Deve retornar false caso DecrypterRepository retorne false', async () => {
      const { sut, decrypterRepositoryStub } = makeSut()
      jest.spyOn(decrypterRepositoryStub, 'validateToken').mockReturnValueOnce(Promise.resolve(false))
      const isValidToken = await sut.validateToken(mockToken())
      expect(isValidToken).toBeFalsy()
    })
  })
  test('Deve retornar true em caso de sucesso', async () => {
    const { sut } = makeSut()
    const isValidToken = await sut.validateToken(mockToken())
    expect(isValidToken).toBeTruthy()
  })
})
