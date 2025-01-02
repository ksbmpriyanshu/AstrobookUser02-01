import { put, takeLeading } from 'redux-saga/effects'
import * as actionTypes from '../actionTypes'
import { getRequest, postRequest } from '../../utils/apiRequests'
import { api_url, get_all_astro_magazine, get_all_auspicious_time, get_all_birhat_horoscope, get_all_daily_panchang, get_all_religion_spirituality, get_all_remedies, get_all_yellow_book, get_app_tutorials, get_astro_blogs } from '../../config/constants'

function* getReligionAndSprituality(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const response = yield getRequest({
            url: api_url + get_all_religion_spirituality
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_RELIGION_AND_SPIRITUALITY, payload: response?.religionSpirituality })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getAppTuorials(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const imageResponse = yield postRequest({
            url: api_url + get_app_tutorials,
            data: {
                type: 'Photo'
            }
        })

        const videoResponse = yield postRequest({
            url: api_url + get_app_tutorials,
            data: {
                type: 'Video'
            }
        })

        if (imageResponse?.success) {
            yield put({ type: actionTypes.SET_TUTORIALS, payload: { images: imageResponse?.tutorial, links: videoResponse?.tutorial } })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getBrihatHoroscopeData(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const response = yield getRequest({
            url: api_url + get_all_birhat_horoscope
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_BRIHAT_HOROSCOPE, payload: response?.birhatHoroscope })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getAstroBlogs(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const response = yield getRequest({
            url: api_url + get_astro_blogs
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_ASTRO_BLOGS, payload: response?.blogs })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getMagazineData(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const response = yield getRequest({
            url: api_url + get_all_astro_magazine
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_MAGAZINE_DATA, payload: response?.astroMagazine })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getRemediesData(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const response = yield getRequest({
            url: api_url + get_all_remedies
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_REMEDIES_DATA, payload: response?.remedies })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getDailyPunchangData(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const response = yield getRequest({
            url: api_url + get_all_daily_panchang
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_DAILY_PUNCHANG_DATA, payload: response?.dailyPanchang })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getYellowBookData(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const response = yield getRequest({
            url: api_url + get_all_yellow_book
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_YELLOW_BOOK_DATA, payload: response?.yellowBook })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getAuspiciousData(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const response = yield getRequest({
            url: api_url + get_all_auspicious_time
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_AUSPICIOUS_DATA, payload: response?.auspiciousTime })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}


export default function* blogSaga() {
    yield takeLeading(actionTypes.GET_RELIGION_AND_SPIRITUALITY, getReligionAndSprituality)
    yield takeLeading(actionTypes.GET_TUTORIALS, getAppTuorials)
    yield takeLeading(actionTypes.GET_BRIHAT_HOROSCOPE, getBrihatHoroscopeData)
    yield takeLeading(actionTypes.GET_MAGAZINE_DATA, getMagazineData)
    yield takeLeading(actionTypes.GET_REMEDIES_DATA, getRemediesData)
    yield takeLeading(actionTypes.GET_DAILY_PUNCHANG_DATA, getDailyPunchangData)
    yield takeLeading(actionTypes.GET_YELLOW_BOOK_DATA, getYellowBookData)
    yield takeLeading(actionTypes.GET_AUSPICIOUS_DATA, getAuspiciousData)
    yield takeLeading(actionTypes.GET_ASTRO_BLOGS, getAstroBlogs)
}