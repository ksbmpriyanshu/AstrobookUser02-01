import * as actionTypes from '../actionTypes';

const initialState = {
    bannerData: null,
    callAstrologer: null,
    chatAstrologer: null,
    videoCallAstrolgoer: null,
    homeSimmer: false,
    companionData: null,
    notificationData: null,
    deleteAccount: null,
    myblogdata: null,
    customereviewdata:null,
    myorderData:null
};

const home = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case actionTypes.SET_HOME_BANNER:
            return {
                ...state,
                bannerData: payload,
            };
        case actionTypes.SET_CALL_ASTROLOGER:
            return {
                ...state,
                callAstrologer: payload,
            };
        case actionTypes.SET_CHAT_ASTROLOGER:
            return {
                ...state,
                chatAstrologer: payload,
            };
        case actionTypes.SET_VIDEO_CALL_ASTROLOGER:
            return {
                ...state,
                videoCallAstrolgoer: payload,
            };

        case actionTypes.SET_HOME_SIMMER:
            return {
                ...state,
                homeSimmer: payload,
            };
        case actionTypes.SET_ASTRO_COMPANION_DATA:
            return {
                ...state,
                companionData: payload,
            };
        case actionTypes.SET_NOTIFICATION_DATA:
            return {
                ...state,
                notificationData: payload,
            };
        case actionTypes.SET_DELETE_ACCOUNT_DATA:
            return {
                ...state,
                deleteAccount: payload,
            };
        case actionTypes.SET_BLOGS_DATA:
            return {
                ...state,
                myblogdata: payload,
            };
            case actionTypes.SET_REVIEW_CUSTOMER_DATA:
                return {
                    ...state,
                    customereviewdata: payload,
                };
                case actionTypes.GET_MY_ORDER_DATA:
                return {
                    ...state,
                    myorderData: payload,
                };
        default:
            return state;
    }
};

export default home;
