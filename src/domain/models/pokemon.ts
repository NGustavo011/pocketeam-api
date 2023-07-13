export interface PokemonListModel {
  name: string
}

export type AllPokemonModel = PokemonListModel[]

export interface PokemonModel {
  name: string
  abilities:
  Array<{
    name: string
  }>
  moves:
  Array<{
    name: string
  }>
}
