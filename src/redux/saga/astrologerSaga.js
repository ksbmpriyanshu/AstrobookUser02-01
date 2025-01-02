import { put, select, takeLatest, takeLeading } from 'redux-saga/effects';
import { getRequest, postRequest } from '../../utils/apiRequests';
import * as actionTypes from '../actionTypes';
import {
  add_review,
  api_url,
  check_customer_following,
  follow_astrolgoer,
  generator_call_id,
  get_astrologer_details,
  get_call_astrologer,
  get_chat_astrologer,
  get_filter_data,
  get_language_data,
  get_live_streaming,
  get_recent_live_streaming,
  get_skill_data,
  get_verified_astrologer_review,
  get_video_call_astrologers,
  initiate_call_with_exotel,
} from '../../config/constants';
import { showToastMessage } from '../../utils/services';
import { resetToScreen } from '../../navigations/NavigationServices';
import { makeZegoCall } from '../../utils/zegoServices';
import { changeLanguage } from 'i18next';
import axios from 'axios';
import { utils } from 'react-native-gifted-chat';

function* getAstrologerData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    yield put({ type: actionTypes.ON_CHECK_IS_FOLLOW, payload: payload })

    const astrologerResponse = yield postRequest({
      url: api_url + get_astrologer_details,
      data: {
        astrologerId: payload,
      },
    });

    const reviewResponse = yield postRequest({
      url: api_url + get_verified_astrologer_review,
      data: {
        astrologer_id: payload,
      },
    });

    if (astrologerResponse?.success) {
      yield put({
        type: actionTypes.SET_ASTROLOGER_DATA,
        payload: astrologerResponse,
      });
    }

    if (reviewResponse?.success) {
      yield put({
        type: actionTypes.SET_ASTROLOGER_REVIEW_DATA,
        payload: reviewResponse,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log('hii', e);
  }
}

function* getLiveAstroListData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield getRequest({
      url: api_url + get_live_streaming,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.SET_LIVE_ASTROLOGER_DATA,
        payload: response?.liveAstrologer,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log('hii', e);
  }
}

function* getRecentLiveStreamings(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield getRequest({
      url: api_url + get_recent_live_streaming,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.SET_RECENT_LIVESTREAMINGS,
        payload: response?.results,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log('hii', e);
  }
}

function* onRefreshLiveAstrologer(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_REFRESHING, payload: true });

    const response = yield getRequest({
      url: api_url + get_live_streaming,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.SET_LIVE_ASTROLOGER_DATA,
        payload: response?.liveAstrologer,
      });
    }

    yield put({ type: actionTypes.SET_IS_REFRESHING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_REFRESHING, payload: false });
    console.log('hii', e);
  }
}

function* getCallAstroListData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield getRequest({
      url: api_url + get_chat_astrologer,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.SET_CALL_ASTROLOGERS,
        payload: { data: response?.results, pagination: response?.pagination },
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log('hii', e);
  }
}

function* getMoreCallAstroListData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_MORE_LOADING, payload: true });
    const pagination = yield select(state => state.astrologer.callListPagination)
    const callAstroData = yield select(state => state.astrologer.callListData)

    const response = yield postRequest({
      url: api_url + get_call_astrologer,
      data: {
        page: pagination?.page + 1,
        search: payload
      }
    });

    if (response?.success) {
      yield put({
        type: actionTypes.SET_CALL_ASTROLOGERS,
        payload: { data: [...callAstroData, ...response?.astrologer], pagination: response?.pagination },
      });
    }

    yield put({ type: actionTypes.SET_IS_MORE_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_MORE_LOADING, payload: false });
    console.log('hii', e);
  }
}

function* getMoreChatAstroListData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_MORE_LOADING, payload: true });
    const pagination = yield select(state => state.astrologer.chatListPagination)
    const chatListData = yield select(state => state.astrologer.chatListData)

    const response = yield postRequest({
      url: api_url + get_chat_astrologer,
      data: {
        page: pagination?.page + 1,
        search: payload
      }
    });

    if (response?.success) {
      yield put({
        type: actionTypes.SET_CHAT_ASTROLOGERS,
        payload: { data: [...chatListData, ...response?.astrologer], pagination: response?.pagination },
      });
    }

    yield put({ type: actionTypes.SET_IS_MORE_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_MORE_LOADING, payload: false });
    console.log('hii', e);
  }
}

