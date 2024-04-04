/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Router, type Request, type Response } from 'express';
import { getByLocation, getByStaion } from '../services/iqAirService';
import { internalServerError } from '../utils/errors';
const app = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get('/api/getAny', async (req: Request, res: Response) => {
  try {
    const data = await getByStaion('bangkok/seri-village');
    return res.send(data);
  } catch (error) {
    try {
      const data = await getByLocation('13.79318356', '100.6295606');
      return res.send(data);
    } catch (error) {
      return internalServerError(res, error)
    }
  }
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get('/api/station', async (req: Request, res: Response) => {
  try {
    const data = await getByStaion('bangkok/seri-village');
    return res.send(data);
  } catch (error) {
    return internalServerError(res, error)
  }
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get('/api/location', async (req: Request, res: Response) => {
  try {
    const data = await getByLocation('13.79318356', '100.6295606');
    return res.send(data);
  } catch (error) {
    return internalServerError(res, error)
  }
})

export { app as weatherRoute };
