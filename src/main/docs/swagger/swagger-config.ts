import { swaggerComponents } from './components/swagger-components'
import { swaggerPaths } from './paths/swagger-paths'
import { swaggerSchemas } from './schemas/swagger-schemas'

export const swaggerConfig = {
  openapi: '3.0.0',
  info: {
    title: 'PockeTeam API',
    description: 'API desenvolvida para fãs de pokémon criarem os seus times ideais, seja times competitivos, temáticos ou apenas casuais.',
    version: '1.0.0'
  },
  servers: [{
    url: '/api'
  }],
  tags: [
    {
      name: 'Auth'
    }
  ],
  paths: swaggerPaths,
  schemas: swaggerSchemas,
  components: swaggerComponents
}
