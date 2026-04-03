import { useDispatch, useSelector } from 'react-redux';
import {
  loginRequest,
  registerRequest,
  forgotPasswordRequest,
  logout,
  clearMessages,
  selectUser,
  selectToken,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
  selectAuthMessage,
} from '../store/slices/authSlice';

/**
 * useAuth — convenience hook to access auth state and dispatch auth actions.
 */
export function useAuth() {
  const dispatch = useDispatch();

  return {
    // State
    user: useSelector(selectUser),
    token: useSelector(selectToken),
    isAuthenticated: useSelector(selectIsAuthenticated),
    loading: useSelector(selectAuthLoading),
    error: useSelector(selectAuthError),
    message: useSelector(selectAuthMessage),

    // Actions
    login: (credentials) => dispatch(loginRequest(credentials)),
    register: (data) => dispatch(registerRequest(data)),
    forgotPassword: (data) => dispatch(forgotPasswordRequest(data)),
    logout: () => dispatch(logout()),
    clearMessages: () => dispatch(clearMessages()),
  };
}
