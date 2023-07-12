export const holdItemsPath = {
  get: {
    tags: ['Itens'],
    summary: 'Rota para retornar todos os route-items disponíves para os pokémon',
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
