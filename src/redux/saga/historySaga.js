import { put, select, takeLeading } from 'redux-saga/effects'
import * as actionTypes from '../actionTypes'
import { postRequest } from '../../utils/apiRequests'
import { api_url, customers_call_history, customers_chat_history, customers_video_history, customers_wallet_history, get_customer_live_calls } from '../../config/constants'

function* getChatHistory() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const customerData = yield select(state => state.customer.customerData)

        const response = yield postRequest({
            url: api_url + customers_chat_history,
            data: {
                customerId: customerData?._id
            }
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_CHAT_HISTORY, payload: response?.chatHistory })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}
function* getCallHistory() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.customer.customerData)
        const response = yield postRequest({
            url: api_url + customers_call_history,
            data: {
                customerId: customerData?._id
            }
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_CALL_HISTORY, payload: response?.history })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}
function* getLiveVedioCallHistory() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.customer.customerData)

        const response = yield postRequest({
            url: api_url + get_customer_live_calls,
            data: {
                customerId: customerData?._id
            }
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_LIVE_VEDIO_CALL_HISTORY, payload: response?.history })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getCustomerWalletHistory() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.customer.customerData)

        const response = yield postRequest({
            url: api_url + customers_wallet_history,
            data: {
                customerId: customerData?._id
            }
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_WALLET_HISTORY, payload: response?.walletHistory })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}
function* getVideoCallHistory() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.customer.customerData)
        const response = yield postRequest({
            url: api_url + customers_video_history,
            data: {
                customerId: customerData?._id
            }
        })
        if (response?.success) {
            yield put({ type: actionTypes.SET_VIDEO_CALL_HISTORY, payload: response?.results })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

export default function* historySaga() {
    yield takeLeading(actionTypes.GET_CHAT_HISTORY, getChatHistory) 
    yield takeLeading(actionTypes.GET_CALL_HISTORY, getCallHistory)
    yield takeLeading(actionTypes.GET_LIVE_VEDIO_CALL_HISTORY, getLiveVedioCallHistory)
    yield takeLeading(actionTypes.GET_WALLET_HISTORY, getCustomerWalletHistory)
    yield takeLeading(actionTypes.GET_VIDEO_CALL_HISTORY, getVideoCallHistory)
}