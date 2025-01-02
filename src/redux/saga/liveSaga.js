import {
  call,
  delay,
  getContext,
  put,
  select,
  takeEvery,
  takeLatest,
  takeLeading,
} from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';

import ZegoExpressEngine, {
  ZegoTextureView,
  ZegoMixerTask,
  ZegoAudioConfig,
  ZegoAudioConfigPreset,
  ZegoMixerInputContentType,
  ZegoScenario,
} from 'zego-express-engine-reactnative';
import { PermissionsAndroid, Platform, findNodeHandle } from 'react-native';
import { navigate, replace, resetToScreen } from '../../navigations/NavigationServices';
import { getRequest, postRequest } from '../../utils/apiRequests';
import {
  api_url,
  get_all_gift,
  live_streaming_app_id,
  live_streaming_app_sign,
  send_gift_in_live_streaming,
} from '../../config/constants';
import * as LiveActions from '../../redux/actions/LiveActions';
import { showToastMessage } from '../../utils/services';
import database from '@react-native-firebase/database';
import * as UserActions from '../../redux/actions/CustomerActions'

let heartCount = 1;

const task = new ZegoMixerTask('mix-stream-rn');

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomColor() {
  // Adjusted RGB values for pinkish tones
  return `rgb(${getRandomNumber(220, 255)}, ${getRandomNumber(
    50,
    100,
  )}, ${getRandomNumber(50, 100)})`;
}

const granted =
  Platform.OS == 'android'
    ? PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.RECORD_AUDIO,
    )
    : undefined;

function* createLiveProfile(actions) {
  try {
    const { payload } = actions;
    const profile = {
      appID: live_streaming_app_id,
      appSign: live_streaming_app_sign,
      scenario: ZegoScenario.General,
    };
    const response = yield ZegoExpressEngine.createEngineWithProfile(profile);
    response.getVersion().then(ver => {
      console.log('Express SDK Version: ' + ver);
      // yield put({type: actionTypes.SET_LIVE_ID, payload: payload?.liveId})
      navigate('liveScreen', { data: payload });
    });
  } catch (e) {
    console.log(e);
  }
}

