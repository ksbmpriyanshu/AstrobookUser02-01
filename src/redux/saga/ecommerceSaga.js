import { call, put, select, takeLeading } from 'redux-saga/effects'
import * as actionTypes from '../actionTypes'
import { getRequest, postRequest } from '../../utils/apiRequests'
import { add_to_cart, api_url, create_address_cart, get_address_cart, get_customer_cart, get_mall_order_data, get_product_category, get_products, order_product, remove_cart_item, update_cart_item_quantity } from '../../config/constants'
import { navigate, resetToScreen } from '../../navigations/NavigationServices'
import { showToastMessage } from '../../utils/services'
import { razorpayPayment } from '../../utils/razorpay'
import axios from 'axios'
import { PhonepeMall } from '../../utils/phonePe'

function* getProductCategory(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const response = yield getRequest({
            url: api_url + get_product_category
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_PRODUCT_CATEGORY, payload: response?.productCategory })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getProductsData(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const response = yield postRequest({
            url: api_url + get_products,
            data: {
                categoryId: payload
            }
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_PRODUCTS, payload: response?.products })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* addToCart(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.customer.customerData)
        const response = yield postRequest({
            url: api_url + add_to_cart,
            data: {
                productId: payload,
                customerId: customerData?._id
            }
        })

        if (response?.success) {
            showToastMessage({ message: response?.message })
            yield call(navigate, 'cart')
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getCartData(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.customer.customerData)
        console.log(customerData?._id,'idcart')
        const response = yield postRequest({
            url: api_url + get_customer_cart,
            data: {
                customerId: customerData?._id
            },
        })
        // const response = yield axios({
        //     method: 'post',
        //     url: api_url + get_customer_cart,
        //     data: {
        //                 customerId: customerData?._id
        //             },
        // });
        console.log(response?.data,'apiii')
        if (response?.success) {
            yield put({ type: actionTypes.SET_CART_DATA, payload: { cart: response?.cart, totalPrice: response?.totalPrice } })
            console.log('first')
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e,'api')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* updateCartQuantity(actions) {
    try {
        const { payload } = actions
        console.log(payload,'upda')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const response = yield postRequest({
            url: api_url + update_cart_item_quantity,
            data: payload
        })
        // const response = yield axios({
        //     method: 'post',
        //     url: api_url + update_cart_item_quantity,
        //     data: payload,
        // });

        if (response?.success) {
            yield put({ type: actionTypes.GET_CART_DATA, payload: null })
            
            
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e,'new eeoro')
        showToastMessage({message: 'out of stock'})
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* orderCart(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.customer.customerData)
        const cartData = yield select(state => state.ecommerce.cartData)
        const addressData = yield select(state => state.ecommerce.addressData)
        // console.log('adasdf',addressData)

        const response = yield axios.post(api_url + 'ecommerce/order_product_phonepe',{customerId: customerData?._id, amount: cartData?.totalPrice,addressId : addressData?.data?._id});
        console.log('Response ::: ',response?.data);
        if(response?.data?.success) {
           const responseData =  yield PhonepeMall({ orderId : response?.data?.orderId, customerId: customerData?._id, amount: cartData?.totalPrice, phone : customerData?.phoneNumber, dispatch : payload?.dispatch });

        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}
function* getMallOrderData(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        // data = {
        //             ...payload
        //         }
        // const response = yield axios.post(api_url + get_mall_order_data,data);
        const response = yield postRequest({
            url: api_url + get_mall_order_data,
            data: {
                ...payload
            }
        })
        if (response?.success) {
            yield put({ type: actionTypes.SET_MALL_ORDER_DATA, payload: response?.data })
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}
function* removeCartItem(actions) {
    try {
        const customerData = yield select(state => state.customer.customerData)
        console.log(customerData?._id,'idcart')
        const { payload } = actions
        console.log(payload,':::payyy')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const response = yield postRequest({
            url: api_url + remove_cart_item,
            data: payload
        })
        console.log(response,'all data')
        if (response?.success) {
            showToastMessage({message: response?.message})
            yield put({ type: actionTypes.GET_CART_DATA, payload: customerData?._id})
            
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e,'new eeoro')
        showToastMessage({message: 'out of stock'})
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* onAddressCart(actions) {
    try {
        const { payload } = actions;
        const response = yield axios.post(api_url + create_address_cart,payload); 

        console.log(response);
        if(response?.data?.success) {
            showToastMessage({ message: response?.data?.message });
            yield put({ type: actionTypes.GET_ADDRESS_CART , payload: null});
            resetToScreen('Address');
        }

    } catch(e) {
        console.log(e);
    }
}

function* getAddressCart(actions) {
    try {
        const { payload } =actions;
        const customerdata = yield select(state => state.customer.customerData);

        const response = yield axios.post(api_url + get_address_cart,{customerId: customerdata?._id});
        console.log('Response ::: ',response?.data);
        if(response?.data?.success) {
            yield put({ type: actionTypes.SET_ADDRESS_CART, payload: response?.data});
            showToastMessage({ message: response?.message });
        }

    } catch(e) {
        console.log(e);
    }
}

export default function* ecommerceSaga() {
    yield takeLeading(actionTypes.GET_PRODUCT_CATEGORY, getProductCategory)
    yield takeLeading(actionTypes.GET_PRODUCTS, getProductsData)
    yield takeLeading(actionTypes.ADD_TO_CART, addToCart)
    yield takeLeading(actionTypes.GET_CART_DATA, getCartData)
    yield takeLeading(actionTypes.UPDATE_CART_QUANTITY, updateCartQuantity)
    yield takeLeading(actionTypes.ORDER_CART, orderCart)
    yield takeLeading(actionTypes.GET_MALL_ORDER_DATA, getMallOrderData)
    yield takeLeading(actionTypes.REMOVE_CART_ITEM, removeCartItem)
    yield takeLeading(actionTypes.ON_ADDRESS_CART, onAddressCart);
    yield takeLeading(actionTypes.GET_ADDRESS_CART, getAddressCart);
}