// channels store selector

export const selectChannels = state =>
  state.get('channels')

// channels list selector

export const selectChannelList = state =>
  state.getIn(['channels', 'channels'])

export const selectChannelListState = state =>
  state.getIn(['channels', 'channelsState'])

// current channel selector

export const selectCurrentChannel = state =>
  state.getIn(['channels', 'currentChannel'])

export const selectCurrentChannelState = state =>
  state.getIn(['channels', 'currentChannelState'])

// current channel entries selector

export const selectCurrentChannelEntriesChannelId = state =>
  state.getIn(['channels', 'currentChannelEntriesChannelId'])

export const selectCurrentChannelEntries = state =>
  state.getIn(['channels', 'currentChannelEntries'])

export const selectCurrentChannelEntriesState = state =>
  state.getIn(['channels', 'currentChannelEntriesState'])

export const selectCurrentChannelEntriesPage = state =>
  state.getIn(['channels', 'currentChannelEntriesPage'])

export const selectCurrentChannelEntriesPageSize = state =>
  state.getIn(['channels', 'currentChannelEntriesPageSize'])

export const selectCurrentChannelEntriesCount = state =>
  state.getIn(['channels', 'currentChannelEntriesCount'])
