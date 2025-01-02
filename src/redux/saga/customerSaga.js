import { call, put, select, takeLeading } from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';
import { getRequest, postRequest } from '../../utils/apiRequests';
import { api_url, get_customer_all_recharge_plan, get_customer_detail, get_customer_following, phonepeWallet, recharge_customer_wallet } from '../../config/constants';
import { resetToScreen, navigate } from '../../navigations/NavigationServices';
import { razorpayPayment } from '../../utils/razorpay';
import { showToastMessage } from '../../utils/services';
import axios from 'axios';
import { PhonepeWallet } from '../../utils/phonePe';

function* getCustomerData(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.customer.customerData)
        const response = yield postRequest({
            url: api_url + get_customer_detail,
            header: 'json',
            data: {
                customerId: customerData?._id,
                unique_id: 'sdfsfsd'
            }
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_CUSTOMER_DATA, payload: response?.customersDetail })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}

function* onWalletRecharge(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.customer.customerData)
        console.log(customerData?.phoneNumber, 'this customer data')
        const getamountdata = parseFloat(payload?.data.amount);
        const gstadd = parseFloat(getamountdata * 0.18)
        const totalpay = parseFloat(getamountdata + gstadd);


        const response = yield axios.post(api_url + phonepeWallet, { customerId: customerData?._id, amount: getamountdata });
        console.log('Response ::: ', response?.data);


        if (response?.data?.success) {
            const razorpayResponse = yield razorpayPayment({ amount: totalpay, email: customerData?.email, contact: customerData?.phoneNumber, name: customerData?.customerName })
            console.log("razrp", razorpayResponse)
            if (razorpayResponse) {
                call(navigate, 'home');
                console.log("payment", "true");
            }
            //    const responseData =  yield PhonepeWallet({ orderId : response?.data?.orderId, customerId: customerData?._id, amount: totalpay, phone : customerData?.phoneNumber, dispatch : payload?.dispatch });

        }


        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log('fourth')
        console.log(e)
    }
}

function* getFollowingList(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.customer.customerData)
        const response = yield postRequest({
            url: api_url + get_customer_following,
            header: 'json',
            data: {
                customerId: customerData?._id,
            }
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_FOLLOWING_LIST, payload: response?.following })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}

function* getWalletRechargeOfferList(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const response = yield getRequest({
            url: api_url + get_customer_all_recharge_plan,
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_WALLET_RECHARGE_OFFER_LIST, payload: response?.allRechargePlan })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}

function* getgotoHome() {
    try {
        resetToScreen('home');
    } catch (e) {
        console.log(e);
    }
}

export default function* customerSaga() {
    yield takeLeading(actionTypes.ON_WALLET_RECHARGE, onWalletRecharge);
    yield takeLeading(actionTypes.GET_CUSTOMER_DATA, getCustomerData);
    yield takeLeading(actionTypes.GET_FOLLOWING_LIST, getFollowingList);
    yield takeLeading(actionTypes.GET_WALLET_RECHARGE_OFFER_LIST, getWalletRechargeOfferList);
    yield takeLeading(actionTypes.GET_GO_TO_HOME, getgotoHome);
}