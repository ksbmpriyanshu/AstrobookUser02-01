
import * as actionTypes from '../actionTypes'

const initialState = {
    kundliId: null,
    kundliPayloads: null,
    kundliListData: null,
    masterKundliListData: null,
    birthDetailsData: null,
    chartImage: null,
    chartData: null,
    basicDetails: null,
    planetData: null,
    kpPlanetData: null,
    kpHouseCupsData: null,
    dashaVisible: 'MAJOR',
    dashaPath: '',
    majorDashaData: null,
    subVDashaData: null,
    subSubVDashaData: null,
    subSubSubVDashaData: null,
    subSubSubSubVDashaData: null,
    houseReportData: null,
    maleKundliData: null,
    femaleKundliData: null,
    matchingAshtakootPointsData: null,
    kundliRashiReport: null,
    AshtakvargaReport: null,
    SarvaReport: null,
    AscedentReport: null,
    Panchang: null,
    MatchBasicDetails: null,
    BasicAstroMatching: null,
    MatchingReport: null,
    ConclusionReport: null,
    DashKootReport: null,
    MatchAscedentReport: null,
    Saptamanshachart: null,
    Navamanshachart: null,
    openNumerologyData: null,
    deleteNumerologyData: null,

}

const kundli = (state = initialState, actions) => {
    const { type, payload } = actions;
    switch (type) {
        case actionTypes.SET_KUNDLI_PAYLOADS:
            return {
                ...state,
                kundliPayloads: payload
            }
        case actionTypes.RESET_KUNDLI_DATA:
            return {
                ...initialState,
                kundliListData: state.kundliListData,
                maleKundliData: state.maleKundliData,
                femaleKundliData: state.femaleKundliData,
                matchingAshtakootPointsData: state.matchingAshtakootPointsData
            }
        case actionTypes.SET_KUNDLI_ID:
            return {
                ...state,
                kundliId: payload
            }
        case actionTypes.SET_ALL_KUNDLI:
            return {
                ...state,
                kundliListData: payload,
            }
        case actionTypes.SET_ALL_MASTRER_KUNDLI:
            return {
                ...state,
                masterKundliListData: payload,
            }
        case actionTypes.SET_KUNDLI_BIRTH_DETAILS:
            return {
                ...state,
                birthDetailsData: payload
            }
        case actionTypes.SET_KUNDLI_CHARTS_IMAGE:
            return{
                ...state,
                chartImage: payload
            }
        case actionTypes.SET_KUNDLI_CHARTS:
            return {
                ...state,
                chartData: payload
            }
        case actionTypes.SET_KUNDLI_BASIC_DETAILS:
            return {
                ...state,
                basicDetails: payload
            }
        case actionTypes.SET_PLANET_DATA:
            return {
                ...state,
                planetData: payload
            }
        case actionTypes.SET_KP_PLANET_DATA:
            return {
                ...state,
                kpPlanetData: payload
            }
        case actionTypes.SET_KP_HOUSE_CUPS_DATA:
            return {
                ...state,
                kpHouseCupsData: payload
            }
        case actionTypes.SET_KUNDLI_MAJOR_DASHA:
            return {
                ...state,
                majorDashaData: payload
            }
        case actionTypes.SET_KUNDLI_DAHSA_VISIBLE:
            return {
                ...state,
                dashaVisible: payload,
            }
        case actionTypes.SET_KUNDLI_DASHA_PATH:
            return {
                ...state,
                dashaPath: payload,
            }
        case actionTypes.SET_KUNDLI_SUB_V_DASHA:
            return {
                ...state,
                dashaVisible: 'ANTAR',
                subVDashaData: payload
            }
        case actionTypes.SET_KUNDLI_SUB_SUB_V_DASHA:
            return {
                ...state,
                dashaVisible: 'PRATYANTAR',
                subSubVDashaData: payload
            }
        case actionTypes.SET_KUNDLI_SUB_SUB_SUB_V_DASHA:
            return {
                ...state,
                dashaVisible: 'SOOKSHMA',
                subSubSubVDashaData: payload
            }
        case actionTypes.SET_KUNDLI_SUB_SUB_SUB_SUB_V_DASHA:
            return {
                ...state,
                dashaVisible: 'PRAN',
                subSubSubSubVDashaData: payload
            }
        case actionTypes.SET_HOUSE_REPORTS:
            return {
                ...state,
                houseReportData: payload
            }
        case actionTypes.SET_MALE_KUNDLI_DATA:
            return {
                ...state,
                maleKundliData: payload
            }
        case actionTypes.SET_FEMALE_KUNDLI_DATA:
            return {
                ...state,
                femaleKundliData: payload
            }
        case actionTypes.SET_KUNDLI_MATCHING_ASHTAKOOT_POINTS:
            return {
                ...state,
                matchingAshtakootPointsData: payload
            }
        case actionTypes.SET_RASHI_REPORTS:
            return {
                ...state,
                kundliRashiReport: payload
            }
        case actionTypes.SET_ASTAK_REPORTS:
            return {
                ...state,
                AshtakvargaReport: payload
            }
        case actionTypes.SET_SARVA_REPORTS:
            return {
                ...state,
                SarvaReport: payload
            }
        case actionTypes.SET_ASCEDENT_REPORTS:
            return {
                ...state,
                AscedentReport: payload
            }
        case actionTypes.SET_BASIC_PANCHANGE:
            return {
                ...state,
                Panchang: payload
            }
        case actionTypes.SET_KUNDLI_BASIC_DETAILS_MATCHING:
            return {
                ...state,
                MatchBasicDetails: payload
            }
        case actionTypes.SET_BASIC_ASTRO_POINTS:
            return {
                ...state,
                BasicAstroMatching: payload
            }
        case actionTypes.SET_KUNDLI_MATCHING_REPORT_POINTS:
            return {
                ...state,
                MatchingReport: payload
            }
        case actionTypes.SET_KUNDLI_MATCHING_CONCLUSION_POINTS:
            return {
                ...state,
                ConclusionReport: payload
            }
        case actionTypes.SET_KUNDLI_MATCHING_DSHKOOT_POINTS:
            return {
                ...state,
                DashKootReport: payload
            }
        case actionTypes.SET_ASCEDENT_MATCHING_REPORTS:
            return {
                ...state,
                MatchAscedentReport: payload
            }
        case actionTypes.SET_KUNDLI_D7_CHARTS:
            return {
                ...state,
                Saptamanshachart: payload
            }
        case actionTypes.SET_KUNDLI_D9_CHARTS:

            return {
                ...state,
                Navamanshachart: payload
            }
            case actionTypes.SET_OPEN_NUMEROLOGY:

            return {
                ...state,
                openNumerologyData: payload
            }
            case actionTypes.SET_DELETE_NUMEROLOGY:

            return {
                ...state,
                deleteNumerologyData: payload
            }

        case actionTypes: SET_NUMERO_REPORT
        default: {
            return state;
        }

    }
}

export default kundli;