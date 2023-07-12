export const teamSchema = {
  type: 'array',
  items: {
    properties: {
      pokemon: {
        properties: {
          name: {
            type: 'string'
          },
          ability: {
            type: 'string'
          },
          holdItem: {
            type: 'string'
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
        },
        required: ['name', 'ability', 'holdItem', 'moves']
      }
    },
    required: ['pokemon']
  }
}
