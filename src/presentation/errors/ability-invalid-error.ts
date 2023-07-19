export class AbilityInvalidError extends Error {
  constructor (abilityName: string) {
    super(`Invalid ability: ${abilityName}`)
    this.name = 'AbilityInvalidError'
  }
}
