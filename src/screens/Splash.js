import { View, Text, Dimensions, Image, ImageBackground, Alert, BackHandler } from 'react-native';
import React, { useEffect } from 'react';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ProviderActions from '../redux/actions/ProviderActions';
import * as CustomerActions from '../redux/actions/CustomerActions';
import database from '@react-native-firebase/database';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
  api2_get_profile,
  api_url,
  astrologer_dashboard,
  call_app_id,
  call_app_sign,
  colors,
} from '../config/Constants1';
import messaging from '@react-native-firebase/messaging';
import NotificationHandle from '../components/NotificationHandle';
import { useState } from 'react';
import Notifee, {
} from '@notifee/react-native';
import * as SettingActions from '../redux/actions/SettingActions'
import socketServices from '../utils/socket';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen';
import MyStatusBar from '../components/MyStatusbar';
import { mainlogo } from '../assets/images/Images';
import { Colors } from '../assets/style';



const { width, height } = Dimensions.get('screen');

const Splash = ({ props, route, data, navigation, data1, dispatch,customerData }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState(null);
  console.log(data, 'this onskdf')
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    setTimeout(() => {
      dispatch(SettingActions.getSplash(dispatch))
      socketServices.initializeSocket(dispatch,customerData?._id);

    }, 2000);
  }, []);

  const get_is_request_active = async () => {
    try {
      const value = await AsyncStorage.getItem('request');
      return value;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const go_provider_chat_pickup = async message => {
    await AsyncStorage.setItem('request', '1').then(res => {
      navigation.replace('providerChatPickup', { message: message });
    });
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(remoteMessage => {
      let message = remoteMessage.data;
      if (message?.type == 'Request') {
        get_is_request_active().then(value => {
          if (value == '0') {
            go_provider_chat_pickup(message);
          }
        });
      }
    });
    return () => {
      unsubscribe;
    };
  }, []);

  async function init() {
    await Notifee.setNotificationCategories([
      {
        id: 'actions',
        actions: [
          {
            id: 'like',
            title: 'Like Post',
          },
          {
            id: 'dislike',
            title: 'Dislike Post',
          },
        ],
      },
      {
        id: 'stop',
        actions: [
          {
            id: 'stop',
            title: 'Dismiss',
          },
        ],
      },
      {
        id: 'dismiss',
        actions: [
          {
            id: 'dismiss',
            title: 'Dismiss',
          },
        ],
      },
      {
        id: 'communications',
        actions: [
          {
            id: 'communication',
            title: 'test',
            input: true,
          },
        ],
      },
    ]);
  }

  useEffect(() => {
    init().catch(e => console.log(e));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar
        backgroundColor={colors.background_theme2}
        barStyle="light-content"
      />
      <Image source={require('../assets/astrobookimages/splash.png')} style={{ resizeMode: 'cover', height: SCREEN_HEIGHT, width: SCREEN_WIDTH }} />
      {modalVisible && (
        <NotificationHandle
          message={message}
          visible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  requestData: state.provider.requestData,
  providerData: state.provider.providerData,
  customerData: state.customer.customerData,
});
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
