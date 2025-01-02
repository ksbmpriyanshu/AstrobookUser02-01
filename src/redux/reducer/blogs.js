import * as actionTypes from '../actionTypes'

const initialState = {
    religionAndSpirtualityData: null,
    brihatHoroscopeData: null,
    tutorialsImages: null,
    tutorialsVedio: null,
    magazineData: null,
    remediesData: null,
    dailyPunchangData: null,
    yellowBookData: null,
    auspiciousData: null,
    astroBlogData: null
};

const blogs = (state = initialState, actions) => {
    const { type, payload } = actions;
    switch (type) {
        case actionTypes.SET_RELIGION_AND_SPIRITUALITY:
            return {
                ...state,
                religionAndSpirtualityData: payload,
            };
        case actionTypes.SET_BRIHAT_HOROSCOPE:
            return {
                ...state,
                brihatHoroscopeData: payload,
            };
        case actionTypes.SET_TUTORIALS:
            return {
                ...state,
                tutorialsImages: payload?.images,
                tutorialsVedio: payload?.links
            };
        case actionTypes.SET_MAGAZINE_DATA:
            return {
                ...state,
                magazineData: payload,
            };
        case actionTypes.SET_REMEDIES_DATA:
            return {
                ...state,
                remediesData: payload,
            };
        case actionTypes.SET_DAILY_PUNCHANG_DATA:
            return {
                ...state,
                dailyPunchangData: payload,
            };
        case actionTypes.SET_YELLOW_BOOK_DATA:
            return {
                ...state,
                yellowBookData: payload,
            };
        case actionTypes.SET_AUSPICIOUS_DATA:
            return {
                ...state,
                auspiciousData: payload,
            };
        case actionTypes.SET_ASTRO_BLOGS:
            return {
                ...state,
                astroBlogData: payload,
            };
    }
    return state;
}

export default blogs;