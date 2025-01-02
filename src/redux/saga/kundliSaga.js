import { call, put, select, takeLeading } from 'redux-saga/effects'
import * as actionTypes from '../actionTypes'
import { kundliRequest, postRequest, postRequestNew } from '../../utils/apiRequests'
import { add_kundli, api_url, delete_kundli, delete_numerology, get_customer_kundli, get_horo_chart, get_kp_house_cusps, get_kp_planets, get_kundli_basic_details, get_numerology, get_planets } from '../../config/constants'
import { showToastMessage } from '../../utils/services'
import { navigate, replace } from '../../navigations/NavigationServices'
import moment from 'moment'

function* createKundli(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.customer.customerData)
        const response = yield postRequest({
            url: api_url + add_kundli,
            data: { ...payload, customerId: customerData?._id }
        })

        if (response?.success) {
            showToastMessage({ message: 'Kundli created successfully' })

            yield call(navigate, 'showKundli', { kundliId: response?.kundli?._id })
            yield put({ type: actionTypes.GET_ALL_KUNDLI, payload: null })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getAllKundli(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.customer.customerData)
        const response = yield postRequest({
            url: api_url + get_customer_kundli,
            data: { customerId: customerData?._id }
        })

        if (response?.success) {

            yield put({ type: actionTypes.SET_ALL_KUNDLI, payload: response?.kundli })
            yield put({ type: actionTypes.SET_ALL_MASTRER_KUNDLI, payload: response?.kundli })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* deleteKundli(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const response = yield postRequest({
            url: api_url + delete_kundli,
            data: { kundliId: payload }
        })

        if (response?.success) {
            showToastMessage({ message: 'Kundli deleted successfully' })
            yield put({ type: actionTypes.GET_ALL_KUNDLI, payload: null })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getKundliData(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        yield put({ type: actionTypes.SET_KUNDLI_ID, payload })

        const basicDetailsResponse = yield postRequest({
            url: api_url + get_kundli_basic_details,
            data: {
                kundliId: payload
            }
        })

        console.log({ ...basicDetailsResponse?.payload, hour: parseInt(moment(basicDetailsResponse?.data?.tob).format("HH")), min: parseInt(moment(basicDetailsResponse?.data?.tob).format("mm")) })

        if (basicDetailsResponse.success) {
            yield put({ type: actionTypes.SET_KUNDLI_BASIC_DETAILS, payload: basicDetailsResponse?.data })
            yield put({ type: actionTypes.SET_KUNDLI_PAYLOADS, payload: { ...basicDetailsResponse?.payload, hour: parseInt(moment(basicDetailsResponse?.data?.tob).format("HH")), min: parseInt(moment(basicDetailsResponse?.data?.tob).format("mm")) } })
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getPlanetData(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads)
        const planetResponse = yield kundliRequest({
            url: 'https://json.astrologyapi.com/v1/planets',
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang

        })

        if (planetResponse) {
            yield put({ type: actionTypes.SET_PLANET_DATA, payload: planetResponse })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getKpPlanetData(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads)

        const response = yield kundliRequest({
            url: 'https://json.astrologyapi.com/v1/kp_horary',
            data: {
                ...kundliPayloads,
                horary_number: 2
            },
            lang: payload?.lang
        })

        if (response) {
            yield put({ type: actionTypes.SET_KP_PLANET_DATA, payload: response })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getKpHouseCupsData(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads)

        const response = yield kundliRequest({
            url: 'https://json.astrologyapi.com/v1/kp_horary',
            data: {
                ...kundliPayloads,
                horary_number: 2
            },
            lang: payload?.lang
        })

        if (response) {
            yield put({ type: actionTypes.SET_KP_HOUSE_CUPS_DATA, payload: response })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}



function* RashiReportData(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads)



        const moonReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/general_rashi_report/moon`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })

        const mercuryReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/general_rashi_report/mercury`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })

        const marsReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/general_rashi_report/mars`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })
        const venusReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/general_rashi_report/venus`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })

        const saturnReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/general_rashi_report/saturn`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })
        const jupiterReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/general_rashi_report/jupiter`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })


        const data = {
            moonReports,
            mercuryReports,
            marsReports,
            saturnReports,
            venusReports,
            jupiterReports
        }

        yield put({ type: actionTypes.SET_RASHI_REPORTS, payload: data })

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'hi')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* AstakVargaData(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads)

        console.log(kundliPayloads)

        const ascendantReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/planet_ashtak/ascendant`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })

        const sunReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/planet_ashtak/sun`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })

        const moonReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/planet_ashtak/moon`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })

        const mercuryReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/planet_ashtak/mercury`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })

        const marsReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/planet_ashtak/mars`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })
        const venusReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/planet_ashtak/venus`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })

        const saturnReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/planet_ashtak/saturn`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })
        const jupiterReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/planet_ashtak/jupiter`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })

        const ascendantchart = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/planet_ashtak_image/ascendant`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })

        const sunchart = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/planet_ashtak_image/sun`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })

        const moonchart = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/planet_ashtak_image/moon`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })

        const mercurychart = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/planet_ashtak_image/mercury`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })

        const marschart = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/planet_ashtak_image/mars`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })
        const venuschart = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/planet_ashtak_image/venus`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })

        const saturnchart = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/planet_ashtak_image/saturn`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })
        const jupiterchart = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/planet_ashtak_image/jupiter`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })


        const data = {
            sunReports,
            ascendantReports,
            moonReports,
            mercuryReports,
            marsReports,
            saturnReports,
            venusReports,
            jupiterReports,
            sunchart,
            ascendantchart,
            moonchart,
            mercurychart,
            marschart,
            saturnchart,
            venuschart,
            jupiterchart,

        }

        yield put({ type: actionTypes.SET_ASTAK_REPORTS, payload: data })

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'hi')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* SarVargaData(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads)
        console.log('adfas', kundliPayloads)
        const sarvashtak = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/sarvashtak`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })
        const sarvashtakchart = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/sarvashtak_image`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })



        const data = {
            sarvashtak,
            sarvashtakchart
        }

        yield put({ type: actionTypes.SET_SARVA_REPORTS, payload: data })

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'hi')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* AscendantData(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads)
        console.log('adfas', kundliPayloads)
        const AscedentReport = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/general_ascendant_report`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })



        const data = {
            AscedentReport
        }

        yield put({ type: actionTypes.SET_ASCEDENT_REPORTS, payload: data })

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'hi')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}
function* MatchingAscendantData(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads)
        console.log('adfas', kundliPayloads)
        const kundliDataMale = yield select(state => state.kundli.maleKundliData)
        const kundliDataFemale = yield select(state => state.kundli.femaleKundliData)

        console.log(kundliDataMale, 'sdfsdfsdf')
        const m_data = {
            day: parseInt(moment(kundliDataMale?.dob).format('D')),
            month: parseInt(moment(kundliDataMale?.dob).format('M')),
            year: parseInt(moment(kundliDataMale?.dob).format('YYYY')),
            hour: parseInt(moment(kundliDataMale.tob).format('hh')),
            min: parseInt(moment(kundliDataMale.tob).format('mm')),
            lat: kundliDataMale.lat,
            lon: kundliDataMale.lon,
            tzone: 5.5,

        };
        const f_data = {
            day: parseInt(moment(kundliDataFemale?.dob).format('D')),
            month: parseInt(moment(kundliDataFemale?.dob).format('M')),
            year: parseInt(moment(kundliDataFemale?.dob).format('YYYY')),
            hour: parseInt(moment(kundliDataFemale.tob).format('hh')),
            min: parseInt(moment(kundliDataFemale.tob).format('mm')),
            lat: kundliDataFemale?.lat,
            lon: kundliDataFemale?.lon,
            tzone: 5.5,
        };
        const AscedentReportM = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/general_ascendant_report`,
            data: {
                ...m_data
            },
            lang: payload?.lang
        })
        const AscedentReporF = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/general_ascendant_report`,
            data: {
                ...f_data
            },
            lang: payload?.lang
        })



        const data = {
            AscedentReportM,
            AscedentReporF
        }

        yield put({ type: actionTypes.SET_ASCEDENT_MATCHING_REPORTS, payload: data })

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'hi')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}
function* BasicPanchangData(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads)
        console.log('adfas', kundliPayloads)
        const Panchang = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/basic_panchang`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })

        const data = {
            Panchang
        }

        yield put({ type: actionTypes.SET_BASIC_PANCHANGE, payload: data })

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'hi')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* NumerologyData(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads)
        console.log('adfas', kundliPayloads)
        const Numero = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/numero_table`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })

        const data = {
            Numero
        }

        yield put({ type: actionTypes.SET_BASIC_PANCHANGE, payload: data })

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'hi')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getKundliChart(actions) {
    try {
        const { payload } = actions
        // console.log('payload ::::', payload);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads)

        const chartResponse = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/horo_chart/${payload?.data}`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang

        })

        // console.log(chartResponse)
        if (chartResponse) {
            yield put({ type: actionTypes.SET_KUNDLI_CHARTS, payload: chartResponse })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'hi')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getChartImage(actions) {
    const { payload } = actions
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
    const kundliPayloads = yield select(state => state.kundli.kundliPayloads)

    const kundliRequestData = {
        ...kundliPayloads,
        lang: payload?.lang
    };
    const url = `https://json.astrologyapi.com/v1/horo_chart/${payload?.data}`
    console.log('payload :::', kundliRequestData, url);
    try {
        if (payload?.data == 'chalit') {
            const data = yield kundliRequest({
                url: `https://json.astrologyapi.com/v1/horo_chart/${payload?.data}`,
                data: kundliRequestData,
                lang: payload?.lang
            });


            // const modifiedChartData = data.replace(/<path[^>]*d="M340,175L340,340L257.5,257.5"[^>]*><\/path>/g, '');
            // const chartData1 = modifiedChartData.replace('<text font-size="14" x="158.5" y="179.95" style="fill: black;">', '<text font-size="15" x="148.5" y="179.95" style="fill: black;">');
            // const newchart = chartData1.replace('</g>', '<path d="M340,175L340,340L257.5,257.5" stroke="black" stroke-width="1" fill="none"></path></g>');

            if (data) {
                yield put({ type: actionTypes.SET_KUNDLI_CHARTS_IMAGE, payload: data })
            }
        } else {
            const data = yield kundliRequest({
                url: `https://json.astrologyapi.com/v1/horo_chart/${payload?.data}`,
                data: kundliRequestData,
                lang: payload?.lang
            });

            // const modifiedChartData = data.svg.replace(/<path[^>]*d="M340,175L340,340L257.5,257.5"[^>]*><\/path>/g, '');
            // const chartData1 = modifiedChartData.replace('<text font-size="15" x="158.5" y="179.95" style="fill: black;">', '<text font-size="15" x="148.5" y="179.95" style="fill: black;">');
            // const newchart = chartData1.replace('</g>', '<path d="M340,175L340,340L257.5,257.5" stroke="black" stroke-width="1" fill="none"></path></g>');
            if (data) {
                yield put({ type: actionTypes.SET_KUNDLI_CHARTS_IMAGE, payload: data })
            }
        }





        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'hi')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
};


