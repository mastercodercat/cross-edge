export const required = value =>
  (
    !value ||
    (value.constructor === Array && !value.length)
  ) ?
  undefined :
  'Required'
