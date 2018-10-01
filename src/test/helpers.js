export const mockPagination = {
  total: 0,
  current: 1,
  pageSize: 10,
  onChange: e => e,
}

export function changeInputValue(inputWrapper, value) {
  inputWrapper.getDOMNode().value = value
  inputWrapper.simulate('change', inputWrapper)
}
