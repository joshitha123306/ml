
export interface DailyForecast {
  day: string;
  highTemp: number;
  lowTemp: number;
  condition: string;
  icon: 'SUNNY' | 'CLOUDY' | 'PARTLY_CLOUDY' | 'RAIN' | 'STORM' | 'SNOW' | 'WINDY' | 'FOGGY';
}

export interface WeatherData {
  location: string;
  forecast: DailyForecast[];
  explanation: {
    algorithm: string;
    description: string;
  };
}
