
import React from 'react';
import type { DailyForecast } from '../types';

interface WeatherIconProps {
  icon: DailyForecast['icon'];
  className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ icon, className }) => {
  const iconMap: Record<DailyForecast['icon'], React.ReactNode> = {
    SUNNY: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-6.364-.386 1.591-1.591M3 12h2.25m.386-6.364 1.591 1.591M12 12a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
      </svg>
    ),
    CLOUDY: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a4.5 4.5 0 0 0 4.5-4.5V8.25a4.5 4.5 0 0 0-4.5-4.5H9.75a4.5 4.5 0 0 0-4.5 4.5V15Z" />
      </svg>
    ),
    PARTLY_CLOUDY: (
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.375 2.25 12c0-2.849 2.028-5.233 4.753-5.711A4.51 4.51 0 0 1 12.25 6.5a4.51 4.51 0 0 1 5.247.289 4.5 4.5 0 0 1 4.253 5.922M2.25 15.375a4.5 4.5 0 0 0 4.5 4.5H18a4.5 4.5 0 0 0 4.5-4.5" />
      </svg>
    ),
    RAIN: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h.375a3.375 3.375 0 0 1 3.375 3.375v.375m0-3.75-3.75.75" />
      </svg>
    ),
    STORM: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
    SNOW: (
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m-4.243-4.243L12 12l4.243 4.243m-8.486-8.486L12 12l4.243-4.243m-4.243 0L12 12l-4.243-4.243m8.486 8.486L12 12l-4.243 4.243" />
      </svg>
    ),
    WINDY: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
      </svg>
    ),
    FOGGY: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.375a4.5 4.5 0 0 1 4.5-4.5h10.5a4.5 4.5 0 0 1 0 9H6.75a4.5 4.5 0 0 1-4.5-4.5Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25a4.5 4.5 0 0 1 4.5-4.5h10.5a4.5 4.5 0 0 1 0 9H7.5" />
      </svg>
    ),
  };

  return iconMap[icon] || null;
};
