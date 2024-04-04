import { JSDOM } from 'jsdom';
import { type IqAirData } from 'types';

export const getByStaion = async (station: string): Promise<IqAirData> => {
  const res = await fetch(`${process.env.TARGET_SITE}/${station}`)
  const html = await res.text();

  const dom = new JSDOM(html);
  const aqiElement = dom.window.document.querySelector('.aqi-value__value')
  const pm25Element = dom.window.document.querySelector('.pollutant-concentration-value')
  const tsElement = dom.window.document.querySelector('.timestamp__wrapper');
  const timeElement = tsElement?.querySelector('time');
  const tsValue = timeElement?.getAttribute('datetime');

  const usaqi = Number(aqiElement?.textContent?.trim() ?? 0);
  const pm25 = Number(pm25Element?.textContent?.trim() ?? 0);
  const timestamp = tsValue ? new Date(tsValue) : null

  return { usaqi, pm25, timestamp, type: 'station' };
}

export const getByLocation = async (lat: string, lon: string): Promise<IqAirData> => {
  const res = await fetch(`http://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${process.env.WAQI_TOKEN}`)
  const json = await res.text();
  const obj = JSON.parse(json);

  const usaqi = Number(obj?.data?.current?.pollution?.aqius ?? 0)
  const timestamp = obj?.data?.current?.pollution?.ts

  return { usaqi, pm25: 0, timestamp, type: 'location' };
}
