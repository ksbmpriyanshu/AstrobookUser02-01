import { GlobalContextProvider } from './src/config/context';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Alert,
  DeviceEventEmitter,
  Text,
  Platform,
  PermissionsAndroid,
} from 'react-native';

import {
  CommonActions,
  NavigationContainer,
} from '@react-navigation/native';
import StackNavigator from './src/navigations/StackNavigator';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import messaging from '@react-native-firebase/messaging';
import { PushNotificationManager } from 'react-native-notifications';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { ZegoCallInvitationDialog, ZegoUIKitPrebuiltCallFloatingMinimizedView } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import { api_url, astrologer_dashboard, colors } from './src/config/Constants1';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import database from '@react-native-firebase/database';
import * as ProviderActions from './src/redux/actions/ProviderActions';
import axios from 'axios';
import { connect } from 'react-redux';
import firebase from '@react-native-firebase/app';
import Notifee, {
  EventType,
  AuthorizationStatus,
} from '@notifee/react-native';
import { navigate, setTopLevelNavigator } from './src/navigations/NavigationServices';
import { Provider } from 'react-native-paper';
import socketServices from './src/utils/socket';
import AstroRating from './src/screens/astrologers/components/AstroRating';
import CallInvoice from './src/screens/chat/components/CallInvoice';
import { onNotification } from './src/Notifications/NotificationManager';
import ChatInvoice from './src/screens/chat/components/ChatInvoice';
import LiveCallInvoice from './src/screens/live/components/LiveCallInvoice';
import VideocallInvoice from './src/screens/chat/components/VideocallInvoice';

const App = ({ data, dispatch }) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');
        if (selectedLanguage) i18n.changeLanguage(selectedLanguage);
      } catch (error) {
        console.error('Error loading language from AsyncStorage:', error);
      }
    };
    loadLanguage();
  }, []);

  const [sendnotification, setnotification] = useState(null);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      onNotification(remoteMessage, dispatch);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (Platform.OS === 'web') {
    console.log('Web Platform Detected');
  } else {
    Notifee.onForegroundEvent(({ type, detail }) => {
      if (detail?.notification?.data?.type === 'Redirect' && type === EventType.PRESS) {
        navigate('notifications');
      }
    });

    useEffect(() => {
      async function requestPermissions() {
        if (Platform.OS === 'android') {
          const permissions = [
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            PermissionsAndroid.PERMISSIONS.CALL_PHONE,
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          ];
          const granted = await PermissionsAndroid.requestMultiple(permissions);
          if (Object.values(granted).every(val => val === PermissionsAndroid.RESULTS.GRANTED)) {
            console.log('All permissions granted');
          } else {
            console.log('Some permissions denied');
          }
          Notifee.requestPermission();
        } else {
          Notifee.requestPermission();
        }
      }
      requestPermissions();
    }, []);
  }

  const toastConfig = {
    success: props => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: colors.background_theme2 }}
        text1Style={{ fontSize: 14, fontWeight: '400' }}
        text2Style={{ fontSize: 12 }}
      />
    ),
    error: props => (
      <ErrorToast
        {...props}
        text1Style={{ fontSize: 14 }}
        text2Style={{ fontSize: 12 }}
      />
    ),
    tomatoToast: ({ text1, props }) => (
      <div style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </div>
    ),
  };

  return (
    <Provider>
      <SafeAreaView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <GlobalContextProvider>
              <NavigationContainer ref={c => setTopLevelNavigator(c)}>
                <ZegoCallInvitationDialog />
                <StackNavigator data1={sendnotification} />
                <ZegoUIKitPrebuiltCallFloatingMinimizedView />
              </NavigationContainer>
              <AstroRating />
              <Toast config={toastConfig} />
            </GlobalContextProvider>
            <CallInvoice />
            <ChatInvoice />
            <VideocallInvoice />
            <LiveCallInvoice />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(null, mapDispatchToProps)(App);
