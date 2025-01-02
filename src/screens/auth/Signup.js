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
  FlatList,
  Image,
  ToastAndroid,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  api2_get_profile,
  api_url,
  colors,
  fonts,
} from '../../config/Constants1';
import MyStatusBar from '../../components/MyStatusbar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';
import * as CustomerActions from '../../redux/actions/CustomerActions';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'react-native-image-picker';
import moment from 'moment';
import { useCallback } from 'react';
import { actions } from '../../config/data';
import RNFetchBlob from 'rn-fetch-blob';
import { success_toast, warnign_toast } from '../../components/MyToastMessage';
import MyLoader from '../../components/MyLoader';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import * as SettingActions from '../../redux/actions/SettingActions'
import * as AuthActions from '../../redux/actions/AuthActions'
import { showToastWithGravityAndOffset } from '../../methods/toastMessage';

const { width, height } = Dimensions.get('screen');

const Signup = ({ customerData, dispatch, navigation, locationData, route }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(
    customerData?.phoneNumber
  );
  const [male, setMale] = useState(true);
  const [female, setFemale] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(true);
  const [countryData, setCountryData] = useState(null);
  const [country, setCountry] = useState(null);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [dateShow, setDateShow] = useState(false);
  const [timeShow, setTimeShow] = useState(false);
  const [time, setTime] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [baseSixtyFourData, setbaseSixtyFourData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: 'Register',
      headerTintColor: colors.background_theme1,
      headerShown: true,
      headerStyle: {
        backgroundColor: colors.background_theme2,
      },
      headerRight: () => (
        <TouchableOpacity onPress={() => go_home()}>
          <Text allowFontScaling={false}
            style={{
              fontSize: 14,
              color: colors.background_theme1,
              fontFamily: fonts.medium,
            }}>
            Skip
          </Text>
        </TouchableOpacity>
      ),
    });

    return () => {
      dispatch(SettingActions.setLocationData(null))
    }
  }, []);

  useEffect(() => {
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

  // const validation = () => {
  //   if (firstName.length == 0) {
  //     warnign_toast('Please enter your first name');

  //   } else if (!alphabeticRegex.test(firstName)) {
  //     warnign_toast('Please enter your First Name Characters only');

  //   } else if (lastName.length == 0) {
  //     warnign_toast('Please enter your last name');

  //   } else if (!alphabeticRegex.test(lastName)) {
  //     warnign_toast('Please enter your Last Name Characters only');

  //   } else if (email.length == 0) {
  //     warnign_toast('Please enter your email address');

  //   } else if (emain_validation()) {
  //     warnign_toast('Please enter your correct email address');

  //   } else if (!date) {
  //     warnign_toast('Please enter your date of birth');
  
  //   } else if (!time) {
  //     warnign_toast('Please enter your time of birth');
  
  //   } else if (!locationData) {
  //     warnign_toast('Please select your Place of Birth');

  //   } else {
  //     let data = [
  //       { name: 'customerId', data: customerData?._id },
  //       {
  //         name: 'dateOfBirth',
  //         data: moment(date).format('YYYY-MM-DD HH:mm'),
  //       },
  //       {
  //         name: 'timeOfBirth',
  //         data: moment(time).format('YYYY-MM-DD HH:mm'),
  //       },
  //       {
  //         name: 'customerName',
  //         data: `${firstName} ${lastName}`,
  //       },
  //       {
  //         name: 'gender',
  //         data: male ? 'Male' : 'Female',
  //       },
  //       {
  //         name: 'alternateNumber',
  //         data: '',
  //       },
  //       {
  //         name: 'email',
  //         data: email,
  //       },
  //       {
  //         name: 'longitude',
  //         data: locationData?.lon.toString(),
  //       },
  //       {
  //         name: 'latitude',
  //         data: locationData?.lat.toString(),
  //       },
  //       {
  //         name: 'placeOfBirth',
  //         data: locationData?.address,
  //       },
  //       {
  //         name: 'country',
  //         data: 'India',
  //       }
  //     ];

  //     if (profileImage) {
  //       data.push({
  //         name: 'image',
  //         filename: `${customerData?._id}.jpg`,
  //         type: 'jpg/png',
  //         data: RNFetchBlob.wrap(profileImage),
  //       });
  //     }

  //     dispatch(AuthActions.onRegister(data))

  //   }
  // };
  // const validation1 = () => {
  //   if (!profileImage) {
  //     warnign_toast('Please upload your profile image');
  //   } else {
  //     let data = [
  //       { name: 'customerId', data: customerData?._id },
  //       {
  //         name: 'dateOfBirth',
  //         data: moment(date).format('YYYY-MM-DD HH:mm'),
  //       },
  //       {
  //         name: 'timeOfBirth',
  //         data: moment(time).format('YYYY-MM-DD HH:mm'),
  //       },
  //       {
  //         name: 'customerName',
  //         data: `${firstName} ${lastName}`,
  //       },
  //       {
  //         name: 'gender',
  //         data: male ? 'Male' : 'Female',
  //       },
  //       {
  //         name: 'alternateNumber',
  //         data: '',
  //       },
  //       {
  //         name: 'email',
  //         data: email,
  //       },
  //       {
  //         name: 'longitude',
  //         data: locationData?.lon.toString(),
  //       },
  //       {
  //         name: 'latitude',
  //         data: locationData?.lat.toString(),
  //       },
  //       {
  //         name: 'placeOfBirth',
  //         data: locationData?.address,
  //       },
  //       {
  //         name: 'country',
  //         data: 'India',
  //       }
  //     ];
  
  //     if (profileImage) {
  //       data.push({
  //         name: 'image',
  //         filename: `${customerData?._id}.jpg`,
  //         type: 'jpg/png',
  //         data: RNFetchBlob.wrap(profileImage),
  //       });
  //     }
  
  //     dispatch(AuthActions.onRegister(data));
  //   }
  // };
  const validation = () => {
    // Trim the inputs to remove any leading or trailing spaces
    // const trimmedFirstName = firstName.trim();
    const trimmedFirstName = firstName.replace(/^\s+|\s+$/gm,'');
    const trimmedLastName = lastName.replace(/^\s+|\s+$/gm,'');
    // const trimmedLastName = lastName.trim();
    const trimmedEmail = email.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

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
    } else if (!emailRegex.test(trimmedEmail)) {
        warnign_toast('Please enter your correct email address');
    } else if (!date) {
        warnign_toast('Please enter your date of birth');
    } else if (!time) {
        warnign_toast('Please enter your time of birth');
    } else if (!locationData) {
        warnign_toast('Please select your Place of Birth');
    } else {
        let data = [
            { name: 'customerId', data: customerData?._id },
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
                data: `${trimmedFirstName} ${trimmedLastName}`,
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
                data: trimmedEmail,
            },
            {
                name: 'longitude',
                data: locationData?.lon.toString(),
            },
            {
                name: 'latitude',
                data: locationData?.lat.toString(),
            },
            {
                name: 'placeOfBirth',
                data: locationData?.address,
            },
            {
                name: 'country',
                data: 'India',
            }
        ];
        console.log("12--------",data)

        if (profileImage) {
            data.push({
                name: 'image',
                filename: `${customerData?._id}.jpg`,
                type: 'jpg/png',
                data: RNFetchBlob.wrap(profileImage),
            });
        }

        const payload = {
          data: data,
          dispatch: dispatch,
        }

        dispatch(AuthActions.onRegister(payload));
    }
};

