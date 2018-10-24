export const selectBusinessProcessesStore = state =>
  state.get('businessProcesses')

export const selectBusinessProcesses = state =>
  state.getIn(['businessProcesses', 'businessProcesses'])

export const selectCurrentBusinessProcess = state =>
  state.getIn(['businessProcesses', 'currentBusinessProcess'])

export const selectSubmitDataState = state =>
  state.getIn(['businessProcesses', 'submitDataState'])
