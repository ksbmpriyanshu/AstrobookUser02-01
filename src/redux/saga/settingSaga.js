import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actionTypes from '../actionTypes'
import { resetToScreen } from '../../navigations/NavigationServices';
import { postRequest } from '../../utils/apiRequests';
import { api_url, get_customer_detail } from '../../config/constants';
import { call, put, takeLeading } from 'redux-saga/effects';
import { registerZegoCall } from '../../utils/zegoServices';
function* getSplash(actions) {
    try {
        const {payload} = actions
        const customerData = yield AsyncStorage.getItem('customerData');
        const custData = JSON.parse(customerData);
        if (custData) {
            const response = yield postRequest({
                url: api_url + get_customer_detail,
                data: {
                    customerId: custData?._id,
                    unique_id: 'sdfsfsd'
                }
            })

            if (response?.success) {
                yield AsyncStorage.setItem('customerData', JSON.stringify(response?.customersDetail))
                yield put({ type: actionTypes.SET_CUSTOMER_DATA, payload: response?.customersDetail })
                yield call(resetToScreen, 'home')
                yield registerZegoCall({userId: response?.customersDetail?._id, userName: response?.customersDetail?.customerName || 'Unknown', dispatch: payload})
            }else{
                yield call(resetToScreen, 'login')
            }

        } else {
            yield call(resetToScreen, 'login')
        }
    } catch (e) {
        console.log(e,'asdfasdf')
    }
}


export default function* settingSaga() {
    yield takeLeading(actionTypes.GET_SPLASH, getSplash);
}