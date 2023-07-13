import { type PokemonModel } from '../../models/pokemon'

export interface GetPokemonContract {
  get: (name: string) => Promise<PokemonModel | null>
}
