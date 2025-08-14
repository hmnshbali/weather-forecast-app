import React from 'react';
import { MapPin, Thermometer, Droplets, Wind, Eye, Gauge } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useAppSelector } from '@/hooks/redux';

export const CurrentWeather = () => {
  const { currentWeather, isLoading } = useAppSelector((state) => state.weather);

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-lg border-primary/20">
        <CardContent className="p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-48"></div>
            <div className="h-16 bg-muted rounded w-32"></div>
            <div className="h-4 bg-muted rounded w-64"></div>
            <div className="grid grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-16 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!currentWeather) {
    return null;
  }

  const weatherDetails = [
    { label: 'Feels like', value: `${currentWeather.feelsLike}°C`, icon: Thermometer },
    { label: 'Humidity', value: `${currentWeather.humidity}%`, icon: Droplets },
    { label: 'Wind Speed', value: `${currentWeather.windSpeed} m/s`, icon: Wind },
    { label: 'Pressure', value: `${currentWeather.pressure} hPa`, icon: Gauge },
    { label: 'Visibility', value: `${Math.round(currentWeather.visibility / 1000)} km`, icon: Eye },
  ];

  return (
    <Card className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-lg border-primary/20 shadow-elegant">
      <CardContent className="p-8">
        <div className="space-y-6">
          {/* City and Country */}
          <div className="flex items-center gap-2 text-xl font-semibold">
            <MapPin className="h-5 w-5 text-primary" />
            {currentWeather.name}, {currentWeather.country}
          </div>

          {/* Main Temperature */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-6xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                {currentWeather.temperature}°C
              </div>
              <div className="text-lg text-muted-foreground capitalize mt-2">
                {currentWeather.description}
              </div>
            </div>
            <img 
              src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
              alt={currentWeather.description}
              className="w-32 h-32 opacity-80"
            />
          </div>

          {/* Weather Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-border/50">
            {weatherDetails.map((detail, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                <detail.icon className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">{detail.label}</div>
                  <div className="font-semibold">{detail.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};