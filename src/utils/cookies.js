import Cookies from 'js-cookie';

const isProduction = import.meta.env.MODE === 'production';

const DEFAULT_OPTIONS = {
  expires: 7,
  secure: isProduction,
  sameSite: 'Strict',
};

export const cookieUtils = {
  /**
   * Set a cookie value
   * @param {string} key
   * @param {*} value — objects are JSON-stringified automatically
   * @param {object} options — overrides for DEFAULT_OPTIONS
   */
  set(key, value, options = {}) {
    const serialized = typeof value === 'object' ? JSON.stringify(value) : value;
    Cookies.set(key, serialized, { ...DEFAULT_OPTIONS, ...options });
  },

  /**
   * Get a cookie value
   * @param {string} key
   * @param {boolean} parse — set true to JSON.parse the value
   */
  get(key, parse = false) {
    const value = Cookies.get(key);
    if (!value) return null;
    if (parse) {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
    return value;
  },

  /**
   * Remove a cookie
   */
  remove(key) {
    Cookies.remove(key);
  },

  /**
   * Check if a cookie exists
   */
  exists(key) {
    return Boolean(Cookies.get(key));
  },
};

export const AUTH_COOKIE_KEY = 'auth_token';
