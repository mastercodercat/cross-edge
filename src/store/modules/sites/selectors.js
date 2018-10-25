export const selectSitesStore = state =>
  state.get('sites')

export const selectSites = state =>
  state.getIn(['sites', 'sites'])

export const selectCurrentSite = state =>
  state.getIn(['sites', 'currentSite'])

export const selectSubsites = state =>
  state.getIn(['sites', 'subsites'])

export const selectCurrentSubsite = state =>
  state.getIn(['sites', 'currentSubsite'])
