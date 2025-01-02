import * as actionTypes from '../actionTypes';


export const setLiveId = payload => ({
  type: actionTypes.SET_LIVE_ID,
  payload,
});


export const createLiveProfile = payload => ({
  type: actionTypes.CREATE_LIVE_PROFILE,
  payload,
});

export const addLiveListener = payload => ({
  type: actionTypes.ADD_LIVE_LISTENER,
  payload,
});

export const sendComments = payload => ({
  type: actionTypes.SEND_COMMENTS,
  payload,
});

export const setComments = payload => ({
  type: actionTypes.SET_COMMENTS,
  payload,
});

export const clearComments = payload => ({
  type: actionTypes.CLEAR_COMMENTS,
  payload,
});

export const setGiftData = payload => ({
  type: actionTypes.SET_GIFT_DATA,
  payload,
});

export const setGiftVisible = payload => ({
  type: actionTypes.SET_GIFT_VISIBLE,
  payload,
});

export const getGiftData = payload => ({
  type: actionTypes.GET_GIFT_DATA,
  payload,
});

export const sendGiftToAstrologer = payload => ({
  type: actionTypes.SEND_GIFT_TO_ASTROLOGER,
  payload,
});

export const addHeart = payload => ({
  type: actionTypes.ADD_HEART,
  payload,
});

export const removeHeart = payload => ({
  type: actionTypes.REMOVE_HEART,
  payload,
});

export const setHearts = payload => ({
  type: actionTypes.SET_HEARTS,
  payload,
});

export const setExitAlertVisible = payload => ({
  type: actionTypes.SET_EXIT_ALERT_VISIBLE,
  payload,
});

export const setIsLiveStart = payload => ({
  type: actionTypes.SET_IS_LIVE_START,
  payload,
});

export const setRoomUserCount = payload => ({
  type: actionTypes.SET_ROOM_USER_COUNT,
  payload,
});

export const setLiveCallsVisible = payload => ({
  type: actionTypes.SET_LIVE_CALLS_VISIBLE, 
  payload,
});

export const setWatingListVisible = payload => ({
  type: actionTypes.SET_WAITING_LIST_VISIBLE,
  payload,
});

export const addInWaitingList = payload => ({
  type: actionTypes.ADD_IN_WAITING_LIST,
  payload,
});

export const setWaitListData = payload => ({
  type: actionTypes.SET_WAITLIST_DATA,
  payload,
});

export const setCoHostRequestVisible = payload => ({
  type: actionTypes.SET_CO_HOST_REQUEST_VISIBLE,
  payload,
});

export const setIsCoHost = payload => ({
  type: actionTypes.SET_IS_CO_HOST,
  payload,
});

export const setStreamId = payload => ({
  type: actionTypes.SET_STREAMING_ID,
  payload,
});

export const onGoLive = payload => ({
  type: actionTypes.ON_GO_LIVE,
  payload,
});

export const setLayout = payload => ({
  type: actionTypes.SET_LAYOUT,
  payload,
});

export const resetLiveState = payload => ({
  type: actionTypes.RESET_LIVE_STATE,
  payload,
});

export const setCoHostData = payload => ({
  type: actionTypes.SET_CO_HOST_DATA,
  payload,
});

export const onEndCalling = payload => ({
  type: actionTypes.ON_END_CALLING,
  payload,
});

export const setGiftedData = payload => ({
  type: actionTypes.SET_GIFTED_DATA,
  payload,
})

export const onCancelCallRequest = payload => ({
  type: actionTypes.ON_CANCEL_CALL_REQUEST,
  payload,
})

export const setLiveAstroData = payload => ({
  type: actionTypes.SET_LIVE_ASTRO_DATA,
  payload,
})

export const onWalletRecharge = payload => ({
  type: actionTypes.ON_WALLET_RECHARGE,
  payload,
})

export const setLiveData = payload => ({
  type: actionTypes.SET_LIVE_DATA,
  payload,
})

export const addHeartByOthers = payload => ({
  type: actionTypes.ADD_HEART_BY_OTHERS,
  payload,
})

export const onStreamUpdate = payload => ({
  type: actionTypes.ON_STREAM_UPDATE,
  payload,
});

export const setCallInfoVisible = payload => ({
  type: actionTypes.SET_CALL_INFO_VISIBLE,
  payload,
})

export const setLiveInvoiceVisible = payload => ({
  type: actionTypes.SET_LIVE_INVOICE_VISIBLE,
  payload,
})

export const onLiveMuteUnmute = payload => ({
  type: actionTypes.ON_LIVE_MUTE_UNMUTE,
  payload,
})

export const setLiveIsMute = payload => ({
  type: actionTypes.SET_LIVE_IS_MUTE,
  payload,
})


export const onAppStateChangeInLive = payload => ({
  type: actionTypes.ON_APP_STATE_CHANGE_IN_LIVE,
  payload,
})


