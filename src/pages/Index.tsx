import React from 'react';
import { WeatherSearch } from '@/components/WeatherSearch';
import { CurrentWeather } from '@/components/CurrentWeather';
import { useAppSelector } from '@/hooks/redux';

const Index = () => {
  const { currentWeather } = useAppSelector((state) => state.weather);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <WeatherSearch />
        {currentWeather && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <CurrentWeather />
          </div>
        )}
        {!currentWeather && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 opacity-50">🌤️</div>
            <p className="text-muted-foreground">Search for a city to see the weather</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;