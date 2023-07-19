export const teamPath = {
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Time'],
    summary: 'Rota para criar uma time',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addTeamParams'
          }
        }
      }
    },
    responses: {
      204: {
        description: 'Sucesso'
      },
      401: {
        $ref: '#components/unauthorized'
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
