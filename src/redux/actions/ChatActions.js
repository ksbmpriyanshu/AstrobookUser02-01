import * as actionTypes from '../actionTypes'

export const onChatNow = payload => ({
    type: actionTypes.ON_CHAT_NOW,
    payload,
})

export const onCallNow = payload => ({
    type: actionTypes.ON_CALL_NOW,
    payload,
})

export const getMyLinkedProfile = payload => ({
    type: actionTypes.GET_MY_LINKED_PROFILE,
    payload,
})

export const onChatRequestSend = payload => ({
    type: actionTypes.ON_CHAT_REQUEST_SEND,
    payload,
})


export const onAcceptRejectChat = payload => ({
    type: actionTypes.ON_ACCEPT_REJECT_CHAT,
    payload,
})

export const setChatTimerCountdown = payload => ({
    type: actionTypes.SET_CHAT_TIMER_COUNTDOWN,
    payload,
})

export const setChatData = payload => ({
    type: actionTypes.SET_CHAT_DATA,
    payload,
})

export const setChatRequestedData = payload => ({
    type: actionTypes.SET_CHAT_REQUESTED_DATA,
    payload,
})

export const onInitiateChat = payload => ({
    type: actionTypes.ON_INITIATE_CHAT,
    payload,
})

export const sendChatMessage = payload => ({
    type: actionTypes.SEND_CHAT_MESSAGE,
    payload,
})

export const saveChatMessage = payload => ({
    type: actionTypes.SAVE_CHAT_MESSAGE,
    payload,
})

export const onEndChat = payload => ({
    type: actionTypes.ON_END_CHAT,
    payload,
})

export const onCloseChat = payload => ({
    type: actionTypes.ON_CLOSE_CHAT,
    payload,
})

export const onChatImageSend = payload => ({
    type: actionTypes.ON_CHAT_IMAGE_SEND,
    payload,
})

export const setChatImageData = payload => ({
    type: actionTypes.SET_CHAT_IMAGE_DATA,
    payload,
})

export const setCallInvoiceVisible = payload => ({
    type: actionTypes.SET_CALL_INVOICE_VISIBLE,
    payload,
})
export const setVideoCallInvoiceVisible = payload => ({
    type: actionTypes.SET_VIDEOCALL_INVOICE_VISIBLE,
    payload,
})

export const setCallInvoiceData = payload => ({
    type: actionTypes.SET_CALL_INVOICE_DATA,
    payload,
})

export const setChatInvoiceVisible = payload => ({
    type: actionTypes.SET_CHAT_INVOICE_VISIBLE,
    payload,
})

export const setChatInvoiceData = payload => ({
    type: actionTypes.SET_CHAT_INVOICE_DATA,
    payload,
});

export const onChatCallCheck = payload => ({
    type: actionTypes.ON_CHAT_CALL_CHECK,
    payload,
})
export const getonVideoCallEnd = payload => ({
    type: actionTypes.GET_ON_VIDEO_CALL_END,
    payload
})
export const setonVideoCallEnd = payload => ({
    type: actionTypes.SET_ON_VIDEO_CALL_END,
    payload
})
export const setvideoInvoiceData = payload => ({
    type: actionTypes.SET_VIDEO_INVOICE_DATA,
    payload
})
export const getLinkedData = payload => ({
    type: actionTypes.GET_LINKED_DATA,
    payload
})
export const setLinkedData = payload => ({
    type: actionTypes.SET_LINKED_DATA,
    payload
})
