
import React from 'react';
import type { DailyForecast } from '../types';
import { WeatherIcon } from './WeatherIcon';

interface ForecastCardProps {
  day: DailyForecast;
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ day }) => {
  return (
    <div className="bg-gray-800/60 backdrop-blur-md rounded-xl p-4 text-center border border-gray-700 flex flex-col items-center justify-between shadow-lg hover:bg-gray-700/80 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1">
      <p className="font-bold text-lg text-gray-200">{day.day.substring(0, 3)}</p>
      <div className="my-3">
        <WeatherIcon icon={day.icon} className="w-12 h-12 text-yellow-300" />
      </div>
      <div className="text-sm">
        <p className="font-semibold text-white">{day.highTemp}°</p>
        <p className="text-gray-400">{day.lowTemp}°</p>
      </div>
    </div>
  );
};
