// channels store selector
export const selectChannels = state => state.get('channels')

// channels list selector
export const selectChannelList = state => state.getIn(['channels', 'channels'])

export const selectChannelListStateLoaded = state => state.getIn(['channels', 'channelsState'])
