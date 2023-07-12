export const pokemonPath = {
  get: {
    tags: ['Pokémon'],
    summary: 'Rota para retornar informações detalhadas de um pokémon',
    parameters: [{
      in: 'path',
      name: 'pokemonName',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/pokemon'
            }
          }
        }
      },
      403: {
        $ref: '#components/forbidden'
      },
      404: {
        $ref: '#components/notFound'
      },
      500: {
        $ref: '#components/serverError'
      }
    }
  }
}