function* getChatAstroListData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const params = new URLSearchParams();
    if (payload?.mainExpertise) params.append('mainExpertise', payload.mainExpertise);
    if (payload?.page) params.append('page', payload.page);
    if (payload?.skill) params.append('skill', payload.skill);
    if (payload?.language) params.append('language', payload.language);
    if (payload?.gender) params.append('gender', payload.gender);
    const url = `${api_url}${get_chat_astrologer}?limit=200?${params.toString()}`;
    console.log("check Filter URL",url);

  const response = yield getRequest({
      url: url,
    });
   console.log("response>>>>>>>>",response?.results)

    if (response?.success) {
      yield put({
        type: actionTypes.SET_CHAT_ASTROLOGERS,
        payload: { data: response?.results, pagination: response?.pagination },
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log('hii', e);
  }
}

function* onRefreshCallAstrologer(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_REFRESHING, payload: true });

    const response = yield postRequest({
      url: api_url + get_call_astrologer,
      data: {
        page: 1,
      },
    });

    if (response?.success) {
      yield put({
        type: actionTypes.SET_CALL_ASTROLOGERS,
        payload: { data: response?.astrologer, pagination: response?.pagination },
      });
    }

    yield put({ type: actionTypes.SET_IS_REFRESHING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_REFRESHING, payload: false });
    console.log('hii', e);
  }
}

function* onRefreshChatAstrologer(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_REFRESHING, payload: true });
    const response = yield postRequest({
      url: api_url + get_chat_astrologer,
      data: {
        page: 1,
      },
    });

    if (response?.success) {
      yield put({
        type: actionTypes.SET_CHAT_ASTROLOGERS,
        payload: { data: response?.astrologer, pagination: response?.pagination },
      });
    }

    yield put({ type: actionTypes.SET_IS_REFRESHING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_REFRESHING, payload: false });
    console.log('hii', e);
  }
}

function* onCallToAstrologer(actions) {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { payload } = actions;
    console.log(payload)
    const response = yield postRequest({
      url: api_url + initiate_call_with_exotel,
      header: 'json',
      data: payload,
    })

    console.log("call status:::::>>>>",response)
    if (response?.success) {
      resetToScreen('home')
      showToastMessage({ message: 'Call Initiated' })
    } else {
      showToastMessage({ message: response?.message })
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

  } catch (e) {
    console.log(e)
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
  }
}

function* onVideoCallToAstrologer(actions) {
  try {
    const { customerId, astrologerId, formId, astrologerName, navigation,chatPrice} = actions.payload
    console.log(customerId,astrologerId,chatPrice,'call id generator part')
    const newInvitees = [{ userID: astrologerId, userName:astrologerName }]

    const data  = {
      customerId: customerId,
      astrologerId: astrologerId,
      videcallPrice: chatPrice,
      formId: formId,
    }

    //generator Call id
    const response = yield axios.post(api_url + generator_call_id,data);
    console.log('Response Call ID ::::',response.data);
    if(response.data.success) {
      yield makeZegoCall({ isVideo: true, navigation, newInvitees, data: response.data.data })
    } else {
      showToastMessage({ message: "Invalid Call Id Generator"});
    }

    
  } catch (e) {
    console.log(e,'video error')
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
  }
}

function* onAstrolgoerRating(actions) {
  console.log('1')
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
    const { payload } = actions
    console.log(payload,'astropayload')
    const customerData = yield select(state => state.customer.customerData)
    const response = yield postRequest({
      url: api_url + add_review,
      data: {
        ...payload,
        customerId: customerData?._id
      }
    })
    console.log('2')
    if (response?.success) {
      yield put({ type: actionTypes.SET_ASTRO_RATING_VISIBLE, payload: { data: null, ratingVisible: false } })
      console.log('3')
      showToastMessage({message: 'Rating submit successfully'})
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

  } catch (e) {
    console.log(e)
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    console.log('er4')
  }
}

function* onCheckIsFollow(actions) {
  try {
    const { payload } = actions
    const customerData = yield select(state => state.customer.customerData)
    const response = yield postRequest({
      url: api_url + check_customer_following,
      data: {
        customerId: customerData?._id,
        astrologerId: payload
      }
    })

    if (response?.success) {
      yield put({ type: actionTypes.SET_IS_FOLLOW_ASTROLOGER, payload: response?.follow })
    }

  } catch (e) {
    console.log(e)
  }
}

