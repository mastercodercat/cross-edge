import { AUTH_TOKEN_LOCAL_STORAGE_ITEM } from 'config/base'


export function setItem(key, value) {
  localStorage.setItem(key, value)
}

export function getItem(key) {
  return localStorage.getItem(key)
}

export function removeItem(key) {
  localStorage.removeItem(key)
}

export function getAuthToken() {
  return getItem(AUTH_TOKEN_LOCAL_STORAGE_ITEM)
}

export function setAuthToken(token) {
  setItem(AUTH_TOKEN_LOCAL_STORAGE_ITEM, token)
}

export function clearAuthToken() {
  removeItem(AUTH_TOKEN_LOCAL_STORAGE_ITEM)
}
