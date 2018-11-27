export const ADEPT_EDGE_PREFIX = 'adept_edge'

export const AUTH_TOKEN_LOCAL_STORAGE_ITEM = `${ADEPT_EDGE_PREFIX}_auth_token`

export const AUTH_EMAIL_LOCAL_STORAGE_ITEM = `${ADEPT_EDGE_PREFIX}_auth_email`

export const API_BACK_END_URL = process.env.REACT_APP_API_URL

export const API_BASE_URL = `${API_BACK_END_URL}/api/v1`

export const DEFAULT_PAGE_SIZE = 10

export const ICONS_BY_MDM_TYPES = {
  subscriber: 'user-tie',
  partner: 'user',
  site: 'map-marker-alt',
  subsite: 'map-pin',
  businessProcess: 'barcode-read',
}

export const ICON_PREFIXES_BY_MDM_TYPES = {
  subscriber: 'fa',
  partner: 'fa',
  site: 'fa',
  subsite: 'fa',
  businessProcess: 'fa',
}
