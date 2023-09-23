//dependencies
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import { createServer } from 'http'
import { Server as SocketServer } from 'socket.io'
import { expressjwt } from 'express-jwt'
//helpers and middleware
import { socketHandler } from './src/socket/index.js'
import errorHandler from './src/middleware/errorHandler.js'
import httpStatus from './src/helpers/httpStatus.js'
import './src/database/prisma.js'
//routes
import { authRouter } from './src/routes/auth.routes.js'
import { messageRouter } from './src/routes/message.routes.js'

dotenv.config()
const PORT = process.env.PORT

const app = express()
  .use(cors())
  .use(express.urlencoded({ extended: true }))
  .use(express.json())

app.use(morgan('dev'))

app.get("/", (_req, res) => {
  res.json({
    name: "chat-react-express"
  });
});

app.all(
  '/*',
  expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] }).unless({
    path: [
      { url: '/auth/register', methods: ['POST'] },
      { url: '/auth/login', methods: ['POST'] }
    ]
  })
)

app.use((err, _, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(httpStatus.UNAUTHORIZED).json({
      error: err.name,
      cause: 'Unauthorized. Missing or invalid token provided.'
    })
  } else {
    next(err)
  }
})

const server = createServer(app)
const io = new SocketServer(server, {
  cors: {
    origin: process.env.FRONTEND_URI
  }
})

socketHandler(io)

server.listen(PORT, () => console.log(`Listening on port ${PORT}`))

app.use('/', authRouter())
app.use('/api', messageRouter())

app.use(errorHandler)