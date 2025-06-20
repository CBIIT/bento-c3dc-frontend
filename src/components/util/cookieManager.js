/**
 * Sets a cookie with the given name, value, expiration time in seconds, and path.
 * @param {string} name 
 * @param {string} value 
 * @param {number} seconds 
 * @param {string} path 
 */
export function setCookie(name, value, seconds = 60 * 60 * 24, path = '/') {
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${seconds}; path=${path}`;
}

/**
 * Retrieves the value of a cookie by name.
 * @param {string} name 
 * @returns {string|null} The cookie value or null if not found
 */
export function getCookie(name) {
  const matchingCookie = document.cookie.split('; ').find(row => row.startsWith(name + '='));
  return matchingCookie ? matchingCookie.split('=')[1] : null;
}