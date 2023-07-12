export const addTeamParamsSchema = {
  type: 'object',
  properties: {
    team: {
      $ref: '#/schemas/team'
    },
    visible: {
      type: 'boolean'
    }
  },
  required: ['team']
}
