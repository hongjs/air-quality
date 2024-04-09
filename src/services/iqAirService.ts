import { JSDOM } from 'jsdom';
import { type IqAirData } from 'types';

export const getByStaion = async (station: string): Promise<IqAirData> => {
  const res = await fetch(`${process.env.TARGET_SITE}/${station}`)
  const html = await res.text();

  const dom = new JSDOM(html);

  // US AQI
  const aqiElement = dom.window.document.querySelector('.aqi-value__value')
  const usaqi = Number(aqiElement?.textContent?.trim() ?? 0);

  // PM 2.5
  const pm25Element = dom.window.document.querySelector('.pollutant-concentration-value')
  const pm25 = Number(pm25Element?.textContent?.trim() ?? 0);

  // timestamp
  const tsElement = dom.window.document.querySelector('.timestamp__wrapper');
  const timeElement = tsElement?.querySelector('time');
  const tsValue = timeElement?.getAttribute('datetime');
  const timestamp = tsValue ? new Date(tsValue) : null

  // temperature & humidity
  const { temperature, humidity } = findTemperatureAndhumidity(dom);

  return { usaqi, pm25, temperature, humidity, timestamp, type: 'station' };
}

const findTemperatureAndhumidity = (dom: JSDOM): { temperature: number, humidity: number } => {
  let temperature = 0;
  let humidity = 0;

  const weatherDetailDiv = dom.window.document.querySelector('div.weather__detail');

  if (weatherDetailDiv) {
    const table = weatherDetailDiv.querySelector('table');

    const tableRows = table?.querySelectorAll('tr') ?? [];
    for (const row of tableRows) {
      const _temperature = getCellValue(row, 'Temperature');
      if (_temperature && _temperature.endsWith('°C')) {
        temperature = Number(_temperature.replace('°C', ''));
      }
      const _humidity = getCellValue(row, 'Humidity');
      if (_humidity && _humidity.endsWith('%')) {
        humidity = Number(_humidity.replace('%', ''));
      }
    }
  }

  return { temperature, humidity }
}

const getCellValue = (row: HTMLTableRowElement, columnName: 'Temperature' | 'Humidity'): string | undefined => {
  const firstCell = row.querySelector('td:first-child');
  if (firstCell?.textContent?.trim() === columnName) {
    const temperatureCell = row.querySelector('td:last-child');
    const temperatureValue = temperatureCell?.textContent?.trim();
    return temperatureValue ?? '';
  }
}

export const getByLocation = async (lat: string, lon: string): Promise<IqAirData> => {
  const res = await fetch(`http://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${process.env.WAQI_TOKEN}`)
  const json = await res.text();
  const obj = JSON.parse(json);

  const usaqi = Number(obj?.data?.current?.pollution?.aqius ?? 0)
  const temperature = Number(obj?.data?.current?.weather?.tp ?? 0)
  const humidity = Number(obj?.data?.current?.weather?.hu ?? 0)
  const timestamp = obj?.data?.current?.pollution?.ts

  return { usaqi, pm25: 0, temperature, humidity, timestamp, type: 'location' };
}
