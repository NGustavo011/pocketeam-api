import express from 'express'
import cors from 'cors'
import { loadEnvConfig } from './config/env'
import { serve, setup } from 'swagger-ui-express'
import { swaggerConfig } from './docs/swagger/swagger-config'
import { router } from './routes'
import env from '../main/config/env'

loadEnvConfig()
export const app = express()
app.use(express.json())
app.use(cors())
app.use('/api-docs', serve, setup(swaggerConfig))
app.use(router)
app.listen(env.port, () => { console.log('Server is running!') })
