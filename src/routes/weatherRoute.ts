/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Router, type Request, type Response } from 'express';
import { constants } from '../configs';
import { getByLocation, getByStaion } from '../services/iqAirService';
import { badRequest, internalServerError } from '../utils/errors';
const app = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get('/api/stationOrLocation/:name', async (req: Request, res: Response) => {
  const { name } = req.params
  const config = constants[name as keyof typeof constants];
  if (!config) return badRequest(res, { message: 'Invalid name' });
  try {
    const data = await getByStaion(config.station);
    return res.send(data);
  } catch (error) {
    try {
      const data = await getByLocation(config.latitude, config.longitude);
      return res.send(data);
    } catch (error) {
      return internalServerError(res, error)
    }
  }
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get('/api/station/:name', async (req: Request, res: Response) => {
  const { name } = req.params
  const config = constants[name as keyof typeof constants];
  if (!config) return badRequest(res, { message: 'Invalid name' });
  try {
    const data = await getByStaion(config.station);
    return res.send(data);
  } catch (error) {
    return internalServerError(res, error)
  }
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get('/api/location/:name', async (req: Request, res: Response) => {
  const { name } = req.params
  const config = constants[name as keyof typeof constants];
  if (!config) return badRequest(res, { message: 'Invalid name' });
  try {
    const data = await getByLocation(config.latitude, config.longitude);
    return res.send(data);
  } catch (error) {
    return internalServerError(res, error)
  }
})

export { app as weatherRoute };
