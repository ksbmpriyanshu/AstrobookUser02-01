import * as actionTypes from '../actionTypes'

export const getAstromallData = payload =>({
    type: actionTypes.GET_ASTROMALL_DATA,
    payload,
})

export const setAstromallPoojaData = payload =>({
    type: actionTypes.SET_ASTROMALL_POOJA_DATA,
    payload,
})

export const setAstromallSpellData = payload =>({
    type: actionTypes.SET_ASTROMALL_SPELL_DATA,
    payload,
})

export const getAstrologerPoojaData = payload =>({
    type: actionTypes.GET_ASTROLOGER_POOJA_DATA,
    payload
})

export const setAstrologerPoojaData = payload =>({
    type: actionTypes.SET_ASTROLOGER_POOJA_DATA,
    payload
})

export const orederAstrologerPooja = payload => ({
    type: actionTypes.ORDER_ASTROLOGER_POOJA,
    payload
})

export const getAstromallHistory = payload =>({
    type: actionTypes.GET_ASTROMALL_HISTORY,
    payload
})

export const setAstromallHistory = payload =>({
    type: actionTypes.SET_ASTROMALL_HISTORY,
    payload
})

