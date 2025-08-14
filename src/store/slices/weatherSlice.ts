import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WeatherData {
  id: number;
  name: string;
  country: string;
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  pressure: number;
  visibility: number;
}



interface WeatherState {
  currentWeather: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  recentSearches: string[];
}

const initialState: WeatherState = {
  currentWeather: null,
  isLoading: false,
  error: null,
  searchQuery: '',
  recentSearches: [],
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    fetchWeatherRequest: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
      state.error = null;
      state.searchQuery = action.payload;
    },
    fetchWeatherSuccess: (state, action: PayloadAction<{ current: WeatherData;}>) => {
      state.isLoading = false;
      state.currentWeather = action.payload.current;
      state.error = null;
      
      // Add to recent searches if not already present
      if (!state.recentSearches.includes(action.payload.current.name)) {
        state.recentSearches = [action.payload.current.name, ...state.recentSearches.slice(0, 4)];
      }
    },
    fetchWeatherFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  fetchWeatherRequest,
  fetchWeatherSuccess,
  fetchWeatherFailure,
  clearError,
  setSearchQuery,
} = weatherSlice.actions;

export default weatherSlice.reducer;