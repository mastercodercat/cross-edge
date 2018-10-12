export const selectSitesStore = state =>
  state.get('sites')

export const selectSites = state =>
  state.getIn(['sites', 'sites'])

export const selectCurrentSite = state =>
  state.getIn(['sites', 'currentSite'])

export const selectSiteSubsites = state =>
  state.getIn(['sites', 'siteSubsites'])
