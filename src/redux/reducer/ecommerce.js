import * as actionTypes from '../actionTypes'

const initialState = {
    productCategoryData: null,
    productsData: null,
    cartData: null,
    mallOrderData: null,
    addressData: null,
    addressSelect: null,
    // removecartData: null
}



const ecommerce = (state = initialState, actions) => {
    const { type, payload } = actions;
    switch (type) {
        case actionTypes.SET_PRODUCT_CATEGORY:
            return {
                ...state,
                productCategoryData: payload,
            };
        case actionTypes.SET_PRODUCTS:
            return {
                ...state,
                productsData: payload,
            };
        case actionTypes.SET_CART_DATA:
            return {
                ...state,
                cartData: payload,
            };
        case actionTypes.REMOVE_CART_ITEM:
            return {
                    ...state,
                    cartData: {
                        ...state.cartData,
                        cart: state.cartData.cart.filter(item => item._id !== actions.payload)
                    }
            };
            case actionTypes.SET_MALL_ORDER_DATA:
                return {
                        ...state,
                        mallOrderData: payload,
                };
                case actionTypes.SET_ADDRESS_CART: 
                return {
                    ...state,
                    addressData: payload
                };
            case actionTypes.SET_SELECTED_ADDRESS_CART:
                return {
                    ...state,
                    addressSelect: payload
                }
        default:
            return state;
    }
}

export default ecommerce;