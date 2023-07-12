export const allPokemonPath = {
  get: {
    tags: ['Pokémon'],
    summary: 'Rota para retornar todos os pokémon disponíves para montar time',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/allPokemon'
            }
          }
        }
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
