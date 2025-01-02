import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import MyStatusBar from '../../components/MyStatusbar';
import {
  add_or_update_device_token,
  api2_get_profile,
  api_url,
  call_app_id,
  call_app_sign,
  colors,
  fonts,
  user_web_api_login,
  user_web_api_verification_otp,
  vedic_images,
  getFontSize
} from '../../config/Constants1';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { connect } from 'react-redux';
import { success_toast, warnign_toast } from '../../components/MyToastMessage';
import MyLoader from '../../components/MyLoader';
import CountDown from './components/CountDown';
import * as AuthActions from '../../redux/actions/AuthActions'
import { getFcmToken } from '../../utils/services';
import GoBack from '../../svgicons/GoBack';
import { Fonts } from '../../assets/style';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import OrIcon from '../../svgicons/OrIcon';
import GoogleButton from './components/GoogleButton';


const { width, height } = Dimensions.get('screen');
const CELL_COUNT = 4;

const Otp = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [otp, setOtp] = useState(null);
  const [counter, setCounter] = useState(59);
  const [otpprops, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
    });
    setOtp(props.route.params.otp)
  }, [props.route.params.otp]);

  useEffect(() => {
    if (value.length === CELL_COUNT) {
      handle_otp();
    }
  }, [value]);
  const handle_otp = async () => {
    try {
      if (otp != value) {
        warnign_toast('Please enter correct OTP.');

      } else {
        const payload = {

          data: {
            phoneNumber: props.route.params.phoneNumber,
            fcmToken: await getFcmToken(),
            otp:otp
          },
          // dispatch: props.dispatch

        }
        props.dispatch(AuthActions.onOtpVerification(payload))
      }
    } catch (e) {
      console.log(e, 'this error')
    }
  };

  const updateState = useCallback(() => {
    setCounter(0)
    setOtp('')
  }, [counter])

  return (
    <View style={{ flex: 1, backgroundColor: colors.background_theme1 }}>
      <MyStatusBar
        backgroundColor={colors.book_status_bar}
        barStyle="dark-content"
      />
      <MyLoader isVisible={isLoading} />
      <View style={{ flex: 1 }}>
        <View style={styles.otpHeader}>
          <GoBack width={13} height={13} />
          <Text style={styles.verifyText}>Verify Phone</Text>
        </View>
        <View style={{ paddingTop: SCREEN_HEIGHT * 0.2, }}>
          <Text style={styles.otpText}>OTP Sent to
            <Text style={{ color: "#381415" }}>+91-{props.route.params.phoneNumber}</Text> </Text>
          <View style={{ paddingHorizontal: 30, }}>
            <CodeField
              ref={ref}
              {...otpprops}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <Text allowFontScaling={false}
                  key={index}
                  style={[
                    styles.cell,
                    isFocused && styles.focusCell,
                    { color: '#000' }, 
                  ]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
          </View>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: 'center', marginTop: SCREEN_HEIGHT * 0.1, }}>
           
            {counter != 0 && (
              <Text style={styles.otpText2}>Resend OTP available in</Text>
            )}
            {counter != 0 && (
              <Text allowFontScaling={false}
                style={{ color: "#611D09" }}>
                <CountDown duration={counter} updateState={updateState} />s{' '}
              </Text>
            )}
            {counter == 0 && (
              <TouchableOpacity
                onPress={() => {
                  setCounter(60)
                  props.dispatch(AuthActions.onLogin({ phoneNumber: props.route?.params?.phoneNumber }))
                }}
              >
                <Text allowFontScaling={false}
                  style={{ color: "#611D09" }}>
                  Resend
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={{ marginTop: 20, paddingHorizontal: 15, }}>
            {/* <OrIcon width={SCREEN_WIDTH * 0.9} /> */}
          </View>
          <View>
            {/* <GoogleButton /> */}
          </View>
        </View>
      </View>
    </View>
  );
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(null, mapDispatchToProps)(Otp);

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: 'center', fontSize: 30, fontFamily: fonts.medium },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: width * 0.15,
    height: width * 0.14,
    lineHeight: 32,
    fontSize: 19,
    borderWidth: 0.27,
    borderRadius: 5,
    borderColor: "#F1B646",
    textAlign: 'center',
    paddingTop: 5,
    marginTop: 10,

  },
  focusCell: {
    borderColor: colors.background_theme4,
  },
  otpHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 5,
    backgroundColor:colors.book_status_bar
  },
  verifyText: {
    ...Fonts.black11InterMedium,
    fontSize: 15,
  },
  otpText: {
    ...Fonts.black11InterMedium,
    fontSize: 14,
    textAlign: "center"
  },
  otpText2: {
    ...Fonts.black11InterMedium,
    fontSize: 13,
    textAlign: "center",
    marginRight: 3,
  }
});
