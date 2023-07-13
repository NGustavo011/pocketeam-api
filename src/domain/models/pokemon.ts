export interface PokemonListModel {
  name: string
}

export type AllPokemonModel = PokemonListModel[]

export interface PokemonModel {
  name: string
  abilities: [
    {
      name: string
    }
  ]
  moves: [
    {
      name: string
    }
  ]
}
