export interface IqAirData {
  type: 'station' | 'location'
  usaqi: number
  pm25: number
  temperature: number
  humidity: number
  timestamp: Date | null
}

export interface StationConfig {
  station: string
  latitude: string
  longitude: string
}
