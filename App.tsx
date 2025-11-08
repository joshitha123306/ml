
import React, { useState, useCallback } from 'react';
import { fetchWeatherForecast } from './services/geminiService';
import type { WeatherData } from './types';
import { ForecastCard } from './components/ForecastCard';
import { LoadingSpinner } from './components/LoadingSpinner';

const App: React.FC = () => {
  const [location, setLocation] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchWeather = useCallback(async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!location.trim()) {
      setError('Please enter a location.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const data = await fetchWeatherForecast(location);
      setWeatherData(data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch weather forecast. The model may be busy. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
            AI Weather Forecaster
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            Weather insights powered by Gemini, explaining the ML behind the forecast.
          </p>
        </header>

        <main>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-gray-700">
            <form onSubmit={handleFetchWeather} className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter a city, e.g., 'Tokyo'"
                className="flex-grow bg-gray-700 text-white placeholder-gray-400 border-2 border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 duration-300 shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? 'Forecasting...' : 'Get Forecast'}
              </button>
            </form>
          </div>

          <div className="mt-8">
            {isLoading && <LoadingSpinner />}
            {error && <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">{error}</div>}
            
            {weatherData && (
              <div className="space-y-8 animate-fade-in">
                <section>
                  <h2 className="text-3xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-200">
                    7-Day Forecast for {weatherData.location}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {weatherData.forecast.map((day, index) => (
                      <ForecastCard key={index} day={day} />
                    ))}
                  </div>
                </section>

                <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-gray-700">
                  <h3 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                    How AI Predicts Weather: {weatherData.explanation.algorithm}
                  </h3>
                  <div className="prose prose-invert max-w-none text-gray-300" dangerouslySetInnerHTML={{ __html: weatherData.explanation.description }} />
                </section>
              </div>
            )}

            {!isLoading && !weatherData && !error && (
              <div className="text-center text-gray-500 pt-16">
                <p>Enter a location to see the future of weather forecasting.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
