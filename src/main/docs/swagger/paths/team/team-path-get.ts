export const teamPathGet = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Time'],
    summary: 'Rota para listar os times geral ou de um usuário específico',
    parameters: [
      {
        in: 'query',
        name: 'userId',
        required: false,
        schema: {
          type: 'string'
        }
      },
      {
        in: 'query',
        name: 'id',
        required: false,
        schema: {
          type: 'string'
        }
      }
    ],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/teams'
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
