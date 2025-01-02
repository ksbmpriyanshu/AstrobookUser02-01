import * as actionTypes from '../actionTypes'

export const getChatHistory = payload => ({
    type: actionTypes.GET_CHAT_HISTORY,
    payload,
})

export const setChatHistory = payload => ({
    type: actionTypes.SET_CHAT_HISTORY,
    payload,
})

export const getCallHistory = payload => ({
    type: actionTypes.GET_CALL_HISTORY,
    payload,
})

export const setCallHistory = payload => ({
    type: actionTypes.SET_CALL_HISTORY,
    payload,
})

export const getLiveVedioCallHistory = payload => ({
    type: actionTypes.GET_LIVE_VEDIO_CALL_HISTORY,
    payload,
})

export const setLiveVedioCallHistory = payload => ({
    type: actionTypes.SET_LIVE_VEDIO_CALL_HISTORY,
    payload,
})

export const getWalletHistory = payload => ({
    type: actionTypes.GET_WALLET_HISTORY,
    payload,
  })
  
  export const setWalletHistory = payload => ({
    type: actionTypes.SET_WALLET_HISTORY,
    payload,
  })
  export const getVideoCallHistory = payload => ({
    type: actionTypes.GET_VIDEO_CALL_HISTORY,
    payload,
  })
  export const setVideoCallHistory = payload => ({
    type: actionTypes.SET_VIDEO_CALL_HISTORY,
    payload,
  })