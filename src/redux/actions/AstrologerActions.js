import * as actionTypes from '../actionTypes';

export const getAstrologerData = payload => ({
  type: actionTypes.GET_ASTROLOGER_DATA,
  payload,
})

export const setAstrologerData = payload => ({
  type: actionTypes.SET_ASTROLOGER_DATA,
  payload,
})

export const setAstrologerReviewData = payload => ({
  type: actionTypes.SET_ASTROLOGER_REVIEW_DATA,
  payload,
})

export const getLiveAstrologerData = payload => ({
  type: actionTypes.GET_LIVE_ASTROLOGER_DATA,
  payload,
})

export const setLiveAstrologerData = payload => ({
  type: actionTypes.SET_LIVE_ASTROLOGER_DATA,
  payload,
})

export const getRecentLiveStreamings = payload => ({
  type: actionTypes.GET_RECENT_LIVESTREAMINGS,
  payload,
})

export const setRecentLiveStreamings = payload => ({
  type: actionTypes.SET_RECENT_LIVESTREAMINGS,
  payload,
})

export const onRefreshLiveAstrologer = payload => ({
  type: actionTypes.ON_REFRESH_LIVE_ASTROLOGER,
  payload,
})

export const getCallAstroData = payload => ({
  type: actionTypes.GET_CALL_ASTROLOGERS,
  payload,
})

export const getMoreCallAstroData = payload => ({
  type: actionTypes.GET_MORE_CALL_ASTROLOGERS,
  payload,
})
export const getMoreChatAstroData = payload => ({
  type: actionTypes.GET_MORE_CHAT_ASTROLOGERS,
  payload,
})

export const setCallAstrologers = payload => ({
  type: actionTypes.SET_CALL_ASTROLOGERS,
  payload,
})

export const onRefreshCallAstrologer = payload => ({
  type: actionTypes.ON_REFRESH_CALL_ASTROLOGER,
  payload,
})
export const getChatAstroData = payload => ({
  type: actionTypes.GET_CHAT_ASTROLOGERS,
  payload,
})

export const setChatAstrologers = payload => ({
  type: actionTypes.SET_CHAT_ASTROLOGERS,
  payload,
})

export const onRefreshChatAstrologer = payload => ({
  type: actionTypes.ON_REFRESH_CHAT_ASTROLOGER,
  payload,
})

export const onCallToAstrologer = payload => ({
  type: actionTypes.ON_CALL_TO_ASTROLOGER,
  payload,
})

export const setAstroRatingVisible = payload => ({
  type: actionTypes.SET_ASTRO_RATING_VISIBLE,
  payload,
})

export const onAstroRating = payload => ({
  type: actionTypes.ON_ASTRO_RATING,
  payload,
})

export const onFollowUnfollowAstrologer = payload => ({
  type: actionTypes.ON_FOLLOW_UNFOLLOW_ASTROLOGER,
  payload
})

export const onCheckIsFollow = payload => ({
  type: actionTypes.ON_CHECK_IS_FOLLOW,
  payload,
})

export const setIsFollowAstrologer = payload => ({
  type: actionTypes.SET_IS_FOLLOW_ASTROLOGER,
  payload,
})
export const getVideoCallAstrologers = payload => ({
  type: actionTypes.GET_VIDEO_CALL_ASTROLOGERS,
  payload,
})
export const setVideoCallAstrologers = payload => ({
  type: actionTypes.SET_VIDEO_CALL_ASTROLOGERS,
  payload,
})


export const getFilterData = payload => ({
  type: actionTypes.GET_FILTER_DATA,
  payload,
})

export const setFilterData = payload => ({
  type: actionTypes.SET_FILTER_DATA,
  payload,
})
export const getSkillData = payload => ({
  type: actionTypes.GET_SKILL_DATA,
  payload,
})

export const setSkillData = payload => ({
  type: actionTypes.SET_SKILL_DATA,
  payload,
})
export const getlanguageData = payload => ({
  type: actionTypes.GET_LANGUAGE_DATA,
  payload,
})

export const setlanguageData = payload => ({
  type: actionTypes.SET_LANGUAGE_DATA,
  payload,
})