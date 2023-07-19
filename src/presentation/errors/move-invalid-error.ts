export class MoveInvalidError extends Error {
  constructor (moveName: string) {
    super(`Invalid move: ${moveName}`)
    this.name = 'MoveInvalidError'
  }
}
