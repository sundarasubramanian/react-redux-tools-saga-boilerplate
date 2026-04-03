import { call, put, takeLatest } from 'redux-saga/effects';
import Cookies from 'js-cookie';
import { authApi } from 'utils/api';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,
} from '../slices/authSlice';

// Cookie config — adjust expires (days) and secure flag per environment
const COOKIE_OPTIONS = {
  expires: 7,           // 7 days
  secure: import.meta.env.MODE === 'production',
  sameSite: 'Strict',
};

// ── Login Saga ──────────────────────────────────────────────────────────────
function* handleLogin(action) {
  try {
    const { email, password } = action.payload;
    const response = yield call(authApi.login, { email, password });

    const { user, token } = response.data;

    // Persist token in cookie
    Cookies.set('auth_token', token, COOKIE_OPTIONS);

    yield put(loginSuccess({ user, token }));
  } catch (error) {
    const message =
      error?.response?.data?.message || 'Login failed. Please check your credentials.';
    yield put(loginFailure(message));
  }
}

// ── Register Saga ───────────────────────────────────────────────────────────
function* handleRegister(action) {
  try {
    const { name, email, password } = action.payload;
    yield call(authApi.register, { name, email, password });

    yield put(registerSuccess('Account created! Please check your email to verify.'));
  } catch (error) {
    const message =
      error?.response?.data?.message || 'Registration failed. Please try again.';
    yield put(registerFailure(message));
  }
}

// ── Forgot Password Saga ────────────────────────────────────────────────────
function* handleForgotPassword(action) {
  try {
    const { email } = action.payload;
    yield call(authApi.forgotPassword, { email });

    yield put(
      forgotPasswordSuccess('If that email is registered, a reset link has been sent.')
    );
  } catch (error) {
    const message =
      error?.response?.data?.message || 'Something went wrong. Please try again.';
    yield put(forgotPasswordFailure(message));
  }
}

// ── Watcher Saga ────────────────────────────────────────────────────────────
export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(registerRequest.type, handleRegister);
  yield takeLatest(forgotPasswordRequest.type, handleForgotPassword);
}
