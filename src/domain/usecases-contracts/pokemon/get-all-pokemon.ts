import { type AllPokemonModel } from '../../models/pokemon'

export interface GetAllPokemonContract {
  getAll: () => Promise<AllPokemonModel | null>
}
