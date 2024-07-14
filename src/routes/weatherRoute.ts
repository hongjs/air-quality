/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { constants } from '@/configs';
import { Router, type Request, type Response } from 'express';
import air4thaiSrv from '../services/air4thaiService';
import aiqInSrv from '../services/aqiInService';
import iqAirSrv from '../services/iqAirService';
import { badRequest, internalServerError } from '../utils/errors';
const app = Router()

app.get('/api/:name', async (req: Request, res: Response) => {
  const { name } = req.params
  const config = constants[name as keyof typeof constants];

  if (!config) return badRequest(res, { message: 'Invalid name' });
  try {
    if (config.aqiIn) {
      try {
        const data = await aiqInSrv.getByLocation(config.aqiIn?.lat, config.aqiIn?.lon)
        return res.send(data);
      } catch (error) {
        return internalServerError(res, error)
      }
    }

    if (config.air4thaiId) {
      try {
        const data = await air4thaiSrv.getByStation(config.air4thaiId);
        return res.send(data);
      } catch (error) {
        console.log(error)
        return internalServerError(res, error)
      }
    }

    if (config.iqAir) {
      try {
        const data = await iqAirSrv.getByLocation(config.iqAir.latitude, config.iqAir.longitude);
        return res.send(data);
      } catch (error) {
        console.log(error)
        return internalServerError(res, error)
      }
    }
  } catch (error) {
    console.log(error)
    return internalServerError(res, error)
  }
})

app.get('/api/iqair/:lat/:lon', async (req: Request, res: Response) => {
  try {
    const data = await iqAirSrv.getByLocation(req.params.lat, req.params.lon);
    return res.send(data);
  } catch (error) {
    return internalServerError(res, error)
  }
})

app.get('/api/air4thai/:stationId', async (req: Request, res: Response) => {
  try {
    const data = await air4thaiSrv.getByStation('bkp119t');
    return res.send(data);
  } catch (error) {
    console.log(error)
    return internalServerError(res, error)
  }
})

app.get('/api/aqiin/:lat/:lon', async (req: Request, res: Response) => {
  try {
    const data = await aiqInSrv.getByLocation(req.params.lat, req.params.lon);
    return res.send(data);
  } catch (error) {
    console.log(error)
    return internalServerError(res, error)
  }
})

export { app as weatherRoute };
