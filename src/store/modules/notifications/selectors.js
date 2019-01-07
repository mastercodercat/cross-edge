export const selectNotificationsStore = state =>
  state.get('notifications')

export const selectNotifications = state =>
  state.getIn(['notifications', 'notifications'])

export const selectNotificationsChanged = state =>
  state.getIn(['notifications', 'notificationsChangedByLastLoad'])
