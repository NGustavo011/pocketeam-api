import { type Validation } from '../../presentation/contracts/validation'
import { MissingParamError } from '../../presentation/errors'
import { mockValidation, mockValidationPromise } from '../test/mock-validation'
import { ValidationComposite } from './validation-composite'

interface SutTypes {
  sut: ValidationComposite
  validationStubs: Validation[]
}

const makeSut = (): SutTypes => {
  const validationStubs = [mockValidation(), mockValidation(), mockValidationPromise()]
  const sut = new ValidationComposite(validationStubs)
  return {
    sut,
    validationStubs
  }
}

describe('Validation Composite', () => {
  test('Se qualquer depedência do Composite falhar, o erro deve ser propagado', async () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = await sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
  test('Deve retornar o primeiro erro se mais de uma validação resultar em falhas', async () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error())
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = await sut.validate({ field: 'any_value' })
    expect(error).toEqual(new Error())
  })
  test('Não deve retornar nada se a validação', async () => {
    const { sut } = makeSut()
    const error = await sut.validate({ field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
