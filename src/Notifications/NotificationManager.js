import notifee, {
  AndroidCategory,
  AndroidImportance,
  AndroidLaunchActivityFlag,
  AndroidVisibility,
} from '@notifee/react-native';
import { Linking } from 'react-native';
import { base_url } from '../config/constants';
// import * as NotificationActions from '../redux/actions/NotificationActions'
import { resetToScreen } from '../navigations/NavigationServices';
import * as ChatActions from '../redux/actions/ChatActions'
import { showToastMessage } from '../utils/services';
import * as CustomerActions from '../redux/actions/CustomerActions'
import * as LiveActions from '../redux/actions/LiveActions'

export const NotificationInitialize = async () => {
  await notifee.requestPermission();
};

export const cancel = async notificationId => {
  await notifee.cancelNotification(notificationId);
};

export const onNotification = (message, dispatch) => {
  try {
    const { data } = message;
    const { type } = data;
    console.log('data ::::::::::>>>>',JSON.stringify(data));
    switch (type) {
      case 'chat_request': {
        dispatch(ChatActions.onAcceptRejectChat({ status: 'accept', requestedData: data }))
        break;
      }

      case 'call_request': {
        // dispatch(NotificationActions.getTotalAstroRequests(data?.astroID))
        // dispatch(NotificationActions.setAstroNewRequests('astroCalls'))
        // dispatch(NotificationActions.setAstroIsNewRequest(true))
        break;
      }

      case 'call_invoice': {
        console.log('call invoice',data?.data)
        resetToScreen('home')
        dispatch(CustomerActions.getCustomerData())
        dispatch(ChatActions.setCallInvoiceData(data?.data))
        dispatch(ChatActions.setCallInvoiceVisible(true))
        break;
      }
      case 'live_call_invoice': {
        dispatch(LiveActions.setLiveInvoiceVisible({ data: data?.liveCall, visible: true }))
        break;
      }

      case 'VideoCall': {
        console.log('video call',data)
        resetToScreen('home')
        dispatch(ChatActions.setvideoInvoiceData(data));
        dispatch(ChatActions.setVideoCallInvoiceVisible(true))
        break;
      }

      case 'call_not_connected': {
        resetToScreen('home')
        showToastMessage({ message: 'Call not connected' })
        break;
      }

      default: {
        onDisplayNotification({
          data,
        });
        break;
      }
    }
  } catch (e) {
    console.log(e);
  }
};

export const onBackgroundNotification = message => {
  try {
    console.log(message, 'video::::::::');
    const { data } = message;
    const { type } = data;
    switch (type) {
      case 'chat_request': {
        onChatRequestNotification({
          data,
        });
        break;
      }
      case 'call_request': {
        // ChatCallRequests.onCallRequest({callerName: data?.customerName, requestType: 'Call'})
        // onCallRequestNotification({
        //   title: title,
        //   message: body,
        //   data,
        // });
        break;
      }
      case 'call_video_request': {

        break;
      }
      default: {
        onDisplayNotification({
          data,
        });
        break;
      }
    }
  } catch (e) {
    console.log(e);
  }
};

const createNotificationChannel = async (id, name, importance, sound, vibration = false, vibrationPattern = []) => {
  return await notifee.createChannel({
    id,
    name,
    importance,
    sound,
    vibration,
    vibrationPattern,
  });
};


export const onDisplayNotification = async ({ data }) => {
  try {
    await notifee.requestPermission();
    const { title, body } = data;
    const channelId = await createNotificationChannel('default', 'Default Channel', AndroidImportance.HIGH, 'ringtone_notify');

    await notifee.displayNotification({
      title,
      body,
      data,
      android: {
        channelId,
        smallIcon: 'ic_launcher',
        pressAction: { id: 'default' },
        importance: AndroidImportance.HIGH,
      },
    });
  } catch (error) {
    console.error('Error displaying notification:', error);
  }
};


// export const createCustomSoundChannel = async  () => {
//   await notifee.createChannel({
//     id: 'custom-sound-channel',
//     name: 'Custom Sound Notifications',
//     importance: AndroidImportance.HIGH, 
//     sound: 'zego_incoming', 
//   });
// }

export const onChatRequestNotification = async ({data }) => {
  await notifee.requestPermission();
  const {title, body} = data;
  const channelId = await notifee.createChannel({
    id: 'chat_request',
    name: 'Chat Request',
    importance: AndroidImportance.HIGH,
    vibration: true,
    vibrationPattern: [300, 500],
  });

  await notifee.displayNotification({
    title: title,
    body: body,
    android: {
      channelId,
      smallIcon: 'ic_launcher',
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
      vibrationPattern: [300, 500],
      autoCancel: false,
      category: AndroidCategory.CALL,
      pressAction: {
        id: 'default',
      },
      actions: [
        {
          title: 'Decline',
          pressAction: {
            id: 'snooze',
          },
        },
        {
          title: 'Accept',
          pressAction: {
            id: 'snooze',
          },
        },
      ],
    },
  });
};

