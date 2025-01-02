import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  StyleSheet,
  ScrollView,
  Platform,
  Image,
} from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import MyHeader from '../../components/MyHeader';
import {
  api2_get_countries,
  api2_get_profile,
  api_url,
  base_url,
  colors,
  fonts,
  upload_customer_pic,
  getFontSize
} from '../../config/Constants1';
import { useState } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../config/data';
import * as ImagePicker from 'react-native-image-picker';
import { useCallback } from 'react';
import MyLoader from '../../components/MyLoader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import RNFetchBlob from 'rn-fetch-blob';
import { success_toast, warnign_toast } from '../../components/MyToastMessage';
import * as CustomerActions from '../../redux/actions/CustomerActions';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { img_url } from '../../config/constants';
import * as SettingActions from '../../redux/actions/SettingActions'
import * as AuthActions from '../../redux/actions/AuthActions'
import { Colors, Sizes } from '../../assets/style';
import { showToastWithGravityAndOffset } from '../../methods/toastMessage';
import { BottomSheet } from '@rneui/themed';
import { SCREEN_WIDTH } from '../../config/Screen';

const { width, height } = Dimensions.get('screen');

const CustomerAccount = props => {
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(props.customerData?.email);
  const [phoneNumber, setPhoneNumber] = useState(props.customerData?.phoneNumber);
  const [male, setMale] = useState(true);
  const [female, setFemale] = useState(false);
  const [birthPlace, setBirthPlace] = useState(
    props.customerData?.place_of_birth,
  );
  const [buttonStatus, setButtonStatus] = useState(true);
  const [countryData, setCountryData] = useState(null);
  const [country, setCountry] = useState(props.customerData?.country);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [dateShow, setDateShow] = useState(false);
  const [timeShow, setTimeShow] = useState(false);
  const [time, setTime] = useState(null);
  const [latLong, setLatLong] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [baseSixtyFourData, setbaseSixtyFourData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [birthModal, setBirthModal] = useState(false)
  const [lat, setlat] = useState(null)
  const [long, setlong] = useState(null)
  console.log(props.customerData, 'as ::::')

  useEffect(() => {
    props.navigation.setOptions({
      header: () => (
        <MyHeader
          title={t("myAccount")}
          navigation={props.navigation}
          socialIcons={false}
          statusBar={{
            backgroundColor: colors.background_theme2,
            barStyle: 'light-content',
          }}
        />
      ),
    });
  }, []);
  console.log(profileImage, 'cdata')

  useEffect(() => {
    const namesArray = props.customerData?.customerName.trim().split(" ");
    const firstName = namesArray[0] || "";
    const lastName = namesArray.length > 1 ? namesArray.slice(1).join(" ") : "";
    setFirstName(firstName)
    setLastName(lastName)

    const address = {
      address: props.customerData?.address?.birthPlace,
      lat: props.customerData?.address?.latitude,
      lon: props.customerData?.address?.longitude,
    }

    props.dispatch(SettingActions.setLocationData(address))

    if (props.customerData?.dateOfBirth) {
      setDate(new Date(props.customerData?.dateOfBirth));
    }
    if (props.customerData?.timeOfBirth) {
      setTime(new Date(moment(props.customerData?.timeOfBirth,))
      );
    }
    setProfileImage(
      img_url + props?.customerData?.image,
    );
    if (props.customerData?.gender == 'Male') {
      setFemale(false);
      setMale(true);
    } else if (props.customerData?.gender == 'Female') {
      setMale(false);
      setFemale(true);
    }

    return () => {
      props.dispatch(SettingActions.setLocationData(null))
    }

  }, []);

  const email_validation = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      return true;
    } else {
      return false;
    }
  };
  const alphabeticRegex = /^[A-Za-z.]+(?: {1,4}[A-Za-z.]+)* ?$/;
  const validation = () => {
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedEmail = email.trim();

    console.log("locationData", props.locationData)

    if (trimmedFirstName.length == 0) {
      warnign_toast('Please enter your first name');
    } else if (!alphabeticRegex.test(trimmedFirstName)) {
      warnign_toast('Please enter your First Name Characters only');
    } else if (trimmedLastName.length == 0) {
      warnign_toast('Please enter your last name');
    } else if (!alphabeticRegex.test(trimmedLastName)) {
      warnign_toast('Please enter your Last Name Characters only');
    } else if (trimmedEmail.length == 0) {
      warnign_toast('Please enter your email address');
      // } else if (!email_validation(trimmedEmail)) {
      //     warnign_toast('Please enter your correct email address');
    } else if (!date) {
      warnign_toast('Please enter your date of birth');
    } else if (!time) {
      warnign_toast('Please enter your time of birth');
    }
    else if (!props.locationData) {
      warnign_toast('Please select your Place of Birth');
    }
    else {
      let data = [
        { name: 'customerId', data: props.customerData?._id },
        {
          name: 'dateOfBirth',
          data: moment(date).format('YYYY-MM-DD HH:mm'),
        },
        {
          name: 'timeOfBirth',
          data: moment(time).format('YYYY-MM-DD HH:mm'),
        },
        {
          name: 'customerName',
          data: `${firstName} ${lastName}`,
        },
        {
          name: 'gender',
          data: male ? 'Male' : 'Female',
        },
        {
          name: 'alternateNumber',
          data: '',
        },
        {
          name: 'email',
          data: email,
        },
        {
          name: 'longitude',
          data: props.locationData?.lon.toString(),
          // data: long
        },
        {
          name: 'latitude',
          data: props.locationData?.lat.toString(),
          // data : lat
        },
        {
          name: 'placeOfBirth',
          data: props.locationData?.address,
          // data: birthPlace
        },
        {
          name: 'country',
          data: 'India',
        },

        {
          name: 'is_registered',
          data: '1'
        }
      ];

      if (baseSixtyFourData) {
        data.push({
          name: 'image',
          filename: `${props.customerData?._id}.jpg`,
          type: 'jpg/png',
          data: RNFetchBlob.wrap(profileImage),
        });
      }
      if (!props.customerData?.phoneNumber) {
        data.push({
          name: 'phoneNumber',
          data: phoneNumber,
        })
      }
      const payload = {
        data: data,
        dispatch: props.dispatch,
      }
      console.log("data-----", payload)

      props.dispatch(AuthActions.onRegister(payload))
    }
  };

  const validation1 = () => {
    if (profileImage === ' https://api.astrobook.co.in/uploads/customerImage/user_default.jpg') {
      warnign_toast('Please Upload Your Profile Photo ')
    } else {
      showToastWithGravityAndOffset('Successfully')
      setButtonStatus(true)
    }
  }
  const get_profile_pick = useCallback((type, options) => {
    if (type == 'capture') {
      ImagePicker.launchCamera(options, res => {
        setModalVisible(false);
        if (res.didCancel) {
          console.log('user cancel');
        } else if (res.errorCode) {
          console.log(res.errorCode);
        } else if (res.errorMessage) {
          console.log(res.errorMessage);
        } else {
          setProfileImage(res.assets[0].uri);
          setbaseSixtyFourData(res.assets[0].base64);
          // profile_picture_update(res.assets[0].uri);
        }
      });
    } else {
      ImagePicker.launchImageLibrary(options, res => {
        setModalVisible(false);
        if (res.didCancel) {
          console.log('user cancel');
        } else if (res.errorCode) {
          console.log(res.errorCode);
        } else if (res.errorMessage) {
          console.log(res.errorMessage);
        } else {
          setProfileImage(res.assets[0].uri);
          setbaseSixtyFourData(res.assets[0].base64);
          // profile_picture_update(res.assets[0].uri);
        }
      });
    }
  }, []);

  const date_handle = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDateShow(false);
    setDate(currentDate);
  };

  const time_handle = (event, selectedTime) => {
    setTime(selectedTime);
    setTimeShow(false);
  };
  const handleFirstNameChange = (text) => {
    const filteredText = text.replace(/[^a-zA-Z0-9 ]/g, '');
    setFirstName(filteredText);
  };
  const handleLastNameChange = (text) => {
    const filteredText = text.replace(/[^a-zA-Z0-9 ]/g, '');
    setLastName(filteredText);
  };
  const onSelectPlace = (place) => {
    setBirthPlace(place.name)
    setlat(place.lat)
    setlong(place.long)
    setBirthModal(false)
  }

  const placedata = [
    {
      name: 'Delhi',
      lat: '28.7041',
      long: '77.1025'
    }
  ]

  return (
    <View style={{ flex: 1, backgroundColor: colors.background_theme1 }}>
      <MyLoader isVisible={isLoading} />
      <ScrollView>
        <View
          style={{
            flex: 0,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingVertical: 15,
          }}>
          <TouchableOpacity
            onPress={() => setButtonStatus(true)}
            style={{
              ...styles.buttonContainer,
              backgroundColor: buttonStatus
                ? colors.background_theme2
                : colors.background_theme1,
            }}>
            <Text allowFontScaling={false}
              style={{
                ...styles.buttonText,
                color: buttonStatus
                  ? colors.background_theme1
                  : colors.black_color8,
              }}>
              {t("update_profile")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setButtonStatus(false)}
            style={{
              ...styles.buttonContainer,
              backgroundColor: !buttonStatus
                ? colors.background_theme2
                : colors.background_theme1,
            }}>
            <Text allowFontScaling={false}
              style={{
                ...styles.buttonText,
                color: !buttonStatus
                  ? colors.background_theme1
                  : colors.black_color8,
              }}>
              {t("update_photo")}
            </Text>
          </TouchableOpacity>
        </View>
        {buttonStatus ? (
          <View style={{ flex: 1, margin: 15 }}>
            <View
              style={{
                flex: 0,
                width: '100%',
                backgroundColor: colors.white_color,
                padding: 10,
              }}>
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons
                  name="account"
                  color={colors.black_color8}
                  size={getFontSize(2)}
                />
                <KeyboardAvoidingView
                  behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                  <TextInput
                    value={firstName}
                    placeholder="Enter first name"
                    // placeholderTextColor='red'
                    placeholderTextColor={colors.black_color5}
                    onChangeText={handleFirstNameChange}
                    style={{
                      flex: 0,
                      marginLeft: 5,
                      color: colors.black_color9,
                      fontWeight: 'normal',
                      fontSize: getFontSize(1.4),
                    }}
                  />
                </KeyboardAvoidingView>
              </View>
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons
                  name="account"
                  color={colors.black_color8}
                  size={getFontSize(2)}
                />
                <KeyboardAvoidingView
                  behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                  <TextInput
                    value={lastName}
                    placeholder="Enter last name"
                    placeholderTextColor={colors.black_color5}
                    onChangeText={handleLastNameChange}
                    style={{
                      flex: 0,
                      marginLeft: 5,
                      color: colors.black_color9,
                      fontWeight: 'normal',
                      fontSize: getFontSize(1.4),
                    }}
                  />
                </KeyboardAvoidingView>
              </View>
              {/* {props.customerData.login_type != 'google_login' ? (
                <View style={styles.inputContainer}>
                  <MaterialCommunityIcons
                    name="email"
                    color={colors.black_color8}
                    size={getFontSize(2)}
                  />
                  <KeyboardAvoidingView
                    behavior={Platform.OS == 'android' ? 'padding' : 'height'}>
                    <TextInput
                      value={email}
                      placeholder={t("enter_mail")}
                      keyboardType="email-address"
                      placeholderTextColor={colors.black_color}
                      onChangeText={text => {
                        setEmail(text);
                      }}
                      style={{
                        flex: 0,
                        marginLeft: 5,
                        color: colors.black_color9,
                        fontWeight: 'normal',
                        fontSize: getFontSize(1.4)
                      }}
                    />
                  </KeyboardAvoidingView>
                </View>
              ) : ( */}
               <View style={styles.inputContainer}>
              <MaterialCommunityIcons
                name="email"
                color={colors.black_color8}
                size={getFontSize(2)}
              />
              <KeyboardAvoidingView behavior={Platform.OS == 'android' ? 'padding' : 'height'}>
                <TextInput
                  value={email} // Controlled component
                  editable={true}
                  placeholder="Enter Your Email"
                  keyboardType="email-address"
                  placeholderTextColor={colors.black_color5}
                  onChangeText={text => setEmail(text)} // Update state
                  style={{
                    flex: 0,
                    marginLeft: 5,
                    color: colors.black_color9,
                    fontWeight: 'normal',
                    fontSize: getFontSize(1.4),
                  }}
                />
              </KeyboardAvoidingView>
            </View>
            {/* // )} */}

              {props.customerData.login_type != 'google_login' ? (
                <View style={styles.inputContainer}>
                  <MaterialCommunityIcons
                    name="phone"
                    color={colors.black_color8}
                    size={getFontSize(2)}
                  />
                  <TextInput
                    value={phoneNumber}
                    editable={!props.customerData?.phoneNumber}
                    placeholder={t("enter_phone")}
                    keyboardType='numeric'
                    placeholderTextColor={colors.black_color5}
                    onChangeText={text => {
                      setPhoneNumber(text);
                    }}
                    style={{
                      flex: 0,
                      marginLeft: 5,
                      color: colors.grey_color,
                      fontWeight: 'normal',
                      fontSize: getFontSize(1.4)
                    }}
                  />
                </View>
              ) : (<View style={styles.inputContainer}>
                <MaterialCommunityIcons
                  name="phone"
                  color={colors.black_color8}
                  size={getFontSize(2)}
                />
                <TextInput
                  value={phoneNumber}
                  keyboardType='numeric'
                  placeholder={t("enter_phone")}
                  maxLength={10}
                  placeholderTextColor={colors.black_color5}
                  onChangeText={text => {
                    setPhoneNumber(text);
                  }}
                  style={{
                    flex: 0,
                    marginLeft: 5,
                    color: colors.black_color9,
                    fontWeight: 'normal',
                    fontSize: getFontSize(1.4)
                  }}
                />
              </View>)}

              <TouchableOpacity
                onPress={() => setDateShow(true)}
                style={styles.inputContainer}>
                <MaterialCommunityIcons
                  name="calendar-month-outline"
                  color={colors.black_color8}
                  size={getFontSize(2)}
                />
                <Text allowFontScaling={false}
                  style={{
                    flex: 0,
                    marginLeft: 5,
                    color: colors.black_color9,
                    fontWeight: 'normal',
                    fontSize: getFontSize(1.4),
                    padding: 10
                  }}>
                  {date == null
                    ? t("date_of_birth")
                    : moment(date).format('DD MMM YYYY')}
                </Text>
              </TouchableOpacity>
              {dateShow && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date == null ? new Date() : date}
                  maximumDate={new Date()}
                  mode={'date'}
                  display='calendar'
                  minimumDate={new Date(1900, 1, 1)}
                  is24Hour={true}
                  onChange={date_handle}
                />
              )}
              <TouchableOpacity
                onPress={() => setTimeShow(true)}
                style={styles.inputContainer}>
                <MaterialCommunityIcons
                  name="clock-outline"
                  color={colors.black_color8}
                  size={getFontSize(2)}
                />
                <Text allowFontScaling={false}
                  style={{
                    flex: 0,
                    marginLeft: 5,
                    color: colors.black_color9,
                    fontWeight: 'normal',
                    fontSize: getFontSize(1.4), padding: 10
                  }}>
                  {time == null
                    ? t("time_of_birth")
                    : moment(time).format('hh:mm A')}
                </Text>
              </TouchableOpacity>
              {timeShow && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={time instanceof Date ? time : new Date()}
                  mode={'time'}
                  display='clock'
                  is24Hour={false}
                  onChange={time_handle}
                />
              )}
              {countryData && (
                <DropDownPicker
                  schema={{
                    label: 'name', // required
                    value: 'name', // required
                    icon: 'icon',
                    parent: 'parent',
                    selectable: 'selectable',
                    disabled: 'disabled',
                    testID: 'testID',
                    containerStyle: 'containerStyle',
                    labelStyle: 'labelStyle',
                  }}
                  open={open}
                  placeholder={country}

                  value={country}
                  items={countryData}
                  setOpen={setOpen}
                  setValue={setCountry}
                  setItems={setCountryData}
                  style={{ marginBottom: 20 }}
                  listMode='MODAL'
                  searchable={true}
                  scrollViewProps={{
                    nestedScrollEnabled: true,
                  }}
                />
              )}
              {/* Birth place */}
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('placeOfBirth', {
                    set_place_of_birth: setBirthPlace,
                    set_lat_long: setLatLong,
                  });
                }}
                style={styles.inputContainer}>
                <MaterialCommunityIcons
                  name="map-marker"
                  color={colors.black_color8}
                  size={25}
                />
                <Text allowFontScaling={false} style={{ fontSize: getFontSize(1.4), color: colors.black_color, padding: 10 }}>
                  {props.locationData?.address ? props.locationData?.address : t("place_of_birth")}
                </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity style={styles.inputContainer}
                onPress={() => setBirthModal(true)}
                >
                  <MaterialCommunityIcons
                    name="map-marker"
                    color={colors.black_color8}
                    size={getFontSize(2)}
                  />
                  <TextInput
                  // disabled
                    value={birthPlace}
                    editable={!props.customerData?.phoneNumber}
                    placeholder={'Enter Birth Place'}
                    keyboardType='numeric'
                    placeholderTextColor={colors.black_color5}
                    onChangeText={text => {
                      // setPhoneNumber(text);
                    }}
                    style={{    
                      flex: 0,
                      marginLeft: 5,        
                      color: colors.black_color9,
                      fontWeight: 'normal',
                      fontSize: getFontSize(1.4)
                    }}                        
                  />
                </TouchableOpacity> */}

              <View
                style={{
                  flex: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingBottom: 2,
                  paddingHorizontal: 2,
                  marginTop: 20,
                }}>
                <View
                  style={{
                    flex: 0.5,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <BouncyCheckbox
                    size={getFontSize(1.8)}
                    fillColor={colors.background_theme2}
                    unfillColor="#FFFFFF"
                    isChecked={male}
                    disableBuiltInState
                    text={t('male')} 
                    textStyle={styles.checkBoxText}
                    onPress={() => {
                      setMale(true);
                      setFemale(false);
                    }}
                  />
                </View>
                <View
                  style={{
                    flex: 0.5,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <BouncyCheckbox
                    size={getFontSize(1.8)}
                    fillColor={colors.background_theme2}
                    unfillColor="#FFFFFF"
                    isChecked={female}
                    disableBuiltInState
                    text={t('female')} 
                    textStyle={styles.checkBoxText}
                    onPress={() => {
                      setMale(false);
                      setFemale(true);
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  flex: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingBottom: 2,
                  paddingHorizontal: 2,
                  marginTop: 30,
                }}>
                <TouchableOpacity
                  onPress={() => validation()}
                  style={{
                    flex: 0,
                    width: width * 0.7,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 10,
                    borderRadius: width * 0.05,
                    backgroundColor: colors.background_theme2,
                  }}>
                  <Text allowFontScaling={false}
                    style={{
                      fontSize: getFontSize(1.6),
                      color: colors.white_color,
                      fontWeight: 'normal',
                    }}>
                    {t("update")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, margin: 15 }}>
            <View
              style={{ flex: 0, justifyContent: 'center', alignItems: 'center' }}>
              {/* <Text allowFontScaling={false}
                style={{
                  fontSize: getFontSize(1.8),
                  color: colors.black_color7,
                  fontWeight: 'normal',
                  textAlign: 'center',
                  marginTop: 15,
                }}>
               {t("welcome")}
              </Text> */}
              <Text allowFontScaling={false}
                style={{
                  fontSize: getFontSize(1.8),
                  color: colors.black_color7,
                  fontWeight: 'normal',
                  textAlign: 'center',
                  marginTop: 25,
                }}>
                {t("profile_upload")}
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{
                  // flex: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 15,

                  // padding:14,
                  // backgroundColor:colors.grey_color,
                  // borderRadius:100,
                  // height:SCREEN_WIDTH * 0.5,
                  // width:SCREEN_WIDTH * 0.5
                }}>
                <Image
                  source={{ uri: profileImage }}
                  style={{
                    width: width * 0.4,
                    height: width * 0.4,
                    borderRadius: 100,
                    borderWidth: 3,
                    borderColor: colors.background_theme2,
                    // padding:6
                  }}
                />

                <View style={{ backgroundColor: Colors.white, height: SCREEN_WIDTH * 0.09, width: SCREEN_WIDTH * 0.09, borderWidth: 2, bottom: Sizes.fixPadding * 4, left: Sizes.fixPadding * 5, alignItems: 'center', justifyContent: 'center', borderRadius: 100, borderColor: colors.background_theme2 }}>

                  <Ionicons style={{}} name="camera" color={colors.black_color} size={22} />
                </View>
                {/* <Text allowFontScaling={false}
                  style={{
                    fontSize: getFontSize(1.6),
                    color: colors.background_theme2,
                    fontWeight: 'normal',
                    textAlign: 'center',
                    marginTop: 1,
                  }}>
                  {t("select_photo")}
                </Text> */}
              </TouchableOpacity>
              {/* <Text allowFontScaling={false}
                  style={{
                    fontSize: getFontSize(1.6),
                    color: colors.background_theme2,
                    fontWeight: 'normal',
                    textAlign: 'center',
                    marginTop: 1,
                  }}>
                  {t("select_photo")}
                </Text> */}
            </View>
            <View
              style={{
                flex: 0,
                width: '100%',
                backgroundColor: colors.white_color,
                padding: 15,
                marginTop: 20,
                borderRadius: 5,
                shadowColor: colors.black_color6,
                shadowOffset: {
                  width: -2,
                  height: 2,
                },
                shadowOpacity: 0.3,
              }}>
              <View
                style={{
                  flex: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingBottom: 2,
                  paddingHorizontal: 2,
                  marginTop: 30,
                }}>
                <TouchableOpacity
                  onPress={() => validation1()}
                  style={{
                    flex: 0,
                    width: width * 0.7,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 10,
                    borderRadius: width * 0.05,
                    backgroundColor: colors.background_theme2,
                  }}>
                  <Text allowFontScaling={false}
                    style={{
                      fontSize: getFontSize(1.6),
                      color: colors.white_color,
                      fontWeight: 'normal',
                    }}>
                    {t("update")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        )}
      </ScrollView>
      <Modal
        isVisible={modalVisible}
        useNativeDriver={true}
        style={{ padding: 0, margin: 0 }}
        hideModalContentWhileAnimating={true}
        onBackdropPress={() => setModalVisible(false)}>
        <View
          style={{
            flex: 0,
            width: '100%',
            backgroundColor: colors.background_theme1,
            padding: 20,
            position: 'absolute',
            bottom: 0,
          }}>
          <View
            style={{
              flex: 0,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            {actions.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => get_profile_pick(item.type, item.options)}
                style={{ flex: 0, flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons
                  name={item.title == 'Camera' ? 'camera' : 'image'}
                  size={25}
                  color={colors.blue_color5}
                />
                <Text allowFontScaling={false}
                  style={{
                    fontSize: getFontSize(1.5),
                    color: colors.background_theme2,
                    fontFamily: fonts.medium,
                    marginLeft: 5,
                  }}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
      <BottomSheet
        isVisible={birthModal}
        onBackdropPress={() => setBirthModal(false)}
      >
        <View style={{ height: 400, backgroundColor: Colors.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 }}>
          <Text style={{ fontSize: 22, color: Colors.black }}>Select a Birth Place</Text>
          {placedata.map((place, index) => (
            <TouchableOpacity key={index}
              onPress={() => onSelectPlace(place)}
              style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.lightGray }}>
              <Text style={{ fontSize: 18, color: Colors.black }}>{place.name}</Text>
              <Text style={{ fontSize: 14, color: Colors.gray }}>{place.lat}, {place.long}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheet>
    </View>
  );
};

const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  firebaseId: state.customer.firebaseId,
  locationData: state.setting.locationData
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAccount);

const styles = StyleSheet.create({
  buttonContainer: {
    width: '40%',
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: colors.background_theme2,
  },
  buttonText: {
    fontSize: getFontSize(1.4),
    color: colors.background_theme1,
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
  inputContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.black_color6,
    padding: 5,
    marginBottom: 20,
  },
  checkBoxText: {
    fontSize: getFontSize(1.4),
    color: colors.black_color8,
    fontFamily: fonts.medium,
    textDecorationLine: 'none',
  },
});
