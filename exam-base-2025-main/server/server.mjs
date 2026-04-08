import http from 'http'
import app from './app.mjs'
import dotenv from 'dotenv'

//incarca configuratia din fisierul .env din acelasi director cu server.mjs
dotenv.config()

//in process.env - sunt variabilele de mediu, incarcate cu dotenv.config()
//console.log("process.env.JWT_SECRET:", process.env.JWT_SECRET)


const PORT = process.env.PORT || 8080

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})