function* addLiveListeners(actions) {
  try {
    const { startLive, dispatch, liveID, astroData, liveData } = actions.payload;
    const customerData = yield select(state => state.customer.customerData);
    yield put({ type: actionTypes.GET_GIFT_DATA, payload: null })
    yield put({ type: actionTypes.RESET_LIVE_STATE, payload: null })
    yield put({ type: actionTypes.SET_LIVE_ID, payload: liveID });
    yield put({ type: actionTypes.SET_LIVE_ASTROLOGER_DATA, payload: astroData })
    yield put({ type: actionTypes.SET_LIVE_DATA, payload: liveData })

    ZegoExpressEngine.instance().on(
      'roomStateUpdate',
      (roomID, state, errorCode, extendedData) => {
        console.log(
          'JS onRoomStateUpdate: ' +
          state +
          ' roomID: ' +
          roomID +
          ' err: ' +
          errorCode +
          ' extendData: ' +
          extendedData,
        );
      },
    );

    ZegoExpressEngine.instance().on(
      'IMRecvBroadcastMessage',
      (roomID, messageList) => {
        const messages = [];
        messageList.forEach((item, index) => {
          let new_comments = {
            message: item.message,
            sendTime: item.sendTime,
            fromUser: {
              userID: item.fromUser.userID,
              userName: item.fromUser.userName,
            },
          };
          messages.push(new_comments);
        });

        dispatch(LiveActions.setComments(messages));
      },
    );

    ZegoExpressEngine.instance().on(
      'IMRecvBarrageMessage',
      (roomID, messageList) => {
        const gifts = [];
        messageList.forEach((item, index) => {
          let new_gifts = {
            messageID: item.messageID,
            message: item.message,
            sendTime: item.sendTime,
            fromUser: {
              userID: item.fromUser.userID,
              userName: item.fromUser.userName,
            },
          };
          gifts.push(new_gifts);
        });
        dispatch(LiveActions.setGiftedData(gifts));
      },
    );

    ZegoExpressEngine.instance().on(
      'IMRecvCustomCommand',
      (roomID, fromUser, command) => {
        let my_command = JSON.parse(command);
        if (my_command?.command == 'heart') {
          dispatch(LiveActions.addHeartByOthers());
        } else if (my_command?.command == 'accept_call') {
          dispatch(LiveActions.setCoHostRequestVisible(true));
        } else if (my_command?.command == 'end_host') {
          dispatch(LiveActions.onEndCalling())
          // ZegoExpressEngine.instance().stopPlayingStream('333');
          // this.updateState({
          //   coHostUserData: null,
          //   isTimerStart: false,
          // });
        }
      },
    );

    ZegoExpressEngine.instance().on(
      'publisherStateUpdate',
      (streamID, state, errorCode, extendedData) => {
        console.log("streamID", streamID);
        console.log("state", state);
        console.log("errorCode", errorCode)
        console.log("extendedData", extendedData)
        if (state === 0) {
          dispatch(LiveActions.setLayout('LIVE'));
          dispatch(LiveActions.setStreamId(''));
          dispatch(UserActions.getCustomerData(customerData?._id))
        }
      },
    );

    ZegoExpressEngine.instance().on(
      'playerStateUpdate',
      (streamID, state, errorCode, extendedData) => {
        if (state === 2) {
          dispatch(
            LiveActions.sendComments(`${customerData?.customerName} Joined`),
          );
        }
      },
    );

    ZegoExpressEngine.instance().on(
      'roomStreamUpdate',
      (roomID, updateType, ZegoStream) => {
        console.log('ZegoStream', ZegoStream);
      },
    );

    ZegoExpressEngine.instance().on(
      'roomStreamUpdate',
      (roomID, updateType, ZegoStream) => {
        console.log(ZegoStream)
        dispatch(LiveActions.onStreamUpdate({ roomID, updateType, ZegoStream }));
      },
    );

    ZegoExpressEngine.instance().on(
      'roomExtraInfoUpdate',
      (roomID, roomExtraInfoList) => { },
    );

    ZegoExpressEngine.instance().on(
      'roomOnlineUserCountUpdate',
      (roomID, count) => {
        dispatch(LiveActions.setRoomUserCount(count));
      },
    );

    ZegoExpressEngine.instance().on('mixerSoundLevelUpdate', soundLevels => {
      /*soundLevels.array.forEach(element => {
                    console.log("JS onMixerSoundLevelUpdate: " + element)
                  });*/
      var level = soundLevels[0];

      console.log(
        'JS onMixerSoundLevelUpdate: ' +
        soundLevels[0] +
        ' type of: ' +
        typeof level,
      );
    });

    ZegoExpressEngine.instance().on(
      'mixerRelayCDNStateUpdate',
      (taskID, infoList) => {
        console.log('JS onMixerRelayCDNStateUpdate: ' + taskID);
      },
    );

    database()
      .ref(`LiveStreaming/${liveID}/WaitingList`)
      .on('value', snapshot => {
        if (snapshot.val() && snapshot.val() != 'null') {
          const myDataObject = snapshot.val();
          if (myDataObject) {
            const myDataArray = Object.keys(myDataObject)
              .sort()
              .map(key => myDataObject[key]);

            const callStartedTrue = myDataArray.filter(item => item.callStarted === true);
            const callStartedFalse = myDataArray.filter(item => item.callStarted !== true);

            const sortedData = [...callStartedTrue, ...callStartedFalse]

            // Dispatch the combined and reversed data
            dispatch(LiveActions.setWaitListData(sortedData));
          }
        } else {
          dispatch(LiveActions.setWaitListData([]));
        }
      });

    database()
      .ref(`LiveStreaming/${liveID}/coHostData`)
      .on('value', snapshot => {
        if (snapshot.val() && snapshot.val() != 'null') {
          dispatch(LiveActions.setCoHostData(snapshot.val()));
        } else {
          dispatch(LiveActions.setCoHostData(null));
        }
      });

    ZegoExpressEngine.instance().loginRoom(liveID, {
      userID: customerData?._id,
      userName: customerData?.customerName,
    });

    yield call(startLive);

    yield put({ type: actionTypes.SET_IS_LIVE_START, payload: true });
  } catch (e) {
    console.log('sdfnjsdfksdfksd', e);
  }
}

function* sendComments(actions) {
  try {
    const { payload } = actions;
    const liveID = yield select(state => state.live.liveID);
    const customerData = yield select(state => state.customer.customerData);
    const response = yield ZegoExpressEngine.instance().sendBroadcastMessage(
      liveID,
      payload,
    );

    if (response?.errorCode === 0) {
      let new_comments = {
        messageID: response.messageID,
        message: payload,
        sendTime: new Date().getTime(),
        fromUser: {
          userID: customerData?._id,
          userName: customerData?.customerName,
        },
      };
      yield put({
        type: actionTypes.SET_COMMENTS,
        payload: [new_comments],
      });
    }
  } catch (e) {
    console.log(e);
  }
}

function* getGiftData(actions) {
  try {
    const response = yield getRequest({
      url: api_url + get_all_gift,
    });

    if (response?.success) {
      yield put({ type: actionTypes.SET_GIFT_DATA, payload: response.gift });
    }
  } catch (e) {
    console.log(e);
  }
}