function* getSaptmashaChart(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads)

        const kundliDataMale = yield select(state => state.kundli.maleKundliData)
        const kundliDataFemale = yield select(state => state.kundli.femaleKundliData)

        console.log(kundliDataMale, 'sdfsdfsdf')
        const dataM = {
            day: parseInt(moment(kundliDataMale?.dob).format('D')),
            month: parseInt(moment(kundliDataMale?.dob).format('M')),
            year: parseInt(moment(kundliDataMale?.dob).format('YYYY')),
            hour: parseInt(moment(kundliDataMale.tob).format('hh')),
            min: parseInt(moment(kundliDataMale.tob).format('mm')),
            lat: kundliDataMale.lat,
            lon: kundliDataMale.lon,
            tzone: 5.5,
        }
        const dataF = {
            day: parseInt(moment(kundliDataFemale?.dob).format('D')),
            month: parseInt(moment(kundliDataFemale?.dob).format('M')),
            year: parseInt(moment(kundliDataFemale?.dob).format('YYYY')),
            hour: parseInt(moment(kundliDataFemale.tob).format('hh')),
            min: parseInt(moment(kundliDataFemale.tob).format('mm')),
            lat: kundliDataFemale?.lat,
            lon: kundliDataFemale?.lon,
            tzone: 5.5,
        };

        const chartResponseMA = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/horo_chart/D7`,
            data: dataM,
            lang: payload?.lang
        });
        console.log('res ==', chartResponseMA);

        const chartResponseFA = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/horo_chart/D7`,
            data: dataF,
            lang: payload?.lang
        });


        const response = {
            chartResponseMA,
            chartResponseFA

        }


        console.log(chartResponseFA, 'this response of chart')
        if (response) {
            yield put({ type: actionTypes.SET_KUNDLI_D7_CHARTS, payload: response })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'hi')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}
