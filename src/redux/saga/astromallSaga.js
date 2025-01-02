import { call, put, select, takeLeading } from 'redux-saga/effects'
import * as actionTypes from '../actionTypes'
import { getRequest, postRequest } from '../../utils/apiRequests'
import { api_url, get_astrolgoers_pooja, get_custoemer_booked_pooja, get_pooja, order_astrologer_pooja } from '../../config/constants'
import { showToastMessage } from '../../utils/services'
import { razorpayPayment } from '../../utils/razorpay'

function* getAstromallData() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.customer.customerData)
        const response = yield getRequest({
            url: api_url + get_pooja
        })

        const historyResponse = yield postRequest({
            url: api_url + get_custoemer_booked_pooja,
            data: {
                customerId: customerData?._id
            }
        })
        if (historyResponse?.success) {
            console.log('sdfsdfd')
            yield put({ type: actionTypes.SET_ASTROMALL_HISTORY, payload: historyResponse?.pooja })
        }

        if (response?.success) {
            const poojaData = response?.pooja.filter(item => item?.type == 'POOJA')
            const spellData = response?.pooja.filter(item => item?.type == 'SPELL')

            yield put({ type: actionTypes.SET_ASTROMALL_POOJA_DATA, payload: { poojaData, spellData } })

        }



        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getAstrologerPoojaData(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const { payload } = actions
        const response = yield postRequest({
            url: api_url + get_astrolgoers_pooja,
            data: {
                poojaId: payload
            }
        })

        console.log(response)

        if (response?.success) {
            yield put({ type: actionTypes.SET_ASTROLOGER_POOJA_DATA, payload: response?.orders })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* orderAstrologerPooja(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const { payload } = actions
        const customerData = yield select(state => state.customer.customerData)

        // const razorpayResponse = yield razorpayPayment({ amount: payload?.amount, email: customerData?.email, name: customerData?.customerName })
        // if (razorpayResponse) {
        //     const response = yield postRequest({
        //         url: api_url + order_astrologer_pooja,
        //         data: {
        //             orderId: payload?.data,
        //             customerId: customerData?._id
        //         }
        //     })
    
        //     if (response?.success) {
        //         showToastMessage({ message: response?.message })
        //     } else {
        //         showToastMessage({ message: response?.message })
        //     }
        // }else{
        //     showToastMessage({ message: 'Payment Failed' })
        // }
       

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

export default function* astromallSaga() {
    yield takeLeading(actionTypes.GET_ASTROMALL_DATA, getAstromallData);
    yield takeLeading(actionTypes.GET_ASTROLOGER_POOJA_DATA, getAstrologerPoojaData);
    yield takeLeading(actionTypes.ORDER_ASTROLOGER_POOJA, orderAstrologerPooja);
}