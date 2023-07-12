export const teamPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Time'],
    summary: 'Rota para listar os times geral ou de um usuário específico',
    parameters: [{
      in: 'path',
      name: 'userId',
      required: false,
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
  },
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
  },
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
