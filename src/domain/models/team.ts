export type PokemonTeam = Array<{
  pokemon: {
    name: 'string'
    ability: 'string'
    holdItem: 'string'
    moves:
    Array<{
      name: 'string'
    }>
  }
}>

export interface Team {
  team: PokemonTeam
  visible: boolean
}
