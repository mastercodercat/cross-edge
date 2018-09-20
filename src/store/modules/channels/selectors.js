export const selectChannelsStore = state =>
  state.get('channels')

export const selectChannels = state =>
  state.getIn(['channels', 'channels'])

export const selectCurrentChannel = state =>
  state.getIn(['channels', 'currentChannel'])

export const selectCurrentChannelEntriesChannel = state =>
  state.getIn(['channels', 'currentChannelEntriesChannel'])

export const selectCurrentChannelEntries = state =>
  state.getIn(['channels', 'currentChannelEntries'])
