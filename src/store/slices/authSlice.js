import { createSlice } from '@reduxjs/toolkit';
import { fromJS } from 'immutable';
import Cookies from 'js-cookie';

// ---------------------------------------------------------------------------
// Initial state using fromJS (Immutable.js Map)
// We store it as a plain JS object in Redux; use fromJS() in selectors/sagas
// when you need Immutable operations.
// ---------------------------------------------------------------------------
const initialState = fromJS({
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  message: null,
}).toJS();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // ── Login ──────────────────────────────────────────────────────────────
    loginRequest(state, action) {
      return fromJS(state).merge({ loading: true, error: null }).toJS();
    },
    loginSuccess(state, action) {
      const { user, token } = action.payload;
      return fromJS(state)
        .merge({ user, token, isAuthenticated: true, loading: false, error: null })
        .toJS();
    },
    loginFailure(state, action) {
      return fromJS(state)
        .merge({ loading: false, error: action.payload, isAuthenticated: false })
        .toJS();
    },

    // ── Register ───────────────────────────────────────────────────────────
    registerRequest(state) {
      return fromJS(state).merge({ loading: true, error: null, message: null }).toJS();
    },
    registerSuccess(state, action) {
      return fromJS(state)
        .merge({ loading: false, message: action.payload })
        .toJS();
    },
    registerFailure(state, action) {
      return fromJS(state).merge({ loading: false, error: action.payload }).toJS();
    },

    // ── Forgot Password ────────────────────────────────────────────────────
    forgotPasswordRequest(state) {
      return fromJS(state).merge({ loading: true, error: null, message: null }).toJS();
    },
    forgotPasswordSuccess(state, action) {
      return fromJS(state)
        .merge({ loading: false, message: action.payload })
        .toJS();
    },
    forgotPasswordFailure(state, action) {
      return fromJS(state).merge({ loading: false, error: action.payload }).toJS();
    },

    // ── Logout ─────────────────────────────────────────────────────────────
    logout(state) {
      Cookies.remove('auth_token');
      return fromJS(initialState).toJS();
    },

    // ── Restore session from cookie ────────────────────────────────────────
    restoreSession(state) {
      const token = Cookies.get('auth_token');
      if (token) {
        return fromJS(state)
          .merge({ token, isAuthenticated: true })
          .toJS();
      }
      return state;
    },

    // ── Clear messages ─────────────────────────────────────────────────────
    clearMessages(state) {
      return fromJS(state).merge({ error: null, message: null }).toJS();
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  logout,
  restoreSession,
  clearMessages,
} = authSlice.actions;

// ── Selectors ──────────────────────────────────────────────────────────────
export const selectAuth = (state) => fromJS(state.auth);
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthMessage = (state) => state.auth.message;

export default authSlice.reducer;
