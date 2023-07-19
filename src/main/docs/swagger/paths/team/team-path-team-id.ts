export const teamPathTeamId = {
  put: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Time'],
    summary: 'Rota para alterar dados de um time',
    parameters: [{
      in: 'path',
      name: 'teamId',
      required: true,
      schema: {
        type: 'string'
      }
    }],
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
  },
  delete: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Time'],
    summary: 'Rota para deletar um time',
    parameters: [{
      in: 'path',
      name: 'teamId',
      required: true,
      schema: {
        type: 'string'
      }
    }],
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
