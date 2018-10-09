export const selectSitesStore = state =>
  state.get('sites')

export const selectSites = state =>
  state.getIn(['sites', 'sites'])
