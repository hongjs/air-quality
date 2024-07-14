export interface IqAirData {
  type: 'station' | 'location'
  source: 'IQAir' | 'Air4Thai' | 'Aqi.in'
  usaqi: number
  pm25: number
  temperature: number
  humidity: number
  timestamp: Date | null
}

export interface AqiInConfig {
  lat: string
  lon: string
}

export interface IqAirConfig {
  station: string
  latitude: string
  longitude: string
}

export interface StationConfig {
  iqAir?: IqAirConfig
  air4thaiId?: string
  aqiIn?: AqiInConfig
}
