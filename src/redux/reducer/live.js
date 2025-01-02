import * as actionTypes from '../actionTypes';

const initialState = {
  commentsData: [],
  liveID: '',
  streamID: '',
  giftDataVisible: false,
  giftData: null,
  heartData: [],
  exitAlertVisible: false,
  isLiveStart: false,
  roomUserCount: 0,
  liveCallsVisible: false,
  waitingListVisible: false,
  waitListData: [],
  coHostStartVisible: false,
  isCoHost: false,
  layout: 'LIVE',
  coHostData: null,
  giftedData: [],
  astroData: null,
  liveData: null,
  callInfoVisible: false,
  liveInvoiceData: null,
  liveInvoiceVisible: false,
  isMute: false
};

const live = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_COMMENTS:
      return {
        ...state,
        commentsData: [...payload, ...state.commentsData],
      };

    case actionTypes.CLEAR_COMMENTS:
      return {
        ...state,
        commentsData: [],
      };

    case actionTypes.SET_LIVE_ID:
      return {
        ...state,
        liveID: payload,
      };
    case actionTypes.SET_GIFT_DATA:
      return {
        ...state,
        giftData: payload,
      };
    case actionTypes.SET_GIFT_VISIBLE:
      return {
        ...state,
        giftDataVisible: payload,
      };
    case actionTypes.SET_HEARTS:
      return {
        ...state,
        heartData: payload,
      };
    case actionTypes.SET_EXIT_ALERT_VISIBLE:
      return {
        ...state,
        exitAlertVisible: payload,
      };

    case actionTypes.SET_IS_LIVE_START:
      return {
        ...state,
        isLiveStart: payload,
      };

    case actionTypes.SET_ROOM_USER_COUNT:
      return {
        ...state,
        roomUserCount: payload,
      };
    case actionTypes.SET_LIVE_CALLS_VISIBLE:
      return {
        ...state,
        liveCallsVisible: payload,
      };
    case actionTypes.SET_WAITING_LIST_VISIBLE:
      return {
        ...state,
        waitingListVisible: payload,
      };

    case actionTypes.SET_WAITLIST_DATA:
      return {
        ...state,
        waitListData: payload,
      };
    case actionTypes.SET_CO_HOST_REQUEST_VISIBLE:
      return {
        ...state,
        coHostStartVisible: payload,
      };
    case actionTypes.SET_IS_CO_HOST:
      return {
        ...state,
        isCoHost: payload,
      };
    case actionTypes.SET_STREAMING_ID:
      return {
        ...state,
        streamID: payload,
      };

    case actionTypes.SET_LAYOUT:
      return {
        ...state,
        layout: payload,
      };

    case actionTypes.SET_CO_HOST_DATA:
      return {
        ...state,
        coHostData: payload,
      };

    case actionTypes.SET_GIFTED_DATA:
      return {
        ...state,
        giftedData: [...payload, ...state.giftedData],
      };

    case actionTypes.SET_LIVE_ASTROLOGER_DATA:
      return {
        ...state,
        astroData: payload,
      };

    case actionTypes.SET_LIVE_DATA:
      return {
        ...state,
        liveData: payload,
      };

    case actionTypes.SET_CALL_INFO_VISIBLE:
      return {
        ...state,
        callInfoVisible: payload,
      };

    case actionTypes.SET_LIVE_INVOICE_VISIBLE:
      return {
        ...state,
        liveInvoiceData: payload?.data,
        liveInvoiceVisible: payload?.visible
      };
    case actionTypes.SET_LIVE_IS_MUTE:
      return {
        ...state,
        isMute: payload,
      };

    case actionTypes.RESET_LIVE_STATE:
      return {
        ...state,
        ...initialState,

      };

    default:
      return state;
  }
};

export default live;
