import * as actionTypes from '../actionTypes'

const initialState = {
    astromallPoojaData: null,
    astromallSpellData: null,
    astrologerPoojaData: null,
    astromallHistroyData: null
}

const astromall = (state = initialState, actions) => {
    const { type, payload } = actions;
    switch (type) {
        case actionTypes.SET_ASTROMALL_POOJA_DATA:
            return {
                ...state,
                astromallPoojaData: payload?.poojaData,
                astromallSpellData: payload?.spellData
            }
        case actionTypes.SET_ASTROLOGER_POOJA_DATA:
            return {
                ...state,
                astrologerPoojaData: payload,
            }
        case actionTypes.SET_ASTROMALL_HISTORY:
            return {
                ...state,
                astromallHistroyData: payload,
            }
        default:
            return state;
    }
}

export default astromall;