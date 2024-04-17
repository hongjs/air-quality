import { type IqAirData } from '@/types';
import axios from 'axios';

export const getAllData = async (stationId: string): Promise<IqAirData> => {
  const res = await axios.get(process.env.AIR4THAI_SITE ?? '');
  const data = res?.data?.stations?.find(x => x.stationID === stationId) ?? {};
  return {
    type: 'station',
    usaqi: Number(data.AQILast.PM25.aqi),
    pm25: Number(data.AQILast.PM25.value),
    temperature: 0,
    humidity: 0,
    timestamp: new Date(`${data.AQILast.date} ${data.AQILast.time}`)
  } satisfies IqAirData
}
