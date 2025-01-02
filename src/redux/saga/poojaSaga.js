import { call, put, select, takeLatest, takeLeading } from 'redux-saga/effects';
import { getRequest, postRequest } from '../../utils/apiRequests';
import * as actionTypes from '../actionTypes';
import { api_url, book_pooja, customer_home_banner, get_all_pooja_list, get_call_astrologer, get_chat_astrologer, get_new_pooja, get_new_pooja_category, get_pooja, get_puja_history_data, get_video_call_astrologer, payment_book_puja_payment, puja_booked_history } from '../../config/constants';
import { navigate } from '../../NavigationService';
import { razorpayPayment } from '../../utils/razorpay';
import { Alert } from 'react-native';
import { showToastMessage } from '../../utils/services';

function* getHomeData(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const poojaDataResponse = yield getRequest({
            url: api_url + get_pooja,
        })

        console.log("222", poojaDataResponse)
        if (poojaDataResponse?.success) {
            yield put({ type: actionTypes.SET_POOJA_DATA, payload: poojaDataResponse?.pooja })
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        console.log('hii', e);
    }
}

function* getNewPoojaData(actions) {
    try {
        const { payload } = actions
        console.log("payload", payload)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        console.log(`${api_url}ecommerce/get_verified_puja_filter?categoryId=${payload?.categoryId}`)
        const poojaDataResponse = yield getRequest({
            url: `${api_url}ecommerce/get_verified_puja_filter?categoryId=${payload?.categoryId}`
            // url: api_url + get_new_pooja,
        })
        console.log("2222", poojaDataResponse)

        if (poojaDataResponse?.success) {
            yield put({ type: actionTypes.SET_NEW_POOJA_DATA, payload: poojaDataResponse?.results })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        console.log('hii', e);
    }
}

// function* getAllPoojaList(actions){
//     try {
//         const { payload } = actions
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
//         const poojaListResponse = yield getRequest({
//             url: api_url + get_all_pooja_list,
//         })
//         console.log("first1111",poojaListResponse)

//         if (poojaListResponse?.success) {
//             yield put({ type: actionTypes.SET_ALL_POOJA_LIST, payload: poojaListResponse?.pooja })
//         }

//     } catch (e) {
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
//         console.log('hii', e);
//     }

// }


function* getBookPooja(actions) {
    console.log("action", actions)
    try {
        const { BookPujaData, customerData } = actions.payload
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const bookedResponse = yield postRequest({
            url: api_url + book_pooja,
            data: BookPujaData
        })
        console.log("bookedResponse", bookedResponse)
        if (bookedResponse?.success) {
            yield put({ type: actionTypes.SET_BOOK_POOJA, payload: bookedResponse?.pooja })
            // Alert.alert("AstroBook", "PoojaBooed....")
            // const razorpayResponse = yield razorpayPayment({ amount: bookedResponse?.order?.price, email: customerData?.email, contact: customerData?.phoneNumber, name: customerData?.customerName })
            // console.log("razrp", razorpayResponse)
            // if (razorpayResponse) {
            //     call(navigate, 'Home');
            //     console.log("payment", "true");
            // }
            // yield put({ type: actionTypes.OPEN_MODAL });
            // console.log("OPEN_MODAL",actionTypes.OPEN_MODAL )
        } else {
            Alert.alert("Astro Remedy", bookedResponse?.message);
        }

    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        console.log('hii', e);
    }
}

function* getBookPoojaHistoryData(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const Response = yield postRequest({
            url: api_url + get_puja_history_data,
            data: { customerId: actions.payload._id }
        })
        console.log("111222", Response)
        if (Response?.success) {
            yield put({ type: actionTypes.SET_BOOK_POOJA_HISTORY_DATA, payload: Response?.results })
        } else {
            // Alert.alert("Astro Remedy", Response?.message);
            // showToastMessage({ message: Response?.message })
        }
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        console.log('hii', e);
    }
}
function* getNewPoojaCategoryData(actions) {
    console.log("actions", actions)
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const poojaDataResponse = yield getRequest({
            url: api_url + get_new_pooja_category,
        })
        console.log("2222:>>>>>>", poojaDataResponse)

        if (poojaDataResponse?.success) {
            yield put({ type: actionTypes.SET_POOJA_CATEGORY_DATA, payload: poojaDataResponse?.results })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        console.log('hii', e);
    }
}

function* getBookpujapaymentData(actions) {
    try {
        const { payload } = actions
        console.log("payload", payload)
        const customerData = yield select(state => state.customer.customerData)
        const razorpayResponse = yield razorpayPayment({ amount: payload?.price, email: customerData?.email, contact: customerData?.phoneNumber, name: customerData?.customerName })
        console.log("razrp", razorpayResponse)
        if (razorpayResponse && Object.keys(razorpayResponse).length > 0) {


            const data = {
                customerId: payload?.customerId,
                astrologerId: payload?.astrologerId,
                amount: payload?.price,
                pujaId: payload?.pujaId,
                pujaDate: payload?.pujaDate,
                pujaTime: payload?.pujaTime,
                duration: payload?.duration,
                price: payload?.price,
                adminCommission: payload?.adminCommission,
                paymentId: razorpayResponse?.razorpay_payment_id
            }
            console.log("anujjjj", data)

            const pujaPaymentResponse = yield postRequest({
                url: api_url + payment_book_puja_payment,
                data: data
            })
            console.log("pujaPaymentResponse", pujaPaymentResponse)
            call(navigate, 'home');




        }
    } catch (e) {

        console.log('fourth')
        console.log(e)
    }
}


function* gethistorypuja(actions) {
    console.log("action", actions)
    try {
        const customerData = yield select(state => state.customer.customerData)
        const historyPujaData = {
            customerId: customerData?._id

        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const historyPujaDataresponse = yield postRequest({
            url: api_url + puja_booked_history,
            data: historyPujaData
        })
        console.log("historyPujaDataresponse", historyPujaDataresponse?.results)
        if (historyPujaDataresponse?.success) {
            yield put({ type: actionTypes.SET_HISTORY_PUJA_DATA, payload: historyPujaDataresponse?.results })
            // showToastMessage({ message: historyPujaData?.message })

        } else {
            // Alert.alert("AstroBook", historyPujaData?.message);
        }

    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        console.log('hii', e);
    }
}




export default function* poojaSaga() {
    yield takeLeading(actionTypes.GET_HOME_DATA, getHomeData);
    yield takeLeading(actionTypes.GET_NEW_POOJA_DATA, getNewPoojaData);
    yield takeLeading(actionTypes.GET_BOOK_POOJA, getBookPooja)
    yield takeLeading(actionTypes.GET_BOOK_POOJA_HISTORY_DATA, getBookPoojaHistoryData)
    yield takeLeading(actionTypes.GET_POOJA_CATEGORY_DATA, getNewPoojaCategoryData);
    yield takeLeading(actionTypes.GET_POOJA_PAYMENT_DATA, getBookpujapaymentData);
    yield takeLeading(actionTypes.GET_HISTORY_PUJA_DATA, gethistorypuja);
}