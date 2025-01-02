import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { colors, fonts } from '../../config/Constants1';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import MyLoader from '../../components/MyLoader';
import axios from 'axios';
import { connect } from 'react-redux';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import MyHeader from '../../components/MyHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import { warnign_toast } from '../../components/MyToastMessage';
import { showToastMessage } from '../../utils/services';
import { api_url, open_Numerology } from '../../config/constants';
import * as KundliActions from '../../redux/actions/KundliActions';

const { width, height } = Dimensions.get('window');

const Numerology = props => {
  const [name, setName] = useState('');
  const [birthPlace, setBirthPlace] = useState(null);
  const [dob, setDob] = useState(null);
  const [dobVisible, setDobVisible] = useState(false);
  const [tob, setTob] = useState(null);
  const [tobVisible, setTobVisible] = useState(false);
  const [latLong, setLatLong] = useState(null);
  const [gender, setGender] = useState('Male');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    props.navigation.setOptions({
      tabBarLabel: 'New Numerology',
    });
  }, []);

  useEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
      header: () => (
        <MyHeader
          title="Numerology"
          navigation={props.navigation}
          statusBar={{
            backgroundColor: colors.background_theme2,
            barStyle: 'light-content',
          }}
        />
      ),
    });
  }, []);

  const date_handle = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDobVisible(false);
    setDob(currentDate);
  };

  const time_handle = (event, selectedTime) => {
    const currenttime = selectedTime;
    setTobVisible(false);
    setTob(currenttime);
  };



  const validation = () => {
    const nameRegex = /^[A-Za-z.]+(?: {1,4}[A-Za-z.]+)* ?$/;
    const trimmedName = name.trim();
  
    if (trimmedName.length == 0) {
      warnign_toast('Please enter name.');
      return false;
    } else if(trimmedName.length > 40) {
      warnign_toast('Name can contain only 40 characters.');
      return false;  // This was missing
    } else if (!nameRegex.test(trimmedName)) {
      warnign_toast('Name can only contain alphabetic characters.');
      return false;
    } else if (dob == null) {
      warnign_toast('Please select date of birth.');
      return false;
    } else if (tob == null) {
      warnign_toast('Please select time of birth.');
      return false;
    } else {
      return true;
    }
  };
  

  console.log(props?.customerData?._id, 'asdfasdf')

  const credentials = `${630051}:${'861bba6a92587a326a9b11ab9dfb9b7ca3492fab'}`;
  const token = btoa(credentials);


  console.log(new Date(tob).getMinutes(), 'asdfasdf')
  const tobnew = moment(dob).format('HH:mm:ss')
  const dobnew = moment(dob).format('YYYY:MM:DD');
  console.log(dobnew.split(':')[0])
  console.log(dob,dobnew,'new date')
  const year = dobnew.split(':')[0];
  const date = dobnew.split(':')[2];
  const month = dobnew.split(':')[1];

  console.log(year, date, month, 'time')
 console.log(dob,'date numero',tobnew)



  const submit = async () => {
    console.log(dobnew,'datenum',tobnew,'all da')
    if (validation()) {
      setIsLoading(true);
      try {
        const response = await axios({
          method: 'post',
          url: 'https://json.astrologyapi.com/v1/numero_table',
          headers: {
            "authorization": `Basic ${token}`,
            "Content-Type": 'application/json'
          },
          data: {
            day: dobnew.split(':')[2],
            month: dobnew.split(':')[1],
            year: dobnew.split(':')[0],
            hour: new Date(tob).getHours(),
            min: new Date(tob).getMinutes(),
            lat: 28.7041,
            lon: 77.1025,
            tzone: 5.5,
            name: name
          },
        });

        console.log('Data received:', response.data);
        const res = response.data;
        if (response.data) {
          submit1();
          setDob(null);
          setTob(null);
          setName('');
          props.navigation.navigate('NumerologyForU', { data: res })
        } else {
          Alert.alert('message', 'try again');
        }
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log(err,);
      }
    }
  };

  const submit1 = async () => {
    if (validation()) {
      setIsLoading(true);

      console.log( {
        customerId:props?.customerData?._id,
        name:name ,
        time: tobnew,
        date: dobnew
      },'asdfasdfsadf')
      try {
        const response = await axios({
          method: 'post',
          // url: 'http://194.238.17.230:4000/api/customers/user_numerology',
          url: api_url + open_Numerology,
          data: {
            customerId:props?.customerData?._id,
            name:name ,
            time: moment(tob).format('HH:mm:ss'),
            date: moment(dob).format('YYYY-MM-DD'),
            latitude: 28.7041,
            longitude: 77.1025,
          },
        });

        console.log('Data received:', response.data);
        const res = response.data;
        if (response.data.success == true) {
          props.dispatch(KundliActions.getOpenNumerology())
          showToastMessage({message:("Data Saved Sucessfully")})
          
                } else {
          Alert.alert('message', 'try again');
        }
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log(err,'2222');
      }
    }
  };


  return (
    <View style={{ flex: 1, backgroundColor: colors.black_color1 }}>
      <MyLoader isVisible={isLoading} />
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
            // borderWidth: 1,
          }}>
          <View
            style={{
              // position: 'relative',
              alignSelf: 'flex-start',
              justifyContent: 'center',
              width: width * 0.1,
              paddingTop: responsiveScreenWidth(2),
              position: 'relative',
              marginRight: responsiveScreenWidth(10),
              top: 9,
            }}>
            <MaterialCommunityIcons
              name="account"
              color={colors.black_color8}
              size={32}
            />
          </View>

          <TextInput
            value={name}
            placeholder="Enter full Name"
            placeholderTextColor={colors.black_color5}
            onChangeText={setName}
            style={[
              // styles.inputContainer,
              {
                color: colors.black_color9,
                fontFamily: fonts.medium,
                // alignItems: 'center',
                borderBottomWidth: 1.7,
                borderColor: colors.black_color6,
                width: width * 0.6,
                left: -34,
                padding: 10,
                marginBottom: height * 0.02,
              },
            ]}
          />
        </View>

        <View
          style={{
            flex: 0,
            width: '100%',
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'space-between',
          }}>

          <View style={{ flexDirection: 'column', width: '70%' }}>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  // position: 'relative',
                  alignSelf: 'flex-start',
                  justifyContent: 'center',
                  width: width * 0.1,
                  paddingTop: responsiveScreenWidth(2),
                  position: 'relative',
                  marginRight: responsiveScreenWidth(14),
                  top: -4,
                  left: 18,
                }}>
                <FontAwesome5
                  name="calendar-alt"
                  color={colors.black_color8}
                  size={26}
                />
              </View>
              <TouchableOpacity
                onPress={() => setDobVisible(true)}
                style={{ ...styles.touchinputContainer }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.black_color7,
                    fontFamily: fonts.medium,
                    marginLeft: 5,
                  }}>
                  {dob == null ? 'Date Of Birth' : moment(dob).format('YYYY-DD-MM')}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  // position: 'relative',
                  alignSelf: 'flex-start',
                  justifyContent: 'center',
                  width: width * 0.1,
                  paddingTop: responsiveScreenWidth(2),
                  position: 'relative',
                  marginRight: responsiveScreenWidth(14),
                  top: -4,
                  left: 18,
                }}>
                <FontAwesome5
                  name="clock"
                  color={colors.black_color8}
                  size={26}
                />
              </View>

              <TouchableOpacity
                onPress={() => setTobVisible(true)}
                style={{ ...styles.touchinputContainer }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.black_color7,
                    fontFamily: fonts.medium,
                    marginLeft: 5,
                  }}>
                  {tob == null ? 'Time Of Birth' : moment(tob).format('HH:mm')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {dobVisible && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dob != null ? dob : new Date()}
            mode={'date'}
            onChange={date_handle}
            display="spinner"
            minimumDate={new Date(1900, 1, 1)}
          />
        )}
        {tobVisible && (
          <DateTimePicker
            testID="dateTimePicker"
            value={tob != null ? tob : new Date()}
            mode={'time'}
            onChange={time_handle}
            display="spinner"
          />
        )}

        <TouchableOpacity style={styles.buttonContainer} onPress={submit}>
          <Text style={styles.buttonText}>Numerology</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  wallet: state.customer.wallet,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)( Numerology);

const styles = StyleSheet.create({
  container: {
    width: '95%',
    marginTop: height * 0.03,
    height: height * 0.52,
    backgroundColor: colors.background_theme1,
    alignSelf: 'center',
    borderRadius: 5,
    shadowColor: colors.black_color4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    padding: 15,
  },
  buttonContainer: {
    width: '100%',
    height: height * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.background_theme2,
    marginTop: height * 0.04,
    shadowColor: colors.red_color1,
  },
  buttonText: {
    fontSize: 16,
    color: colors.white_color,
    fontFamily: fonts.bold,
    textAlign: 'center',
    fontWeight: '600',
  },
  inputContainer: {
    flex: 0,
    // height: height * 0.07,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    // borderRadius: 10,
    borderColor: colors.black_color6,
    padding: 10,
    marginBottom: height * 0.02,
  },
  checkBoxText: {
    fontSize: 14,
    color: colors.black_color8,
    fontFamily: fonts.medium,
    textDecorationLine: 'none',
  },
  touchinputContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.background_theme2,
    padding: 10,
    marginBottom: height * 0.02,
    width: '80%',
    marginHorizontal: '1%',
    left: -24,
  },
});
