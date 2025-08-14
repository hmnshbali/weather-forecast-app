import { all } from 'redux-saga/effects';
import { watchFetchWeather } from './weatherSaga';

export default function* rootSaga() {
  yield all([
    watchFetchWeather(),
  ]);
}