import * as actionTypes from '../actionTypes'

export const getProductCategory = payload => ({
    type: actionTypes.GET_PRODUCT_CATEGORY,
    payload,
})

export const setProductCategory = payload => ({
    type: actionTypes.SET_PRODUCT_CATEGORY,
    payload,
})

export const getProducts = payload => ({
    type: actionTypes.GET_PRODUCTS,
    payload,
})

export const setProducts = payload => ({
    type: actionTypes.SET_PRODUCTS,
    payload,
})

export const addToCart = payload => ({
    type: actionTypes.ADD_TO_CART,
    payload,
})

export const getCartData = payload => ({
    type: actionTypes.GET_CART_DATA,
    payload,
})

export const setCartData = payload => ({
    type: actionTypes.SET_CART_DATA,
    payload,
})

export const updateCartQuantity = payload => ({
    type: actionTypes.UPDATE_CART_QUANTITY,
    payload,
})

export const orderCart = payload => ({
    type: actionTypes.ORDER_CART,
    payload,
})
export const getmallOrderData = payload => ({
    type: actionTypes.GET_MALL_ORDER_DATA,
    payload,
})
export const removeCartItem = (cartItemId) => ({
    type: actionTypes.REMOVE_CART_ITEM,
    payload: cartItemId
});

export const onAddressCart = payload => ({
    type: actionTypes.ON_ADDRESS_CART,
    payload
})

export const getaddresscart = payload => ({
    type: actionTypes.GET_ADDRESS_CART,
    payload
})

export const setaddressCart =  payload => ({
    type: actionTypes.SET_SELECTED_ADDRESS_CART,
    payload
})