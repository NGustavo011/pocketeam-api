import { loadEnvConfig } from './config/env'

import env from '../main/config/env'
import { app } from './config/app'

loadEnvConfig()

app.listen(env.port, () => { console.log('Server is running!') })
