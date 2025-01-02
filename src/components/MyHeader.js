import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Linking,
  PermissionsAndroid,
  Alert,
  Platform
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors, fonts,getFontSize} from '../config/Constants1';
import { openFacebook, openInstagram, openYoutube } from './Methods';
import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';
import { Buffer } from 'buffer';
import { Fonts } from '../assets/style';



const MyHeader = ({ title,navigation, statusBar, socialIcons = false, download = false,id}) => {

  return (
    <SafeAreaView
      style={{backgroundColor:colors.black_color2}}
      forceInset={{top: 'always', bottom: 'never'}}>
      <View
        style={{
          flex: 0,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingVertical: 12,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            flex: 0,
            width: '15%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={require('../assets/astrobookimages/back_navigation.png')} style={{width:15,height:15,objectFit:"contain"}}/>
        </TouchableOpacity>
        <View style={{flex: 0.8}}>
          <Text allowFontScaling={false}
            numberOfLines={1}
            style={{
              ...Fonts.primaryHelvetica,
              color:"#000",
              fontSize:16,
            }}>
            {title}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyHeader;
