import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { fetchWeatherRequest, fetchWeatherSuccess, fetchWeatherFailure } from '../slices/weatherSlice';

// OpenWeatherMap API configuration
const API_KEY = '59199ea1ee5add427df6009cca20140e';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

interface WeatherAPIResponse {
  name: string;
  sys: { country: string };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    id: number;
    description: string;
    icon: string;
  }>;
  wind: { speed: number };
  visibility: number;
}


function* fetchWeatherSaga(action: PayloadAction<string>) {
  try {
    const city = action.payload;
    
    if (!city.trim()) {
      yield put(fetchWeatherFailure('Please enter a city name'));
      return;
    }

    // Make API calls to OpenWeatherMap
    const currentResponse: WeatherAPIResponse = yield call(async () => {
      const response = await fetch(`${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`);
      if (!response.ok) throw new Error('City not found');
      return await response.json();
    });
    console.log(currentResponse)
    console.log(currentResponse.weather[0].id)

    const weatherData = {
      current: {
        id: currentResponse.weather[0].id,
        name: currentResponse.name,
        country: currentResponse.sys.country,
        temperature: Math.round(currentResponse.main.temp),
        description: currentResponse.weather[0].description,
        icon: currentResponse.weather[0].icon,
        humidity: currentResponse.main.humidity,
        windSpeed: currentResponse.wind.speed,
        feelsLike: Math.round(currentResponse.main.feels_like),
        pressure: currentResponse.main.pressure,
        visibility: currentResponse.visibility,
      },
     
    };

    yield put(fetchWeatherSuccess({current:weatherData.current,}));
  } catch (error) {
    yield put(fetchWeatherFailure('Failed to fetch weather data. Please try again.'));
  }
}

export function* watchFetchWeather() {
  yield takeEvery(fetchWeatherRequest.type, fetchWeatherSaga);
}