function* getNavmashaChart(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads)

        const kundliDataMale = yield select(state => state.kundli.maleKundliData)
        const kundliDataFemale = yield select(state => state.kundli.femaleKundliData)

        console.log(kundliDataMale, 'sdfsdfsdf')
        const dataM = {
            day: parseInt(moment(kundliDataMale?.dob).format('D')),
            month: parseInt(moment(kundliDataMale?.dob).format('M')),
            year: parseInt(moment(kundliDataMale?.dob).format('YYYY')),
            hour: parseInt(moment(kundliDataMale.tob).format('hh')),
            min: parseInt(moment(kundliDataMale.tob).format('mm')),
            lat: kundliDataMale.lat,
            lon: kundliDataMale.lon,
            tzone: 5.5,
        }
        const dataF = {
            day: parseInt(moment(kundliDataFemale?.dob).format('D')),
            month: parseInt(moment(kundliDataFemale?.dob).format('M')),
            year: parseInt(moment(kundliDataFemale?.dob).format('YYYY')),
            hour: parseInt(moment(kundliDataFemale.tob).format('hh')),
            min: parseInt(moment(kundliDataFemale.tob).format('mm')),
            lat: kundliDataFemale?.lat,
            lon: kundliDataFemale?.lon,
            tzone: 5.5,
        };

        const chartResponseM = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/horo_chart/D9`,
            data: {
                ...dataM
            },
            lang: payload?.lang
        })
        const chartResponseF = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/horo_chart/D9`,
            data: {
                ...dataF
            },
            lang: payload?.lang
        })

        const response = {
            chartResponseM,
            chartResponseF
        }

        console.log('navamashaa cart', response)
        if (response) {
            yield put({ type: actionTypes.SET_KUNDLI_D9_CHARTS, payload: response })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'hi')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getKundliBirthDetails(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads)
        console.log(kundliPayloads, 'kundli payload')

        const response = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/birth_details`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })

        if (response) {
            yield put({ type: actionTypes.SET_KUNDLI_BIRTH_DETAILS, payload: response })
        }


        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getKundliMajorDasha(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads)

        const response = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/major_vdasha`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })

        if (response) {
            yield put({ type: actionTypes.SET_KUNDLI_MAJOR_DASHA, payload: response })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'hi')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getKundliSubVDasha(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads)

        const response = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/sub_vdasha/${payload}`,
            data: {
                ...kundliPayloads
            },

        })

        if (response?.status) {
            yield put({ type: actionTypes.SET_KUNDLI_DASHA_PATH, payload: `${payload?.plant}/` })
            yield put({ type: actionTypes.SET_KUNDLI_SUB_V_DASHA, payload: response })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'hi')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getKundliSubSubVDasha(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads)
        const dashaPath = yield select(state => state.kundli.dashaPath)
        console.log(dashaPath)
        console.log(`https://json.astrologyapi.com/v1/sub_sub_vdasha/${dashaPath}${payload?.plant}`)
        const response = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/sub_sub_vdasha/${dashaPath}${payload?.plant}`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })

        if (response) {
            yield put({ type: actionTypes.SET_KUNDLI_DASHA_PATH, payload: `${dashaPath}${payload}/` })
            yield put({ type: actionTypes.SET_KUNDLI_SUB_SUB_V_DASHA, payload: response })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'hi')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getKundliSubSubSubVDasha(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads)
        const dashaPath = yield select(state => state.kundli.dashaPath)
        const response = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/sub_sub_sub/vdasha/${dashaPath}${payload?.plant}`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })

        if (response) {
            yield put({ type: actionTypes.SET_KUNDLI_DASHA_PATH, payload: `${dashaPath}${payload}` })
            yield put({ type: actionTypes.SET_KUNDLI_SUB_SUB_SUB_V_DASHA, payload: response })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'hi')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getKundliSubSubSubSubVDasha(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads)
        const dashaPath = yield select(state => state.kundli.dashaPath)
        console.log(payload?.plant)
        const response = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/sub_sub_sub_sub/vdasha/${dashaPath}${payload?.plant}`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })

        if (response) {
            yield put({ type: actionTypes.SET_KUNDLI_DASHA_PATH, payload: `${dashaPath}${payload}` })
            yield put({ type: actionTypes.SET_KUNDLI_SUB_SUB_SUB_SUB_V_DASHA, payload: response })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'hi')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getKundliHouseReports(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads)

        const sunReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/general_house_report/sun`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })

        const moonReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/general_house_report/moon`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })

        const mercuryReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/general_house_report/mercury`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })

        const marsReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/general_house_report/mars`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })
        const venusReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/general_house_report/venus`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })

        const saturnReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/general_house_report/saturn`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })
        const jupiterReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/general_house_report/jupiter`,
            data: {
                ...kundliPayloads
            },
            lang: payload?.lang
        })


        const data = {
            sunReports,
            moonReports,
            mercuryReports,
            marsReports,
            saturnReports,
            venusReports,
            jupiterReports
        }

        yield put({ type: actionTypes.SET_HOUSE_REPORTS, payload: data })

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'hi')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getAsstkoota(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const kundliDataMale = yield select(state => state.kundli.maleKundliData)
        const kundliDataFemale = yield select(state => state.kundli.femaleKundliData)

        console.log(kundliDataMale, 'sdfsdfsdf')
        const data = {
            m_day: parseInt(moment(kundliDataMale?.dob).format('D')),
            m_month: parseInt(moment(kundliDataMale?.dob).format('M')),
            m_year: parseInt(moment(kundliDataMale?.dob).format('YYYY')),
            m_hour: parseInt(moment(kundliDataMale.tob).format('hh')),
            m_min: parseInt(moment(kundliDataMale.tob).format('mm')),
            m_lat: kundliDataMale.lat,
            m_lon: kundliDataMale.lon,
            m_tzone: 5.5,
            f_day: parseInt(moment(kundliDataFemale?.dob).format('D')),
            f_month: parseInt(moment(kundliDataFemale?.dob).format('M')),
            f_year: parseInt(moment(kundliDataFemale?.dob).format('YYYY')),
            f_hour: parseInt(moment(kundliDataFemale.tob).format('hh')),
            f_min: parseInt(moment(kundliDataFemale.tob).format('mm')),
            f_lat: kundliDataFemale?.lat,
            f_lon: kundliDataFemale?.lon,
            f_tzone: 5.5,
        };

        const response = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/match_ashtakoot_points`,
            data: {
                ...data
            },
            lang: payload?.lang

        })

        if (response) {
            yield put({ type: actionTypes.SET_KUNDLI_MATCHING_ASHTAKOOT_POINTS, payload: response })
            yield call(navigate, 'basicmatch')
        }

        // yield put({ type: actionTypes.SET_HOUSE_REPORTS, payload: data })

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'hi')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getDaskoota(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const kundliDataMale = yield select(state => state.kundli.maleKundliData)
        const kundliDataFemale = yield select(state => state.kundli.femaleKundliData)

        console.log(kundliDataMale, 'sdfsdfsdf')
        const data = {
            m_day: parseInt(moment(kundliDataMale?.dob).format('D')),
            m_month: parseInt(moment(kundliDataMale?.dob).format('M')),
            m_year: parseInt(moment(kundliDataMale?.dob).format('YYYY')),
            m_hour: parseInt(moment(kundliDataMale.tob).format('hh')),
            m_min: parseInt(moment(kundliDataMale.tob).format('mm')),
            m_lat: kundliDataMale.lat,
            m_lon: kundliDataMale.lon,
            m_tzone: 5.5,
            f_day: parseInt(moment(kundliDataFemale?.dob).format('D')),
            f_month: parseInt(moment(kundliDataFemale?.dob).format('M')),
            f_year: parseInt(moment(kundliDataFemale?.dob).format('YYYY')),
            f_hour: parseInt(moment(kundliDataFemale.tob).format('hh')),
            f_min: parseInt(moment(kundliDataFemale.tob).format('mm')),
            f_lat: kundliDataFemale?.lat,
            f_lon: kundliDataFemale?.lon,
            f_tzone: 5.5,
        };

        const response = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/match_dashakoot_points`,
            data: {
                ...data
            },
            lang: payload?.lang
        })

        if (response) {
            yield put({ type: actionTypes.SET_KUNDLI_MATCHING_DSHKOOT_POINTS, payload: response })
            // yield call(navigate, 'basicmatch')
        }

        // yield put({ type: actionTypes.SET_HOUSE_REPORTS, payload: data })

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'hi')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getMatchConclusion(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const kundliDataMale = yield select(state => state.kundli.maleKundliData)
        const kundliDataFemale = yield select(state => state.kundli.femaleKundliData)

        console.log(kundliDataMale, 'sdfsdfsdf')
        const data = {
            m_day: parseInt(moment(kundliDataMale?.dob).format('D')),
            m_month: parseInt(moment(kundliDataMale?.dob).format('M')),
            m_year: parseInt(moment(kundliDataMale?.dob).format('YYYY')),
            m_hour: parseInt(moment(kundliDataMale.tob).format('hh')),
            m_min: parseInt(moment(kundliDataMale.tob).format('mm')),
            m_lat: kundliDataMale.lat,
            m_lon: kundliDataMale.lon,
            m_tzone: 5.5,
            f_day: parseInt(moment(kundliDataFemale?.dob).format('D')),
            f_month: parseInt(moment(kundliDataFemale?.dob).format('M')),
            f_year: parseInt(moment(kundliDataFemale?.dob).format('YYYY')),
            f_hour: parseInt(moment(kundliDataFemale.tob).format('hh')),
            f_min: parseInt(moment(kundliDataFemale.tob).format('mm')),
            f_lat: kundliDataFemale?.lat,
            f_lon: kundliDataFemale?.lon,
            f_tzone: 5.5,
        };

        const response = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/match_manglik_report`,
            data: {
                ...data
            },
            lang: payload?.lang
        })

        if (response) {
            yield put({ type: actionTypes.SET_KUNDLI_MATCHING_CONCLUSION_POINTS, payload: response })

        }



        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'hi')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getMatchReport(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const kundliDataMale = yield select(state => state.kundli.maleKundliData)
        const kundliDataFemale = yield select(state => state.kundli.femaleKundliData)

        console.log(kundliDataMale, 'sdfsdfsdf')
        const data = {
            m_day: parseInt(moment(kundliDataMale?.dob).format('D')),
            m_month: parseInt(moment(kundliDataMale?.dob).format('M')),
            m_year: parseInt(moment(kundliDataMale?.dob).format('YYYY')),
            m_hour: parseInt(moment(kundliDataMale.tob).format('hh')),
            m_min: parseInt(moment(kundliDataMale.tob).format('mm')),
            m_lat: kundliDataMale.lat,
            m_lon: kundliDataMale.lon,
            m_tzone: 5.5,
            f_day: parseInt(moment(kundliDataFemale?.dob).format('D')),
            f_month: parseInt(moment(kundliDataFemale?.dob).format('M')),
            f_year: parseInt(moment(kundliDataFemale?.dob).format('YYYY')),
            f_hour: parseInt(moment(kundliDataFemale.tob).format('hh')),
            f_min: parseInt(moment(kundliDataFemale.tob).format('mm')),
            f_lat: kundliDataFemale?.lat,
            f_lon: kundliDataFemale?.lon,
            f_tzone: 5.5,
        };

        const response = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/match_ashtakoot_points`,
            data: {
                ...data
            },
            lang: payload?.lang
        })

        if (response) {
            yield put({ type: actionTypes.SET_KUNDLI_MATCHING_REPORT_POINTS, payload: response })

        }

        // yield put({ type: actionTypes.SET_HOUSE_REPORTS, payload: data })

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'hi')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}


