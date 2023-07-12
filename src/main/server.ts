import express from 'express'
import cors from 'cors'
import { loadEnvConfig } from './config/env'

loadEnvConfig()
const app = express()
app.use(express.json())
app.use(cors())
app.listen(process.env.PORT ?? 3333, () => { console.log('Server is running!') })
