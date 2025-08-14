import React, { useState } from 'react';
import { Search, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchWeatherRequest, setSearchQuery, clearError } from '@/store/slices/weatherSlice';

export const WeatherSearch = () => {
  const dispatch = useAppDispatch();
  const { isLoading, recentSearches, error } = useAppSelector((state) => state.weather);
  const [inputValue, setInputValue] = useState('');

  const handleSearch = (city?: string) => {
    const searchCity = city || inputValue;
    if (searchCity.trim()) {
      dispatch(clearError());
      dispatch(fetchWeatherRequest(searchCity));
      if (!city) setInputValue('');
    }

  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent">
          Weather App
        </h1>
        <p className="text-muted-foreground">Get current weather forecast</p>
      </div>

      <div className="flex gap-2 max-w-md mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Enter city name..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10 bg-card/50 backdrop-blur-sm border-primary/20 focus:border-primary/40"
            disabled={isLoading}
          />
        </div>
        <Button 
          onClick={() => handleSearch()} 
          disabled={isLoading || !inputValue.trim()}
          className="px-6"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </div>

      {error && (
        <div className="max-w-md mx-auto p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-destructive text-sm text-center">{error}</p>
        </div>
      )}

      {recentSearches.length > 0 && (
        <div className="max-w-md mx-auto space-y-3">
          <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Clock className="h-4 w-4" />
            Recent Searches
          </h3>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((city) => (
              <Button
                key={city}
                variant="secondary"
                size="sm"
                onClick={() => handleSearch(city)}
                disabled={isLoading}
                className="text-xs"
              >
                <MapPin className="h-3 w-3 mr-1" />
                {city}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};