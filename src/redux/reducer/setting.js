import * as actionTypes from '../actionTypes';
const initialState = {
    isLoading: false,
    isRefreshing: false,
    locationData: null,
    subLocationData: null,
    imagePickerVisible: false,
    isMoreLoading: false
};
const setting = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case actionTypes.SET_IS_LOADING:
            return {
                ...state,
                isLoading: payload,
            };

        case actionTypes.SET_IS_REFRESHING:
            return {
                ...state,
                isRefreshing: payload,
            };

        case actionTypes.SET_LOCATION_DATA:
            return {
                ...state,
                locationData: payload,
            };
        case actionTypes.SET_SUB_LOCATION_DATA:
            return {
                ...state,
                subLocationData: payload,
            };
        case actionTypes.SET_IMAGE_PICKER_VISIBLE:
            return {
                ...state,
                imagePickerVisible: payload,
            };
        case actionTypes.SET_IS_MORE_LOADING:
            return {
                ...state,
                isMoreLoading: payload,
            };
        default:
            return state;
    }
};

export default setting;
