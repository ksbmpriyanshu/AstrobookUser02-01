import { call, put, select, takeLatest, takeLeading } from 'redux-saga/effects';
import { getRequest, postRequest } from '../../utils/apiRequests';
import * as actionTypes from '../actionTypes';
import { api_url, customer_home_banner, get_active_astrologer, get_all_blogs, get_astro_companion, get_call_astrologer, get_chat_astrologer, get_delete_account_data, get_notification_data, get_testimonial_customer, get_video_call_astrologer, my_order_astrologer } from '../../config/constants';
import { showToastMessage } from '../../utils/services';
import { resetToScreen } from '../../navigations/NavigationServices';

function* getHomeData(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: true })

        const bannerResponse = yield getRequest({
            url: api_url + customer_home_banner,
        })

        const callResponse = yield getRequest({
            url: api_url + get_call_astrologer,

        })

        const chatResponse = yield getRequest({
            url: api_url + get_chat_astrologer,
        })

        const videoResponse = yield getRequest({
            url: api_url + get_video_call_astrologer,

        })

        if (bannerResponse?.success) {
            yield put({ type: actionTypes.SET_HOME_BANNER, payload: bannerResponse?.banners })
        }

        if (callResponse?.success) {
            yield put({ type: actionTypes.SET_CALL_ASTROLOGER, payload: callResponse?.results })
        }

        if (chatResponse?.success) {
            yield put({ type: actionTypes.SET_CHAT_ASTROLOGER, payload: chatResponse?.results })
        }

        if (videoResponse?.success) {
            yield put({ type: actionTypes.SET_VIDEO_CALL_ASTROLOGER, payload: videoResponse?.results })
        }

        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false })

    } catch (e) {
        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false })
        console.log('hii', e);
    }
}

function* getHomeDataOnRefresh(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_REFRESHING, payload: true })


        const callResponse = yield postRequest({
            url: api_url + get_call_astrologer,
            data: {
                page: 1
            }
        })

        const chatResponse = yield postRequest({
            url: api_url + get_chat_astrologer,
            data: {
                page: 1
            }
        })
        const videoResponse = yield postRequest({
            url: api_url + get_video_call_astrologer,
            data: {
                page: 1
            }
        })

        yield put({ type: actionTypes.GET_CUSTOMER_DATA, payload: null })


        if (callResponse?.success) {
            yield put({ type: actionTypes.SET_CALL_ASTROLOGER, payload: callResponse?.astrologer })
        }

        if (chatResponse?.success) {
            yield put({ type: actionTypes.SET_CHAT_ASTROLOGER, payload: chatResponse?.astrologer })
        }
        if (videoResponse.response) {
            yield put({ type: actionTypes.SET_VIDEO_CALL_ASTROLOGER, payload: videoResponse?.astrologer })
        }

        yield put({ type: actionTypes.SET_IS_REFRESHING, payload: false })

    } catch (e) {
        yield put({ type: actionTypes.SET_IS_REFRESHING, payload: false })
        console.log('hii', e);
    }
}

function* getAstroCompanionData(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })


        const response = yield postRequest({
            url: api_url + get_astro_companion,
            data: {
                type: payload
            }
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_ASTRO_COMPANION_DATA, payload: response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log('hii', e);
    }
}
function* getNotificationData(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const customerData = yield select(state => state.customer.customerData);
        console.log(customerData?._id);

        const response = yield postRequest({
            url: api_url + get_notification_data,
            data: {
                customerId: customerData?._id
            }
        });

        console.log(response?.data, 'notification data');
        if (response?.success) {
            // Sort notifications by '_id' in descending order
            const sortedNotifications = response?.data.sort(
                (a, b) => b._id.localeCompare(a._id)
            );

            yield put({ type: actionTypes.SET_NOTIFICATION_DATA, payload: sortedNotifications });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}


function* getDeleteAccountData(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.customer.customerData)
        console.log(customerData?._id)

        const response = yield postRequest({
            url: api_url + get_delete_account_data,
            data: {
                customerId: customerData?._id
            }
        })
        console.log(response?.message, 'notification data')
        if (response?.success) {
            console.log(response?.message, 'notification data')
            yield put({ type: actionTypes.SET_DELETE_ACCOUNT_DATA, payload: response?.data })
            // showToastMessage({ message: response?.message })
            yield call(resetToScreen, 'login')
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getBlogData(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const response = yield getRequest({
            url: api_url + get_all_blogs,

        })
        console.log('MYBlogdata::::KKKK', response)
        if (response?.success) {

            yield put({ type: actionTypes.SET_BLOGS_DATA, payload: response?.results })
            // showToastMessage({ message: response?.message })

        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}
function* getCustomerData(actions) {
    console.log("ksadfosadghok")
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const response = yield getRequest({
            url: api_url + get_testimonial_customer,

        })
        console.log('MYBlogdata::::>>>KKKK', response)
        if (response?.success) {

            yield put({ type: actionTypes.SET_REVIEW_CUSTOMER_DATA, payload: response?.results })
            // showToastMessage({ message: response?.message })

        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getMyorderData(actions) {
    console.log("action", actions)
    try {
        const customerData = yield select(state => state.customer.customerData)
        const getMyorderData = {
            customerId: customerData?._id

        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const getMyorderDataresponse = yield postRequest({
            url: api_url + my_order_astrologer,
            data: getMyorderData
        })
        console.log("getMyorderDataresponse", getMyorderDataresponse?.results)
        if (getMyorderDataresponse?.success) {
            yield put({ type: actionTypes.SET_MY_ORDER_DATA, payload: getMyorderDataresponse?.results })
            // showToastMessage({ message: getMyorderDataresponse?.message })


        } else { 
            Alert.alert("AstroBook", getMyorderData?.message);
        }

    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        console.log('hii', e);
    }
}








export default function* homeSaga() {
    yield takeLatest(actionTypes.GET_HOME_DATA, getHomeData);
    yield takeLeading(actionTypes.GET_HOME_DATA_ON_REFRESH, getHomeDataOnRefresh);
    yield takeLeading(actionTypes.GET_ASTRO_COMPANION_DATA, getAstroCompanionData);
    yield takeLeading(actionTypes.GET_NOTIFICATION_DATA, getNotificationData);
    yield takeLeading(actionTypes.GET_DELETE_ACCOUNT_DATA, getDeleteAccountData);
    yield takeLeading(actionTypes.GET_BLOGS_DATA, getBlogData);
    yield takeLeading(actionTypes.GET_REVIEW_CUSTOMER_DATA, getCustomerData);
    yield takeLeading(actionTypes.GET_REVIEW_CUSTOMER_DATA, getMyorderData);
}