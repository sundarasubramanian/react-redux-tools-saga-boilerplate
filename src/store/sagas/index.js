import { all } from 'redux-saga/effects';
import authSaga from '../sagas/authSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    // Register more feature sagas here
  ]);
}
