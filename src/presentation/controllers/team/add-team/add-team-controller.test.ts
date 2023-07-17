import { mockValidation } from '../../../../validation/test/mock-validation'
import { type HttpRequest } from '../../../contracts/http'
import { type Validation } from '../../../contracts/validation'
import { MissingParamError } from '../../../errors'
import { badRequest } from '../../../helpers/http/http-helper'
import { AddTeamController } from './add-team-controller'

const mockRequest = (): HttpRequest => {
  return {
    body: {
      team: [
        {
          pokemon: {
            name: 'pokemon-1',
            ability: 'ability-1',
            holdItem: 'hold-item-1',
            moves: [
              {
                name: 'move-1'
              },
              {
                name: 'move-2'
              }
            ]
          }
        },
        {
          pokemon: {
            name: 'pokemon-2',
            ability: 'ability-2',
            holdItem: 'hold-item-2',
            moves: [
              {
                name: 'move-1'
              },
              {
                name: 'move-2'
              }
            ]
          }
        }
      ],
      visible: true
    },
    headers: {
      Authorization: 'any_token'
    }
  }
}

interface SutTypes {
  validationStub: Validation
  sut: AddTeamController
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const sut = new AddTeamController(validationStub)
  return {
    validationStub,
    sut
  }
}

describe('AddTeam Controller', () => {
  describe('Validation dependency', () => {
    test('Deve chamar o Validation com valores corretos', async () => {
      const { sut, validationStub } = makeSut()
      const validateSpy = jest.spyOn(validationStub, 'validate')
      const httpRequest = mockRequest()
      await sut.execute(httpRequest)
      expect(validateSpy).toHaveBeenCalledTimes(2)
      expect(validateSpy).toHaveBeenLastCalledWith(httpRequest.headers)
    })
    test('Retorne status 400 se o Validation retornar um erro', async () => {
      const { sut, validationStub } = makeSut()
      jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
      const httpResponse = await sut.execute(mockRequest())
      expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
    })
  })
})
