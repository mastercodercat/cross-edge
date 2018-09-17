// channels store selector
export const selectChannels = state =>
  state.get('channels')

// channels list selector
export const selectChannelList = state =>
  state.getIn(['channels', 'channels'])

export const selectChannelListStateLoaded = state =>
  state.getIn(['channels', 'channelsState'])

// current channel list selector
export const selectCurrentChannel = state =>
  state.getIn(['channels', 'currentChannel'])

export const selectCurrentChannelStateLoaded = state =>
  state.getIn(['channels', 'currentChannelState'])