function* getMatchBasicAstro(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const kundliDataMale = yield select(state => state.kundli.maleKundliData)
        const kundliDataFemale = yield select(state => state.kundli.femaleKundliData)

        console.log(kundliDataMale, 'sdfsdfsdf')
        const data = {
            m_day: parseInt(moment(kundliDataMale?.dob).format('D')),
            m_month: parseInt(moment(kundliDataMale?.dob).format('M')),
            m_year: parseInt(moment(kundliDataMale?.dob).format('YYYY')),
            m_hour: parseInt(moment(kundliDataMale.tob).format('hh')),
            m_min: parseInt(moment(kundliDataMale.tob).format('mm')),
            m_lat: kundliDataMale.lat,
            m_lon: kundliDataMale.lon,
            m_tzone: 5.5,
            f_day: parseInt(moment(kundliDataFemale?.dob).format('D')),
            f_month: parseInt(moment(kundliDataFemale?.dob).format('M')),
            f_year: parseInt(moment(kundliDataFemale?.dob).format('YYYY')),
            f_hour: parseInt(moment(kundliDataFemale.tob).format('hh')),
            f_min: parseInt(moment(kundliDataFemale.tob).format('mm')),
            f_lat: kundliDataFemale?.lat,
            f_lon: kundliDataFemale?.lon,
            f_tzone: 5.5,
        };

        const response = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/match_astro_details
`,
            data: {
                ...data
            },
            lang: payload?.lang
        })

        if (response) {
            yield put({ type: actionTypes.SET_BASIC_ASTRO_POINTS, payload: response })

        }



        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'hi')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getKundliMatchingReport(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        console.log(payload)

        const response = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/match_birth_details`,
            data: {
                ...payload
            },
            lang: payload?.lang
        })

        if (response) {
            yield put({ type: actionTypes.SET_KUNDLI_BASIC_DETAILS_MATCHING, payload: response })
            yield call(navigate, 'basicmatch')
        }

        // yield put({ type: actionTypes.SET_HOUSE_REPORTS, payload: data })

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'hi')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* viewKundliFromKundliMatching(actions) {
    try {
        const { payload } = actions
        if (payload === 'male') {
            const kundliData = yield select(state => state.kundli.maleKundliData)
            const data = {
                day: parseInt(moment(kundliData.dob).format('D')),
                month: parseInt(moment(kundliData.dob).format('M')),
                year: parseInt(moment(kundliData.dob).format('YYYY')),
                hour: parseInt(moment(kundliData.tob).format('hh')),
                min: parseInt(moment(kundliData.tob).format('mm')),
                lat: kundliData.lat,
                lon: kundliData.lon,
                tzone: 5.5,
            };
            yield put({ type: actionTypes.SET_KUNDLI_PAYLOADS, payload: data })
            yield put({ type: actionTypes.SET_KUNDLI_BASIC_DETAILS, payload: kundliData })
            yield call(navigate, 'showKundli', { type: 'matching' })
        } else {
            const kundliData = yield select(state => state.kundli.femaleKundliData)
            const data = {
                day: parseInt(moment(kundliData.dob).format('D')),
                month: parseInt(moment(kundliData.dob).format('M')),
                year: parseInt(moment(kundliData.dob).format('YYYY')),
                hour: parseInt(moment(kundliData.tob).format('hh')),
                min: parseInt(moment(kundliData.tob).format('mm')),
                lat: kundliData.lat,
                lon: kundliData.lon,
                tzone: 5.5,
            };
            yield put({ type: actionTypes.SET_KUNDLI_PAYLOADS, payload: data })
            yield put({ type: actionTypes.SET_KUNDLI_BASIC_DETAILS, payload: kundliData })
            yield call(navigate, 'showKundli', { type: 'matching' })
        }
    } catch (e) {
        console.log(e)
    }
}
function* getOpenNumerology(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.customer.customerData)
        const response = yield postRequestNew({
            url: api_url + get_numerology,
            data: {
                customerId: customerData?._id
            }
        })
        console.log("Get Open Num Saga Response ::: ", response)
        console.log("Get Open Num Saga Response Data ::: ", response?.data)
        if (response?.success) {
            yield put({ type: actionTypes.SET_OPEN_NUMEROLOGY, payload: response?.data })
        } else {
            yield put({ type: actionTypes.SET_OPEN_NUMEROLOGY, payload: [] })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_OPEN_NUMEROLOGY, payload: [] })
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}
function* getDeleteNumerology(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const response = yield postRequestNew({
            url: api_url + delete_numerology,
            data: {
                ...payload,
            }
        })
        console.log('Delete Numerology Saga ::: ', response)
        console.log(response?.message, 'delete data ')
        if (response?.success) {
            // yield put({ type: actionTypes.SET_DELETE_NUMEROLOGY, payload: response?.data })
            yield put({ type: actionTypes.GET_OPEN_NUMEROLOGY, payload: null })
            showToastMessage({ message: response?.message })
        } else {
            yield put({ type: actionTypes.GET_OPEN_NUMEROLOGY, payload: null })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        yield put({ type: actionTypes.GET_OPEN_NUMEROLOGY, payload: null })
    }
}