function* sendGiftToAstrologer(actions) {
  try {
    const { payload } = actions;

    const liveID = yield select(state => state.live.liveID);
    const customerData = yield select(state => state.customer.customerData);
    const response = yield postRequest({
      url: api_url + send_gift_in_live_streaming,
      data: {
        giftId: payload,
        liveId: liveID,
        customerId: customerData?._id,
      },
    });

    if (response?.success) {
      yield put({ type: actionTypes.SET_GIFTED_DATA, payload: [response?.gift] })
      yield put({ type: actionTypes.SET_CUSTOMER_DATA, payload: response?.updateCustomer })
    } else {
      showToastMessage({ message: 'Gift not sended' })
    }

    yield put({ type: actionTypes.SET_GIFT_VISIBLE, payload: false })

  } catch (e) {
    console.log(e);
  }
}

function* removeHeart(actions) {
  try {
    const { payload } = actions;
    const hearts = yield select(state => state.live.heartData);
    const newHeart = hearts.filter(heart => heart.id != payload);
    yield put({ type: actionTypes.SET_HEARTS, payload: newHeart });
  } catch (e) {
    console.log(e);
  }
}

function* addHeart(actions) {
  try {
    const { payload } = actions;
    const hearts = yield select(state => state.live.heartData);
    const liveID = yield select(state => state.live.liveID);

    ZegoExpressEngine.instance().sendCustomCommand(
      liveID,
      JSON.stringify({ command: 'heart' }),
    );

    const newHeart = {
      id: heartCount,
      right: getRandomNumber(0, 50),
      color: getRandomColor(),
    };

    const data = [...hearts, newHeart];

    heartCount++;

    yield put({ type: actionTypes.SET_HEARTS, payload: data });
  } catch (e) {
    console.log(e);
  }
}

function* addHeartByOthers(actions) {
  try {
    const hearts = yield select(state => state.live.heartData);

    const newHeart = {
      id: heartCount,
      right: getRandomNumber(0, 50),
      color: getRandomColor(),
    };

    const data = [...hearts, newHeart];

    heartCount++;

    yield put({ type: actionTypes.SET_HEARTS, payload: data });
  } catch (e) {
    console.log(e);
  }
}

function getStreamId() {
  const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    code += charset.charAt(randomIndex);
  }
  return code;
}

async function isItPersentInWaitingList(liveID, userID) {
  const waitListRef = database().ref(`LiveStreaming/${liveID}/WaitingList`);
  const snapshot = await waitListRef
    .orderByChild('userID')
    .equalTo(userID)
    .once('value');
  return snapshot.exists();
}

async function removeFromWaitingList(liveID, userID) {
  const waitListRef = database().ref(`LiveStreaming/${liveID}/WaitingList`);
  const snapshot = await waitListRef
    .orderByChild('userID')
    .equalTo(userID)
    .once('value');
  if (snapshot.exists()) {
    const key = Object.keys(snapshot.val())[0]
    database().ref(`LiveStreaming/${liveID}/WaitingList/${key}`).remove()
  }
  return
}

function* addInWaitingList(actions) {
  try {
    yield put({ type: actionTypes.SET_WAITING_LIST_VISIBLE, payload: false })
    yield put({ type: actionTypes.SET_LIVE_CALLS_VISIBLE, payload: false })
    const customerData = yield select(state => state.customer.customerData);
    const liveID = yield select(state => state.live.liveID);
    const liveData = yield select(state => state.live.liveData);
    if (liveData?.vedioCallPrice > customerData?.wallet_balance * 5) {
      showToastMessage({ message: 'Please add amount in your wallet.' })
      return
    }
    const isExits = yield call(
      isItPersentInWaitingList,
      liveID,
      customerData?._id,
    );
    if (isExits) {
      yield call(showToastMessage, {
        message: 'You are already in waiting list',
      });
    } else {
      const waitListRef = database().ref(`LiveStreaming/${liveID}/WaitingList`);
      const node = waitListRef.push();
      database().ref(`LiveStreaming/${liveID}/WaitingList/${node.key}`).set({
        userID: customerData?._id,
        userName: customerData?.customerName,
        wallet: customerData?.wallet_balance,
        type: 'vedio',
        joingTime: new Date().getTime(),
        callStarted: false
      });
      showToastMessage({ message: 'You joined waiting list' })
    }
  } catch (e) {
    console.log(e);
  }
}

