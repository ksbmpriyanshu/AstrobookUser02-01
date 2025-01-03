import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  ScrollView,
  Linking,
  Alert,
  Keyboard,
  TouchableWithoutFeedback, Modal
} from 'react-native';
import React, { useEffect } from 'react';
import MyStatusBar from '../../components/MyStatusbar';
import { api_url, colors, fonts, signup_google, api2_get_profile, getFontSize } from '../../config/Constants1';
import { useState } from 'react';
import MyLoader from '../../components/MyLoader';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as CustomerActions from '../../redux/actions/CustomerActions';
import { connect } from 'react-redux';
import CountryPicker from 'react-native-country-picker-modal';
import {
  GoogleSignin,

} from '@react-native-google-signin/google-signin';
import { success_toast, warnign_toast } from '../../components/MyToastMessage';
import * as AuthActions from '../../redux/actions/AuthActions'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { logo, mainlogo } from '../../assets/images/Images';
import { Fonts } from '../../assets/style';
import { responsiveScreenFontSize, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import CountryCodeDropdownPicker from 'react-native-dropdown-country-picker'
import LoginArrow from '../../svgicons/LoginArrow';
import FacebookIcon from '../../svgicons/FacebookIcon';
import GoogleIcon from '../../svgicons/GoogleIcon';
import OrIcon from '../../svgicons/OrIcon';
import GoogleButton from './components/GoogleButton';
const { width, height } = Dimensions.get('screen');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

GoogleSignin.configure();

const Login = props => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState({ callingCode: '91', cca2: 'IN' });

  useEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
    });
  }, []);


  const login = async () => {
    try {
      const phoneRegex = /^\d{10}$/
      if (phoneNumber.length == 0) {
        warnign_toast('Please Enter Mobile Number');
      } else if (!phoneRegex.test(phoneNumber)) {
        warnign_toast('Please Enter Correct Mobile Number');
      } else {
        props.dispatch(AuthActions.onLogin({ phoneNumber: phoneNumber, }))
      }
    } catch (e) {
      console.log(e)
    }
  };
  const [selected, setSelected] = React.useState('+91');
  const [country, setCountry] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const openModal2 = () => {
    setIsModalVisible2(true);
  };

  const closeModal2 = () => {
    setIsModalVisible2(false);
  };

  return (

   
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <MyStatusBar
          backgroundColor={"#381415"}
          barStyle="light-content"
        />
        <MyLoader isVisible={isLoading} />


        {/* <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid={true}
          extraScrollHeight={20}
          enableAutomaticScroll={true}> */}

          <View style={styles.logoView}>
            {/* <Text style={{
              ...Fonts.primaryRegular,
              color: "#fff",
              textDecorationLine: "underline",
              position: "absolute",
              top: 10,
              right: 10,
            }}>Skip</Text> */}
            <View>
              <Image source={require('../../assets/astrobookimages/logo.png')} style={styles.loginLogo} />
              <Text style={styles.loginImageText}>Your Astrology Search Ends Here</Text>
            </View>
          </View>
          
          <View style={styles.inputView}>
            <CountryCodeDropdownPicker
              selected={selected}
              setSelected={setSelected}
              setCountryDetails={setCountry}
              phone={phoneNumber}
              setPhone={(value) => {
                
                if (/^\d{0,10}$/.test(value)) {
                  setPhoneNumber(value);
                }
              }}
              countryCodeTextStyles={{ fontSize: 14, color: "#000" }}
              phoneStyles={{
                color: "#000",
              }}
            />
            <TouchableOpacity style={styles.loginBtn}
              onPress={login}
            >
              <Text></Text>
              <Text style={styles.loginText}>GET OTP</Text>
              <LoginArrow />
            </TouchableOpacity>
            <Text style={styles.loginSignupText}>
              By Signing up, you agree to our <Text style={{ textDecorationLine: "underline" }} onPress={openModal}>Term of Use </Text>and <Text

                onPress={openModal2} style={{ textDecorationLine: "underline" }}>Privacy Policy</Text>
            </Text>
            <View style={{ marginTop: 30, }}>
              <OrIcon width={SCREEN_WIDTH * 0.9} />

            </View>
            <GoogleButton />

          </View>




          {/* <View>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'android' ? 'padding' : 'height'}>
          <View
            style={{
              flex: 0,
              width: '85%',
              alignSelf: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: "#fff",
              borderRadius: 25,
              marginBottom: 5,
              marginTop: 30
            }}>

            <Text allowFontScaling={false} style={{ fontSize: getFontSize(1.4), fontWeight: 'bold', paddingRight: 5, paddingLeft: 10, color: "#fff", fontFamily: fonts.medium }}>
              {` +${code.callingCode}`}
            </Text>
            <View>
              <Text allowFontScaling={false} style={{ borderRightWidth: 1, borderColor: "#fff", height: getFontSize(1.8) }}></Text>
            </View>
            <TextInput
              placeholder="Enter Your Mobile Number"
              placeholderTextColor="#fff"
              keyboardType="numeric"
              onChangeText={text => {

                if (text.length > 0 && text[0] === '0') {

                  setPhoneNumber(text.slice(1));
                } else {
                  setPhoneNumber(text);
                }

                if (text.length >= 10) {
                  Keyboard.dismiss();
                }
              }}
              style={{ width: '100%', fontSize: getFontSize(1.4), padding: 8, color: '#fff' }}
              maxLength={10}
              onTouchEndCapture={() => console.log('bye')}
              underlineColorAndroid='transparent'
              onSubmitEditing={() => login()}
              cursorColor={colors.background_theme2}
              disableFullscreenUI={false}
            />
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={login}
          style={{
            backgroundColor: "#fff",
            width: "100%",
            alignSelf: "center",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            paddingHorizontal: 40,
            paddingVertical: 6,
            marginVertical: 10,
            borderRadius: 100,

          }}>
          <Text allowFontScaling={false} style={{ fontSize: getFontSize(1.8), fontWeight: 'bold', color: "#F45F4B", }}>
            GET OTP
          </Text>
          <AntDesign
            name="rightcircle"
            color={"#F45F4B"}
            size={18}
          />
        </TouchableOpacity>

      </View> */}
          {TermsandCondition()}
          {PrivacyPolicy()}

       

      </View>

   
  );
  function TermsandCondition() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={{alignItems:"center"}}>
            <Text style={styles.modalTitle}>Terms & Conditions</Text>
            </View>
            <ScrollView>
              <Text style={styles.modalText}>

                Welcome to AstroBook. Here are the terms and conditions for using our app...
              </Text>
            </ScrollView>
            <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }
  function PrivacyPolicy() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible2}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
          <View style={{alignItems:"center"}}>
            <Text style={styles.modalTitle}>Privacy Policy</Text>
            </View>
            <ScrollView>
              <Text style={styles.modalText}>

                Welcome to AstroBook. Here are the Privacy Policies for using our app...
              </Text>
            </ScrollView>
            <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal2}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(null, mapDispatchToProps)(Login);


