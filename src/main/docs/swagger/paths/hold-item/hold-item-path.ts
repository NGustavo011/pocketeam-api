export const holdItemPath = {
  get: {
    tags: ['Itens'],
    summary: 'Rota para retornar todos os hold-items disponíves para os pokémon',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/holdItems'
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
