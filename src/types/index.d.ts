export interface IqAirData {
  type: 'station' | 'location'
  usaqi: number
  pm25: number
  timestamp: Date | null
}
