/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Router, type Request, type Response } from 'express';
import { JSDOM } from 'jsdom';
import { internalServerError } from '../utils/errors';
const app = Router()

app.get('/api/usaqi', (req: Request, res: Response) => {
  fetch(process.env.TARGET_SITE ?? '')
    .then(async response => await response.text())
    .then(html => {
      const dom = new JSDOM(html);
      const aqiElement = dom.window.document.querySelector('.aqi-value__value')
      const pm25Element = dom.window.document.querySelector('.pollutant-concentration-value')
      const timestampWrapper = dom.window.document.querySelector('.timestamp__wrapper');
      const timeElement = timestampWrapper?.querySelector('time');
      const timestampElement = timeElement?.getAttribute('datetime');

      const usaqi = Number(aqiElement?.textContent?.trim() ?? 0);
      const pm25 = Number(pm25Element?.textContent?.trim() ?? 0);
      const timestamp = timestampElement ? new Date(timestampElement) : null

      return res.json({ usaqi, pm25, timestamp })
    })
    .catch(error => {
      return internalServerError(res, error)
    });
})

export { app as weatherRoute };
