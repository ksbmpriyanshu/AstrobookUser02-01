import * as actionTypes from '../actionTypes';
const initialState = {
  astroData: null,
  callListData: null,
  chatListData: null,
  reviewData: null,
  liveAstroListData: null,
  recentLiveSteamingsData: null,
  isFollow: false,
  astroRatingVisible: false,
  ratingData: null,
  callListPagination: null,
  chatListPagination: null,
  videoCallAstrologers: null,
  filterData:null,
  skillData:null,
  languageData:null
};
const astrologer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SET_ASTROLOGER_DATA:
      return {
        ...state,
        astroData: payload,
      };

    case actionTypes.SET_ASTROLOGER_REVIEW_DATA:
      return {
        ...state,
        reviewData: payload,
      };

    case actionTypes.SET_LIVE_ASTROLOGER_DATA:
      return {
        ...state,
        liveAstroListData: payload,
      };
    case actionTypes.SET_RECENT_LIVESTREAMINGS:
      return {
        ...state,
        recentLiveSteamingsData: payload,
      };

    case actionTypes.SET_CALL_ASTROLOGERS:
      return {
        ...state,
        callListData: payload?.data,
        callListPagination: payload?.pagination,
      };
    case actionTypes.SET_CHAT_ASTROLOGERS:
      return {
        ...state,
        chatListData: payload?.data,
        chatListPagination: payload?.pagination,
      };
    case actionTypes.SET_ASTRO_RATING_VISIBLE:
      return {
        ...state,
        ratingData: payload?.data,
        astroRatingVisible: payload?.ratingVisible
      }
    case actionTypes.SET_IS_FOLLOW_ASTROLOGER:
      return {
        ...state,
        isFollow: payload
      }
      case actionTypes.SET_VIDEO_CALL_ASTROLOGERS:
      return {
        ...state,
        videoCallAstrologers: payload
      }
      case actionTypes.SET_FILTER_DATA:
        return {
          ...state,
          filterData: payload
        }
        case actionTypes.SET_SKILL_DATA:
          return {
            ...state,
            skillData: payload
          }
          case actionTypes.SET_LANGUAGE_DATA:
            return {
              ...state,
              languageData: payload
            }
    default:
      return state;
  }
};

export default astrologer;