const validation1 = () => {
  console.log(profileImage,'aa')
  if (!profileImage) {
      warnign_toast('Please Upload Your Profile Photo')
  } else {
      showToastWithGravityAndOffset('Update Successfully')
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

  const go_home = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'home',
            state: {
              routes: [
                { name: 'home2', params: { flag: route.params?.flag } },
              ],
            },
          },
        ],
      }),
    );
  };

  const handleFirstNameChange = (text) => {
    
    const cleanedText = text.replace(/[^a-zA-Z ]/g, '');
    setFirstName(cleanedText);
  };
  const handleLastNameChange = (text) => {
    
    const cleanedText = text.replace(/[^a-zA-Z ]/g, '');
    setLastName(cleanedText);
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.background_theme1 }}>
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
              Upload Details
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
              Upload Photo
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
                  size={25}
                />
                <KeyboardAvoidingView
                  behavior={Platform.OS == 'android' ? 'padding' : 'height'}>
                  <TextInput
                    value={firstName}
                    placeholder="Enter first name"
                    placeholderTextColor={colors.black_color5}
                    onChangeText={handleFirstNameChange}
                    style={{
                      flex: 0,
                      marginLeft: 5,
                      color: colors.black_color9,
                      fontWeight: 'normal',
                    }}
                  />
                </KeyboardAvoidingView>
              </View>
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons
                  name="account"
                  color={colors.black_color8}
                  size={25}
                />
                <KeyboardAvoidingView
                  behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                  <TextInput
                    value={lastName}
                    placeholder="Enter Last name"
                    placeholderTextColor={colors.black_color5}
                    onChangeText={handleLastNameChange}
                    style={{
                      flex: 0,
                      marginLeft: 5,
                      color: colors.black_color9,
                      fontWeight: 'normal',
                    }}
                  />
                </KeyboardAvoidingView>
              </View>
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons
                  name="email"
                  color={colors.black_color}
                  size={25}
                />
                <KeyboardAvoidingView
                  behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                  <TextInput
                    value={email}
                    placeholder="Enter email"
                    keyboardType="email-address"
                    placeholderTextColor={colors.black_color5}
                    onChangeText={text => {
                      setEmail(text);
                    }}
                    style={{
                      flex: 0,
                      marginLeft: 5,
                      color: colors.black_color9,
                      fontWeight: 'normal',
                    }}
                  />
                </KeyboardAvoidingView>
              </View>
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons
                  name="phone"
                  color={colors.black_color8}
                  size={25}
                />
                <TextInput
                  value={phoneNumber}
                  editable={false}
                  placeholder="Enter Mobile Number"
                  placeholderTextColor={colors.black_color5}
                  onChangeText={text => {
                    setFirstName(text);
                  }}
                  style={{
                    flex: 0,
                    marginLeft: 5,
                    color: colors.black_color9,
                    fontWeight: 'normal',
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() => setDateShow(true)}
                style={[styles.inputContainer, { paddingTop: 10, paddingBottom: 10 }]}>
                <MaterialCommunityIcons
                  name="calendar-month-outline"
                  color={colors.black_color8}
                  size={30}
                />
                <Text allowFontScaling={false}
                  style={{
                    flex: 0,
                    marginLeft: 5,
                    color: colors.black_color9,
                    fontWeight: 'normal',
                  }}>
                  {date == null
                    ? 'Select Date Of Birth'
                    : moment(date).format('Do MMM YYYY')}
                </Text>
              </TouchableOpacity>
              {dateShow && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date == null ? new Date() : date}
                  maximumDate={new Date()}
                  mode={'date'}
                  is24Hour={true}
                  display='calendar'
                  minimumDate={new Date(1900, 1, 1)}
                  onChange={date_handle}
                />
              )}
              <TouchableOpacity
                onPress={() => setTimeShow(true)}
                style={[styles.inputContainer, { paddingTop: 10, paddingBottom: 10 }]}>
                <MaterialCommunityIcons
                  name="clock-outline"
                  color={colors.black_color8}
                  size={25}
                />
                <Text allowFontScaling={false}
                  style={{
                    flex: 0,
                    marginLeft: 5,
                    color: colors.black_color9,
                    fontWeight: 'normal',
                  }}>
                  {time == null
                    ? 'Select Time Of Birth'
                    : moment(time).format('hh:mm A')}
                </Text>
              </TouchableOpacity>
              {timeShow && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={time == null ? new Date() : time}
                  mode={'time'}
                  display='clock'
                  is24Hour={false}
                  onChange={time_handle}
                />
              )}
              {countryData && (

                <View style={{ flex: 1 }}>
                  <DropDownPicker
                    schema={{
                      label: 'name', // required
                      value: 'id', // required
                      icon: 'icon',
                      parent: 'parent',
                      selectable: 'selectable',
                      disabled: 'disabled',
                      testID: 'testID',
                      containerStyle: 'containerStyle',
                      labelStyle: 'labelStyle',
                    }}
                    open={open}
                    placeholder="Select country"
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

                </View>

              )}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('placeOfBirth');
                }}
                style={[styles.inputContainer, { paddingTop: 10, paddingBottom: 10 }]}>
                <MaterialCommunityIcons
                  name="map-marker"
                  color={colors.black_color8}
                  size={25}
                />
                <Text allowFontScaling={false} style={{ fontSize: 14, color: colors.black_color7 }}>
                  {locationData ? locationData?.address : 'Place of Birth'}
                </Text>
              </TouchableOpacity>
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
                    size={20}
                    fillColor={colors.background_theme2}
                    unfillColor="#FFFFFF"
                    isChecked={male}
                    disableBuiltInState
                    text="Male"
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
                    size={20}
                    fillColor={colors.background_theme2}
                    unfillColor="#FFFFFF"
                    isChecked={female}
                    disableBuiltInState
                    text="Female"
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
                      fontSize: 16,
                      color: colors.white_color,
                      fontWeight: 'normal',
                    }}>
                    Submit
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
              <Text allowFontScaling={false}
                style={{
                  fontSize: 20,
                  color: colors.black_color7,
                  fontWeight: 'normal',
                  textAlign: 'center',
                  marginTop: 25,
                }}>
                Profile Upload
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{
                  flex: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                {profileImage == null ? (
                  <MaterialIcons
                    name="account-circle"
                    color={colors.black_color8}
                    size={200}
                  />
                ) : (
                  <Image
                    source={{ uri: profileImage }}
                    style={{
                      width: width * 0.2,
                      height: width * 0.2,
                      borderRadius: 1000,
                    }}
                  />
                )}
                {
                  profileImage && <Text onPress={() => {
                    setProfileImage(null)
                    setbaseSixtyFourData(null)

                  }} allowFontScaling={false}
                    style={{
                      fontSize: 16,
                      color: colors.background_theme2,
                      fontWeight: 'normal',
                      textAlign: 'center',
                      marginTop: 1,
                    }}>
                    Remove
                  </Text>
                }

                <Text allowFontScaling={false}
                  style={{
                    fontSize: 16,
                    color: colors.background_theme2,
                    fontWeight: 'normal',
                    textAlign: 'center',
                    marginTop: 1,
                  }}>
                 Upload Photo
                </Text>
              </TouchableOpacity>
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
                      fontSize: 16,
                      color: colors.white_color,
                      fontWeight: 'normal',
                    }}>
                    Submit Photo
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
                    fontSize: 16,
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
    </View>
  );
};

const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  locationData: state.setting.locationData
})

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

const styles = StyleSheet.create({
  buttonContainer: {
    width: '40%',
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: colors.background_theme2,
  },
  buttonText: {
    fontSize: 14,
    color: colors.background_theme1,
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
  inputContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderRadius: 10,
    borderColor: colors.black_color6,
    padding: 2,
    marginBottom: 20,
  },
  checkBoxText: {
    fontSize: 14,
    color: colors.black_color8,
    fontFamily: fonts.medium,
    textDecorationLine: 'none',
  },
});
