import { type StationConfig } from '../types';

const home: StationConfig = {
  iqAir: {
    station: 'bangkok/seri-village',
    latitude: '13.79318356',
    longitude: '100.6295606'
  },
  aqiIn: {
    lat: '13.779873',
    lon: '100.646009'
  }
}
const uobTower: StationConfig = {
  iqAir: {
    station: 'bangkok/benchasiri-park-benjasiri-park-khlong-toei-district',
    latitude: '13.72948982',
    longitude: '100.56840367'
  },
  air4thaiId: 'bkp119t',
  aqiIn: {
    lat: '13.743608530593239',
    lon: '100.545437465934'
  }
}

export const constants = {
  home,
  uobTower
}
