export const selectPartnersStore = state =>
  state.get('partners')

export const selectPartners = state =>
  state.getIn(['partners', 'partners'])

export const selectCurrentPartner = state =>
  state.getIn(['partners', 'currentPartner'])
