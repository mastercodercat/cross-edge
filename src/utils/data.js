export const sorter = (a, b) => a > b ? 1 : (a < b ? -1 : 0)

export const isRelatedToBPM = object => (
  object.mdm_type === 'business_process' ||
  object.has_partners ||
  object.has_sites ||
  object.has_sub_sites ||
  object.has_business_processes
)

export const decodeJWT = token => {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(atob(base64))
  } catch (e) {
    return null
  }
}
