import dotenv from 'dotenv'

export const loadEnvConfig = (): void => {
  dotenv.config()
}

export default {
  port: process.env.PORT ?? 3333,
  databaseUrl: process.env.DATABASE_URL ?? 'postgresql://pato:pato11@localhost:5432/pocketeam?schema=public',
  jwtSecret: process.env.JWT_SECRET ?? 'pato'
}
