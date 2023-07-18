import jwt from 'jsonwebtoken'
import { JwtAdapter, type JwtVerifyToken } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  sign: async (): Promise<string> => {
    return await new Promise(resolve => { resolve('any_token') })
  },
  verify: async (): Promise<JwtVerifyToken> => {
    return await Promise.resolve({
      id: 'any_value',
      iat: 0,
      exp: 0
    })
  }
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret')
}

describe('Jwt Adapter', () => {
  describe('sign()', () => {
    test('Deve chamar o método sign com valores corretos', async () => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('any_id')
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret', { expiresIn: '2h' })
    })
    test('Deve retornar um token em caso de sucesso do método sign', async () => {
      const sut = makeSut()
      const accessToken = await sut.encrypt('any_id')
      expect(accessToken).toBe('any_token')
    })
    test('Deve propagar o erro, caso o método sign lance um erro', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => { throw new Error() })
      const promise = sut.encrypt('any_id')
      await expect(promise).rejects.toThrow()
    })
  })
  describe('verify()', () => {
    test('Deve chamar o método verify com valores corretos', async () => {
      const sut = makeSut()
      const verifySpy = jest.spyOn(jwt, 'verify')
      await sut.validateToken('any_token')
      expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret')
    })
    test('Deve retornar um userId em caso de sucesso do método verify', async () => {
      const sut = makeSut()
      const payload = await sut.validateToken('any_token')
      expect(payload?.userId).toBeTruthy()
      expect(payload?.userId).toBe('any_value')
    })
    test('Deve propagar o erro, caso o método verify lance um erro', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'verify').mockImplementationOnce(() => { throw new Error() })
      const isValidToken = await sut.validateToken('any_token')
      expect(isValidToken).toBeNull()
    })
  })
})
