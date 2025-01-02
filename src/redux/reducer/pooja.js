import * as actionTypes from '../actionTypes';
const initialState = {
    poojaData: null,
    newPoojaData: null,
    allpoojadata: null,
    bookPoojaData: null,
    bookpujaHistoryData: null,
    newPoojaCategoryData: null,
    paymentPooja: null,
    isVisible: false
};
const pooja = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case actionTypes.SET_POOJA_DATA:
            return {
                ...state,
                poojaData: payload,
            };
        case actionTypes.SET_NEW_POOJA_DATA:
            return {
                ...state,
                newPoojaData: payload,
            };
        case actionTypes.SET_POOJA_CATEGORY_DATA:
            return {
                ...state,
                newPoojaCategoryData: payload,
            };
        case actionTypes.SET_BOOK_POOJA:
            return {
                ...state,
                bookPoojaData: payload
            }
        case actionTypes.GET_BOOK_POOJA_HISTORY_DATA:
            return {
                ...state,
                // bookpujaHistoryData : payload
            }
        case actionTypes.SET_BOOK_POOJA_HISTORY_DATA:
            return {
                ...state,
                bookpujaHistoryData: payload
            }
        case actionTypes.GET_POOJA_PAYMENT_DATA:
            return {
                ...state,
                // bookpujaHistoryData : payload
            }
        case actionTypes.SET_POOJA_PAYMENT_DATA:
            return {
                ...state,
                paymentPooja: payload
            }

            case actionTypes.GET_HISTORY_PUJA_DATA:
                return {
                    ...state,
                    // bookpujaHistoryData : payload
                }
            case actionTypes.SET_HISTORY_PUJA_DATA:
                return {
                    ...state,
                    HistorypoojaData: payload
                }



        case actionTypes.OPEN_MODAL:
            return { ...state, isVisible: true };
        case actionTypes.CLOSE_MODAL:
            return { ...state, isVisible: false };
        default:
            return state;


    }
};

export default pooja;
