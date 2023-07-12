export const allPokemonSchema = {
  type: 'array',
  items: {
    properties: {
      name: {
        type: 'string'
      }
    }
  }
}
