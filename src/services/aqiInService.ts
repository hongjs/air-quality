import { type IqAirData } from '@/types';
import axios from 'axios';

export const getByLocation = async (lat: string, lon: string): Promise<IqAirData> => {
  const config = {
    method: 'get',
    url: 'https://api.aqi.in/api/v1/getNearestLocation',
    headers: {
      'content-type': 'application/json',
      lat,
      lon
    }
  };

  const res = await axios.request(config)
  const { airComponents, timeStamp } = res.data.Locations[0];

  const usaqi = airComponents.find(x => x.sensorName === 'aqi').sensorData
  const pm25 = airComponents.find(x => x.sensorName === 'pm25').sensorData
  const temperature = airComponents.find(x => x.sensorName === 't').sensorData
  const humidity = airComponents.find(x => x.sensorName === 'h').sensorData
  return {
    type: 'location',
    source: 'Aqi.in',
    usaqi,
    pm25,
    temperature,
    humidity,
    timestamp: new Date(timeStamp * 1000)
  } satisfies IqAirData
}

export default { getByLocation }
