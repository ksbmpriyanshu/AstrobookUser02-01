
import { call, put, takeEvery, takeLatest, takeLeading } from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';
import { goBack, navigate, replace, resetToScreen } from '../../navigations/NavigationServices';
import { blobRequest, postRequest } from '../../utils/apiRequests';
import { add_astrologer_inquiry, api_url, create_customer, customer_google_login, customer_login, update_customer_details, user_login, verify_customer, verify_otp } from '../../config/constants';
import { getFcmToken, showToastMessage } from '../../utils/services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    GoogleSignin,
} from '@react-native-google-signin/google-signin';
import { registerZegoCall } from '../../utils/zegoServices';
import { Alert } from 'react-native';



function* onLogin(actions) {
    try {
        const { payload } = actions
        console.log(payload,'login paylod')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        
        const response = yield postRequest({
            url: api_url + customer_login,
            data: payload
        })
        console.log(":::::response", response)
        if (response?.success) {
            yield call(navigate, 'otp', { ...payload, otp: response?.otp })
        }else{
            // Alert.alert("Astro Remedy",response?.message)
            showToastMessage({ message: response?.message })
            console.log('starat')
            // showToastMessage({ message: 'Please connect your Internet connection' })

        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log('hii', e);
    }
}

function* onGoogleLogin(actions) {
    try {
        const { payload } = actions
        const test = yield GoogleSignin.hasPlayServices();
        const userInfo = yield GoogleSignin.signIn();
        console.log(userInfo,'useri')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const response = yield postRequest({
            url: api_url + customer_google_login,
            data: {
                email: userInfo.user.email,
                fcmToken: yield getFcmToken(),
                device_id: 'device_id',
                customerName: userInfo.user.name
            }
        })
        console.log(response,'thisresposne')

        if (response?.success) {
            yield AsyncStorage.setItem('customerData', JSON.stringify(response?.customer))
            yield put({ type: actionTypes.SET_CUSTOMER_DATA, payload: response?.customer })
            yield call(resetToScreen, 'home')
            yield registerZegoCall({userId:response?.customer?._id, userName: response?.customer?.customerName || 'Unknown', dispatch: null})
        }else{
            showToastMessage({ message: response?.message })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log('hii1111s', e);
    }
}


function* onOtpVerification(actions) {
    try {
        const { payload } = actions
        console.log(payload,'payload datqa')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const response = yield postRequest({
            url: api_url + verify_customer,
            data: payload?.data
        })

        if (response?.success) {
            yield AsyncStorage.setItem('customerData', JSON.stringify(response?.customer))
            yield put({ type: actionTypes.SET_CUSTOMER_DATA, payload: response?.customer })
            console.log(response,'thissdf')
            if (response?.type == 'home') {
                yield call(resetToScreen, 'home')
                yield registerZegoCall({userId:response?.customer?._id, userName: response?.customer?.customerName || 'Unknown', dispatch: payload?.dispatch})
            } else {
                yield call(replace, response?.type)
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log('hii', e);
    }
}

function* onRegister(actions) {
    try {
        const { payload } = actions
        console.log(payload,'customer data')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const response = yield blobRequest({
            url: api_url + update_customer_details,
            data: payload?.data
        })

        if (response?.success) {
            yield AsyncStorage.setItem('customerData', JSON.stringify(response?.data))
            yield put({ type: actionTypes.SET_CUSTOMER_DATA, payload: response?.data })
            yield call(showToastMessage, { message: 'Profile Updated Successfully' })
            yield call(resetToScreen, 'home')
            yield registerZegoCall({userId:response?.data?._id, userName: response?.data?.customerName || 'Unknown', dispatch: payload?.dispatch})
        } else {
            yield call(showToastMessage, { message: response?.message })
            console.log('error h')
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log('hii', e);
    }
}

function* onApplyAsAnAstrologer(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const response = yield postRequest({
            url: api_url + add_astrologer_inquiry,
            data: payload
        })


        if (response?.success) {
            showToastMessage({ message: response?.message })
            yield call(goBack)
        } else {
            showToastMessage({ message: response?.message })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })


    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

export default function* authSaga() {
    yield takeLatest(actionTypes.ON_LOGIN, onLogin);
    yield takeLatest(actionTypes.ON_GOOGLE_LOGIN, onGoogleLogin);
    yield takeLatest(actionTypes.ON_OTP_VERIFICATION, onOtpVerification);
    yield takeLatest(actionTypes.ON_REGISTER, onRegister);
    yield takeLeading(actionTypes.ON_APPLY_AS_AN_ASTROLOGER, onApplyAsAnAstrologer)
}
