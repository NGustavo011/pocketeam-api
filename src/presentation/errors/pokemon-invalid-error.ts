export class PokemonInvalidError extends Error {
  constructor (pokemonName: string) {
    super(`Invalid pokemon: ${pokemonName}`)
    this.name = 'PokemonInvalidError'
  }
}
