import { type AllPokemonModel } from '../../../domain/models/pokemon'

export interface GetAllPokemonRepository {
  getAll: () => Promise<AllPokemonModel>
}
