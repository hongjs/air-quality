import { internalServerError } from '@/utils/errors'
import { Router, type Request, type Response } from 'express'

const app = Router()

app.get('/api/test', (req: Request, res: Response) => {
  try {
    res.send({ a: 1 })
  } catch (e) {
    return internalServerError(res, e)
  }
})

export { app as weatherRoute }
