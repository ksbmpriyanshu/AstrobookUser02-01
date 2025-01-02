import * as actionTypes from '../actionTypes'

export const getSplash = payload => ({
    type: actionTypes.GET_SPLASH,
    payload,
})

export const setLocationData = payload => ({
    type: actionTypes.SET_LOCATION_DATA,
    payload,
})

export const setSubLocationData = payload => ({
    type: actionTypes.SET_SUB_LOCATION_DATA,
    payload,
})

export const setImagePickerVisible = payload => ({
    type: actionTypes.SET_IMAGE_PICKER_VISIBLE,
    payload,
})

export const setIsMoreLoading = payload => ({
    type: actionTypes.SET_IS_MORE_LOADING,
    payload,
})
