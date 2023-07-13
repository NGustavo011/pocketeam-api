import { type PokemonModel } from '../../../domain/models/pokemon'

export interface GetPokemonRepository {
  get: (name: string) => Promise<PokemonModel | null>
}
