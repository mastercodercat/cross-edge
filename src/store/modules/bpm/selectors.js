export const selectBPMStore = state =>
  state.get('bpm')

export const selectHomeContent = state =>
  state.getIn(['bpm', 'homeContent'])
