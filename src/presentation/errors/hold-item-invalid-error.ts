export class HoldItemInvalidError extends Error {
  constructor (holdItemName: string) {
    super(`Invalid hold item: ${holdItemName}`)
    this.name = 'HoldItemInvalidError'
  }
}
