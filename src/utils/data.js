export const sorter = (a, b) => a > b ? 1 : (a < b ? -1 : 0)

export const isRelatedToBPM = object => (
  object.mdm_type === 'business_process' ||
  object.has_partners ||
  object.has_sites ||
  object.has_sub_sites ||
  object.has_business_processes
)
