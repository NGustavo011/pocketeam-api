export class DuplicatedMoveError extends Error {
  constructor (move: string) {
    super(`Duplicated move in pokemon: ${move}`)
    this.name = 'DuplicatedMoveError'
  }
}