function* onFollowAstrologer(actions) {
  try {
    const { payload } = actions
    const customerData = yield select(state => state.customer.customerData)
    const astroData = yield select(state => state.astrologer.astroData)
    const isFollow = yield select(state => state.astrologer.isFollow)
    const response = yield postRequest({
      url: api_url + follow_astrolgoer,
      data: {
        customerId: customerData?._id,
        astrologerId: payload,
        action: isFollow ? 'unfollow' : 'follow'
      }
    })

    if (response?.success) {
      yield put({ type: actionTypes.ON_CHECK_IS_FOLLOW, payload: payload })
      yield put({ type: actionTypes.SET_ASTROLOGER_DATA, payload: { ...astroData, follower_count: isFollow ? astroData?.follower_count - 1 : astroData?.follower_count + 1 } })
      yield put({ type: actionTypes.GET_FOLLOWING_LIST, payload: null })
      showToastMessage({ message: response?.message })
    }
  } catch (e) {
    console.log(e)
  }
}
function* getVideoCallAstroListData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield getRequest({
      url: api_url + get_chat_astrologer,
      
    });
    if (response?.success) {
      yield put({
        type: actionTypes.SET_VIDEO_CALL_ASTROLOGERS,
        payload: { data: response?.results, pagination: response?.pagination },
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log('hii', e);
  }
}
function* getFilterAstroListData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield getRequest({
      url: api_url + get_filter_data,
    });
  console.log("response",response)
    if (response?.success) {
      yield put({
        type: actionTypes.SET_FILTER_DATA,
        payload: response?.mainExpertise,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log('hii', e);
  }
}
function* getSkillAstroListData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      
      const  url= api_url + get_skill_data
      console.log("lksadhoifs peujrp wpe po",url)
    const response = yield getRequest({
      url: api_url + get_skill_data,
    });
  console.log("response>LHKLHL?",response)
    if (response?.success) {
      yield put({
        type: actionTypes.SET_SKILL_DATA,
        payload: response?.skills,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log('hii', e);
  }
}
function* getLanguageAstroListData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
    const response = yield getRequest({
      url: api_url + get_language_data,
    });
  console.log("response>LHKLHL?",response)
    if (response?.success) {
      yield put({
        type: actionTypes.SET_LANGUAGE_DATA,
        payload: response?.languageData,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log('hii', e);
  }
}
export default function* astrologerSaga() {
  yield takeLeading(actionTypes.GET_ASTROLOGER_DATA, getAstrologerData);
  yield takeLeading(actionTypes.GET_LIVE_ASTROLOGER_DATA, getLiveAstroListData);
  yield takeLeading(actionTypes.GET_RECENT_LIVESTREAMINGS, getRecentLiveStreamings);
  yield takeLeading(actionTypes.ON_REFRESH_LIVE_ASTROLOGER, onRefreshLiveAstrologer);
  yield takeLeading(actionTypes.GET_CALL_ASTROLOGERS, getCallAstroListData);
  yield takeLeading(actionTypes.GET_VIDEO_CALL_ASTROLOGERS,getVideoCallAstroListData);
  yield takeLeading(actionTypes.GET_MORE_CALL_ASTROLOGERS, getMoreCallAstroListData);
  yield takeLeading(actionTypes.GET_MORE_CHAT_ASTROLOGERS, getMoreChatAstroListData);
  yield takeLeading(actionTypes.GET_CHAT_ASTROLOGERS, getChatAstroListData);
  yield takeLeading(actionTypes.ON_REFRESH_CALL_ASTROLOGER, onRefreshCallAstrologer);
  yield takeLeading(actionTypes.ON_REFRESH_CHAT_ASTROLOGER, onRefreshChatAstrologer);
  yield takeLeading(actionTypes.ON_CALL_TO_ASTROLOGER, onCallToAstrologer);
  yield takeLeading(actionTypes.ON_VIDEO_CALL_TO_ASTROLOGER, onVideoCallToAstrologer);
  yield takeLeading(actionTypes.ON_CHECK_IS_FOLLOW, onCheckIsFollow);
  yield takeLeading(actionTypes.ON_FOLLOW_UNFOLLOW_ASTROLOGER, onFollowAstrologer);
  yield takeLeading(actionTypes.ON_ASTRO_RATING, onAstrolgoerRating);
  yield takeLeading(actionTypes.GET_FILTER_DATA, getFilterAstroListData);
  yield takeLeading(actionTypes.GET_SKILL_DATA, getSkillAstroListData);
  yield takeLeading(actionTypes.GET_LANGUAGE_DATA, getLanguageAstroListData);

}
