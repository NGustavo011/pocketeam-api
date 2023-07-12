export const pokemonSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    abilities: {
      type: 'array',
      items: {
        properties: {
          name: {
            type: 'string'
          }
        }
      }
    },
    moves: {
      type: 'array',
      items: {
        properties: {
          name: {
            type: 'string'
          }
        }
      }
    }
  }
}
