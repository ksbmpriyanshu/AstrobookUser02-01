import * as actionTypes from '../actionTypes'

export const onLogin = payload => ({
    type: actionTypes.ON_LOGIN,
    payload
})

export const onGoogleLogin = payload => ({
    type: actionTypes.ON_GOOGLE_LOGIN,
    payload
})

export const onOtpVerification = payload => ({
    type: actionTypes.ON_OTP_VERIFICATION,
    payload
})

export const onRegister = payload => ({
    type: actionTypes.ON_REGISTER,
    payload
})

export const onApplyAsAnAstrologer = payload => ({
    type: actionTypes.ON_APPLY_AS_AN_ASTROLOGER,
    payload,
})