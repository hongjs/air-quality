/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { type Response } from 'express'

type ErrorResponse = Response<any, Record<string, any>>

export const unauthorized = (res: Response): ErrorResponse => {
  return res.status(401).send({ message: 'UNAUTHORIZED' })
}

export const notFound = (res: Response): ErrorResponse => {
  return res.status(404).send({ message: 'NOT FOUND' })
}

export const badRequest = (res: Response, data: unknown): ErrorResponse => {
  return res.status(400).send(data)
}

export const internalServerError = (res: Response, exception: unknown, data?: unknown): ErrorResponse => {
  if (exception) console.error(JSON.stringify(exception))

  if (data) {
    return res.status(500).send(data)
  } else {
    return res.status(500).send(exception)
  }
}

export const errorHandler = (err: unknown, res: Response): ErrorResponse => {
  return res.status(500).send({ message: 'Something went wrong', err })
}

export default {
  unauthorized,
  notFound,
  badRequest,
  internalServerError,
  errorHandler
}
