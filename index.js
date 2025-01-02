/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import Notifee, {
  EventType
} from '@notifee/react-native';
import store from './src/redux/store';
import { onNotification } from './src/Notifications/NotificationManager';
import { Text,TextInput } from 'react-native';
import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn'
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';


messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  // onNotifeeMessageReceived(remoteMessage);
  onNotification(remoteMessage)
});

if (Text.defaultProps == null) {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
  }
  
  if (TextInput.defaultProps == null) {
  TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
  }

Notifee.onBackgroundEvent(async ({ type, detail }) => {

  const { notification } = detail;


  console.log('dafdfs', notification?.id);
  setTimeout(async () => {
    await Notifee.cancelNotification(notification?.id);
  }, 30000);

});

Notifee.onForegroundEvent(({ type, detail }) => {
  if (type != 4) {
    const { notification } = detail;
    const { data } = notification;
    const id = notification?.android.channelId;
  }


});
const RNRedux = () => {
  return (
    <Provider store={store}>
      <App route={'default'} data={{ data: 1 }} />
    </Provider>
  );
};

ZegoUIKitPrebuiltCallService.useSystemCallingUI([ZIM, ZPNs]);

AppRegistry.registerComponent(appName, () => RNRedux);