const styles = StyleSheet.create({
  loginButtonContainer: {
    flex: 0,
    width: '40%',
    paddingVertical: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white_color,
    borderWidth: 1,
    borderColor: colors.background_theme4
  },
  loginButtonText: {
    fontSize: getFontSize(1.4),
    color: colors.background_theme4,
    fontFamily: fonts.medium,
  },
  logoView: {
    backgroundColor: colors.background_theme2,
    flex: 0.40,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderWidth:1
  },
  loginLogo: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_WIDTH * 0.4,
    objectFit: "contain",
  },
  loginImageText: {
    color: "#fff",
    textAlign: "center",
    ...Fonts.primaryHelvetica,
    fontWeight: "700",
    fontSize: responsiveScreenFontSize(2.3),
    letterSpacing: 0.4,
  },
  inputView: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    paddingTop: 40,
    flex: 0.60,

  },
  loginBtn: {
    backgroundColor: "#000000",
    borderRadius: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  loginText: {
    color: "#fff",
    textAlign: "center",
    ...Fonts.primaryHelvetica,
    fontWeight: "500",
    fontSize: responsiveScreenFontSize(2.6),
    letterSpacing: 0.4,
  },
  loginSignupText: {
    color: "#000",
    textAlign: "center",
    ...Fonts.primaryHelvetica,
    fontWeight: "500",
    fontSize: responsiveScreenFontSize(1.9),
    marginTop: 15,
  },
  orImage: {
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    height: 15,
    objectFit: "contain",
    marginTop: 30,
  },

  googleView: {
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "center",
    gap: 10,
    marginTop: 30,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: responsiveScreenFontSize(2.2),
    fontWeight: 'bold',
    marginBottom: 10,
    color:colors.black_color7
  },
  modalText: {
    fontSize: responsiveScreenFontSize(1.8),
    color: colors.black_color7,
    marginBottom: 20,
  },
  modalCloseButton: {
    backgroundColor: '#381415',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: responsiveScreenFontSize(1.9),
  },

});
