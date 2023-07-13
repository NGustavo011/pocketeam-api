export type PokemonTeam = Array<{
  pokemon: {
    name: string
    ability: string
    holdItem: string
    moves:
    Array<{
      name: string
    }>
  }
}>

export interface Team {
  team: PokemonTeam
  visible: boolean
}

export interface PokemonTeamModel { team: PokemonTeam, id: string, userId: string }

export type TeamModel = Team & { id: string, userId: string }