function* onGoLive(actions) {
  try {
    const streamID = getStreamId();
    const liveID = yield select(state => state.live.liveID);
    ZegoExpressEngine.instance().startPublishingStream(streamID);
    yield put({ type: actionTypes.SET_STREAMING_ID, payload: streamID });
    yield put({ type: actionTypes.SET_LAYOUT, payload: 'VEDIO_CALL' });
    let command = {
      streamID: streamID,
      command: 'start_co_host',
      time: 300,
      type: 'vedio',
    };
    ZegoExpressEngine.instance()
      .sendCustomCommand(liveID, JSON.stringify(command))
    yield put({ type: actionTypes.SET_CO_HOST_REQUEST_VISIBLE, payload: false })
  } catch (e) {
    console.log(e);
  }
}

function* onCancelCallRequest(actions) {
  try {
    const liveID = yield select(state => state.live.liveID)
    const customerData = yield select(state => state.customer.customerData)
    const astroData = yield select(state => state.live.astroData)
    yield call(removeFromWaitingList, liveID, customerData?._id)
    ZegoExpressEngine.instance().sendCustomCommand(
      liveID,
      JSON.stringify({ command: 'cancel_call' }),
      [{ userID: astroData?._id, userName: astroData?.astrologerName }]
    );
    yield put({ type: actionTypes.SET_CO_HOST_REQUEST_VISIBLE, payload: false })
  } catch (e) {
    console.log(e)
  }
}

function* onEndCalling(actions) {
  try {
    ZegoExpressEngine.instance().stopPublishingStream();
  } catch (e) {
    console.log(e);
  }
}

function* onStreamUpdate(actions) {
  try {
    const { roomID, updateType, ZegoStream } = actions.payload;
    const liveID = yield select(state => state.live.liveID);
    const customerData = yield select(state => state.customer.customerData);

    let foundObject = null;

    let astrologerKey = null

    for (let obj of ZegoStream) {
      if (obj['streamID'] != liveID && obj['user']?.userID != customerData?._id) {
        foundObject = obj;
        break;
      }
    }

    for (let obj of ZegoStream) {
      if (obj['streamID'] == liveID) {
        astrologerKey = obj;
        break;
      }
    }

    if (foundObject !== null) {
      if (updateType === 0) {
        yield put({
          type: actionTypes.SET_STREAMING_ID,
          payload: foundObject?.streamID,
        });
        yield put({ type: actionTypes.SET_LAYOUT, payload: 'CO_HOSTING' });

      } else if (updateType === 1) {
        yield put({
          type: actionTypes.SET_STREAMING_ID,
          payload: '',
        });
        yield put({ type: actionTypes.SET_LAYOUT, payload: 'LIVE' });
      }
    }

    if (astrologerKey != null) {
      if (updateType === 1) {
        showToastMessage({ message: 'Astrologer ended the live streaming' })
        yield call(navigate, 'astroLive')
      }
    }

  } catch (e) {
    console.log(e);
  }
}

function* onLiveMuteUnmute(actions) {
  try {
    const isMute = yield select(state => state.live.isMute)

    ZegoExpressEngine.instance().mutePublishStreamAudio(!isMute)

    yield put({ type: actionTypes.SET_LIVE_IS_MUTE, payload: !isMute })

  } catch (e) {
    console.log(e)
  }
}

function* onAppStateChangeInLive(actions) {
  try {
    const {payload} = actions
    ZegoExpressEngine.instance().mutePublishStreamVideo(payload)

  } catch (e) {
    console.log(e)
  }
}


export default function* liveSaga() {
  yield takeLeading(actionTypes.CREATE_LIVE_PROFILE, createLiveProfile);
  yield takeLeading(actionTypes.ADD_LIVE_LISTENER, addLiveListeners);
  yield takeLeading(actionTypes.SEND_COMMENTS, sendComments);
  yield takeLeading(actionTypes.GET_GIFT_DATA, getGiftData);
  yield takeLeading(actionTypes.SEND_GIFT_TO_ASTROLOGER, sendGiftToAstrologer);
  yield takeLeading(actionTypes.REMOVE_HEART, removeHeart);
  yield takeEvery(actionTypes.ADD_HEART, addHeart);
  yield takeLeading(actionTypes.ADD_IN_WAITING_LIST, addInWaitingList);
  yield takeLeading(actionTypes.ON_GO_LIVE, onGoLive);
  yield takeLeading(actionTypes.ON_END_CALLING, onEndCalling);
  yield takeLeading(actionTypes.ON_CANCEL_CALL_REQUEST, onCancelCallRequest);
  yield takeLeading(actionTypes.ADD_HEART_BY_OTHERS, addHeartByOthers);
  yield takeLeading(actionTypes.ON_STREAM_UPDATE, onStreamUpdate);
  yield takeLeading(actionTypes.ON_LIVE_MUTE_UNMUTE, onLiveMuteUnmute);
  yield takeLeading(actionTypes.ON_APP_STATE_CHANGE_IN_LIVE, onAppStateChangeInLive);
}
