import express, { type Request, type Response } from 'express'

import bodyParser from 'body-parser'
import routes from './routes'
import { errorHandler, notFound } from './utils/errors'

export const app = express()
app.use(bodyParser.json())
routes.forEach((route) => app.use(route))

app.all('*', (req: Request, res: Response) => {
  return notFound(res)
})

app.use(errorHandler)

export default app
