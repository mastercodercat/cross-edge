export const selectChannelsStore = state =>
  state.get('channels')

export const selectChannels = state =>
  state.getIn(['channels', 'channels'])

export const selectCurrentChannel = state =>
  state.getIn(['channels', 'currentChannel'])

export const selectCurrentChannelEntriesChannelId = state =>
  state.getIn(['channels', 'currentChannelEntriesChannelId'])

export const selectCurrentChannelEntries = state =>
  state.getIn(['channels', 'currentChannelEntries'])
