import express from 'express'
import routers from './routers/index.mjs'
import middleware from './middleware/index.mjs'
import cors from 'cors'

const app = express()

//origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5175' || 'http://127.0.0.1:5175',
const corsOptions = {
  origin: ['http://localhost:5175', 'http://127.0.0.1:5175'],
  optionsSuccessStatus: 200
}

// initial middlerware
app.use(cors(corsOptions))
app.use(express.json())

// routers
app.use('/auth', routers.auth)
app.use('/api', routers.api)
app.use('/admin', routers.admin)

// error middleware
app.use(middleware.genericError)

export default app