export default function* kundliSaga() {
    yield takeLeading(actionTypes.CREATE_KUNDLI, createKundli)
    yield takeLeading(actionTypes.GET_ALL_KUNDLI, getAllKundli)
    yield takeLeading(actionTypes.DELETE_KUNDLI, deleteKundli)
    yield takeLeading(actionTypes.GET_KUNDLI_DATA, getKundliData)
    yield takeLeading(actionTypes.GET_KUNDLI_BIRTH_DETAILS, getKundliBirthDetails)
    yield takeLeading(actionTypes.GET_PLANET_DATA, getPlanetData)
    yield takeLeading(actionTypes.GET_KP_PLANET_DATA, getKpPlanetData)
    yield takeLeading(actionTypes.GET_KP_HOUSE_CUPS_DATA, getKpHouseCupsData)
    yield takeLeading(actionTypes.GET_KUNDLI_CHART_DATA, getKundliChart)
    yield takeLeading(actionTypes.GET_KUNDLI_CHARTS_IMAGE, getChartImage)
    yield takeLeading(actionTypes.GET_KUNDLI_MAJOR_DASHA, getKundliMajorDasha)
    yield takeLeading(actionTypes.GET_KUNDLI_SUB_V_DASHA, getKundliSubVDasha)
    yield takeLeading(actionTypes.GET_KUNDLI_SUB_SUB_V_DASHA, getKundliSubSubVDasha)
    yield takeLeading(actionTypes.GET_KUNDLI_SUB_SUB_SUB_V_DASHA, getKundliSubSubSubVDasha)
    yield takeLeading(actionTypes.GET_KUNDLI_SUB_SUB_SUB_SUB_V_DASHA, getKundliSubSubSubSubVDasha)
    yield takeLeading(actionTypes.GET_HOUSE_REPORTS, getKundliHouseReports)
    yield takeLeading(actionTypes.GET_KUNDLI_MATCHING_REPORT, getKundliMatchingReport)
    yield takeLeading(actionTypes.VIEW_KUNDLI_FROM_KUNDLI_MATCHING, viewKundliFromKundliMatching)
    yield takeLeading(actionTypes.GET_RASHI_REPORTS, RashiReportData);
    yield takeLeading(actionTypes.GET_ASTAK_REPORTS, AstakVargaData);
    yield takeLeading(actionTypes.GET_SARVA_REPORTS, SarVargaData);
    yield takeLeading(actionTypes.GET_ASCEDENT_REPORTS, AscendantData);
    yield takeLeading(actionTypes.GET_BASIC_PANCHANGE, BasicPanchangData);
    yield takeLeading(actionTypes.GET_NUMERO_REPORT, NumerologyData)
    yield takeLeading(actionTypes.GET_KUNDLI_MATCHING_ASHTAKOOT_POINTS, getAsstkoota);
    yield takeLeading(actionTypes.GET_BASIC_ASTRO_POINTS, getMatchBasicAstro);
    yield takeLeading(actionTypes.GET_KUNDLI_MATCHING_DSHKOOT_POINTS, getDaskoota);
    yield takeLeading(actionTypes.GET_KUNDLI_MATCHING_CONCLUSION_POINTS, getMatchConclusion);
    yield takeLeading(actionTypes.GET_KUNDLI_MATCHING_REPORT_POINTS, getMatchReport);
    yield takeLeading(actionTypes.GET_ASCEDENT_MATCHING_REPORTS, MatchingAscendantData);
    yield takeLeading(actionTypes.GET_KUNDLI_D7_CHARTS, getSaptmashaChart);
    yield takeLeading(actionTypes.GET_KUNDLI_D9_CHARTS, getNavmashaChart);
    yield takeLeading(actionTypes.GET_OPEN_NUMEROLOGY, getOpenNumerology);
    yield takeLeading(actionTypes.GET_DELETE_NUMEROLOGY, getDeleteNumerology);


}