import * as Path from 'node:path'
import booksRouter from './routes/books'
import findbooksRouter from './routes/findbooks'
import express from 'express'

const server = express()
server.use(express.json())

server.use('/api/v1/books', booksRouter)
server.use(findbooksRouter)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
