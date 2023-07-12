import express from 'express'
import cors from 'cors'
import { loadEnvConfig } from './config/env'
import { serve, setup } from 'swagger-ui-express'
import { swaggerConfig } from './docs/swagger/swagger-config'

loadEnvConfig()
const app = express()
app.use(express.json())
app.use(cors())
app.use('/api-docs', serve, setup(swaggerConfig))
app.listen(process.env.PORT ?? 3333, () => { console.log('Server is running!') })
