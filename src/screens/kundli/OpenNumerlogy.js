import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
  Alert
} from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { connect } from 'react-redux';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import moment from 'moment';
const { width, height } = Dimensions.get('screen');

import { colors, fonts, } from '../../config/Constants1';

import { success_toast } from '../../components/MyToastMessage';
import { api_url, get_numerology, numo_refresh } from '../../config/constants';
import Toast from 'react-native-toast-message';
import { SCREEN_HEIGHT } from '../../config/Screen';
import * as KundliActions from '../../redux/actions/KundliActions';

const OpenNumerlogy = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  console.log(props?.openNumerologyData, 'cid')

  useEffect(() => {
    props.navigation.setOptions({
      tabBarLabel: 'PREVIOUS Numerology',
    });
  }, []);


  useEffect(() => {
    props.dispatch(KundliActions.getOpenNumerology())
  }, [props.dispatch])
  const onRefresh = () => {

    props.dispatch(KundliActions.getOpenNumerology())
  }
  useEffect(() => {
    if (props.openNumerologyData) {
      setFilteredData(props.openNumerologyData);
    }
  }, [props.openNumerologyData]);
  const Kundalidelete = (id) =>
    Alert.alert('', 'Do you want to delete?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => delete_kundali(id) },
    ]);
  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const newData = props.openNumerologyData.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(newData);
    } else {
      setFilteredData(props.openNumerologyData);
    }
  };

  // const delete_kundali = async (id) => {
  //   setIsLoading(true)
  //   console.log(id, 'asdjhfodashofi')
  //   await axios({
  //     method: 'Post',
  //     url: ' https://api.astrobook.co.in/customers/delete_numero_data',
  //     data: {

  //       id: id
  //     }
  //   }).then(res => {
  //     console.log(res.data, '11adsf')
  //     setIsLoading(false)
  //     // get_nuro();
  //     Toast.show({
  //       type: 'success',
  //       text1: 'Success',
  //       text2: 'Successfully deleted.',
  //       position: 'bottom',
  //       bottomOffset: 20,
  //       visibilityTime: 3000
  //     })
  //     props.dispatch(KundliActions.getOpenNumerology())
  //     success_toast('Successfully deleted.');
  //   }).catch(err => {
  //     setIsLoading(false)
  //     console.log("err", err)
  //   })
  // }
  const delete_kundali = (id) => {
    const payload = {
      id: id
    }
    props.dispatch(KundliActions.getDeleteNumerology(payload))
  }

  const credentials = `${630051}:${'861bba6a92587a326a9b11ab9dfb9b7ca3492fab'}`;
  const token = btoa(credentials);


  const submit = async (date, name, time) => {

    const tobnew = moment(time).format('HH:mm:ss')
    // console.log(time,'this is time')
    const dobnew = moment(date).format('YYYY:MM:DD');
    console.log(dobnew.split(':'), 'adsfds33')

    const year = dobnew.split(':')[0];
    const daate = dobnew.split(':')[2];
    const month = dobnew.split(':')[1];

    const hour = time.split(':')[0]
    const min = time.split(':')[1]
    // console.log(tobnew,time, hour, min,'asde111')
    console.log({
      day: dobnew.split(':')[2],
      month: dobnew.split(':')[1],
      year: dobnew.split(':')[0],
      hour: time.split(':')[0],
      min: time.split(':')[1],
      lat: 28.7041,
      lon: 77.1025,
      tzone: 5.5,
      name: name
    })

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
          hour: time.split(':')[0],
          min: time.split(':')[1],
          lat: 28.7041,
          lon: 77.1025,
          tzone: 5.5,
          name: name
        },
      });

      console.log('Data received:', response.data);
      const res = response.data;
      if (response.data) {
        props.navigation.navigate('NumerologyForU', { data: res })
      } else {
        Alert.alert('message', 'try again');
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err,);
    }

  };

  const nodatafound = () => {
    return (
      <View style={{ flex: 1, height: SCREEN_HEIGHT * 0.7, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: colors.grey_color }}>No Numerology Found</Text>
      </View>
    )
  }
  const renderItem = ({ item, index }) => {
    const firstLetter = str => {
      return str.charAt(0);
    };
    // console.log(item,'all data')
    return (
      <View
        style={{}}
      >
        <TouchableOpacity
          onPress={() => submit(item?.date, item?.name, item?.time)}
          activeOpacity={0.6}
          key={index}

          style={{
            flex: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            paddingVertical: 10,
            backgroundColor: colors.background_theme1,
            marginBottom: 15,
            borderRadius: 5,
            shadowColor: colors.black_color4,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.3,
            shadowRadius: 5,
          }}>
          <View
            style={{ flex: 0, flexDirection: 'row', alignItems: 'center' }}>

            <View
              style={{
                backgroundColor: colors.white_color,
                width: height * 0.04,
                height: height * 0.04,
                borderRadius: 100,
                borderColor: colors.background_theme2,
                borderWidth: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: colors.black_color,
                  fontWeight: '500',
                }}>
                {firstLetter(item?.name).toUpperCase()}
              </Text>
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text
                style={{
                  fontSize: 14,
                  color: colors.black_color7,
                  fontFamily: fonts.bold,
                }}>
                {item?.name}

              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>


                <Text
                  style={{
                    fontSize: 12,
                    color: colors.black_color7,
                    fontFamily: fonts.medium,
                  }}>
                  {moment(item?.date).format('MMMM Do YYYY')},

                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.black_color7,
                    fontFamily: fonts.medium,
                  }}>
                  {/* {moment(item?.time).format('LT')} */}
                  {item?.time}

                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={{ right: 50, position: 'absolute', marginRight: responsiveScreenWidth(4) }}
          // onPress={()=>props.navigation.navigate('editkundli',{data1:item})}
          >
            {/* <Entypo
            name="edit"
            color={colors.black_color7}
            size={22}
          /> */}
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => delete_kundali(item.kundali_id)}
            onPress={() => Kundalidelete(item?._id)}
            style={{
              flexDirection: 'row',
              width: '13%',
              justifyContent: 'space-between',
            }}>
            <MaterialCommunityIcons
              name="delete"
              color={colors.black_color7}
              size={23}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={{ flex: 0, backgroundColor: colors.black_color1 }}
    >

      <View
        style={{
          flex: 0,
          flexDirection: 'row',
          width: '95%',
          alignSelf: 'center',
          marginVertical: 15,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: colors.black_color6,
          alignItems: 'center', // Align items vertically in the middle
          padding: 5,
        }}>
        <Ionicons name="search" color={colors.black_color5} size={22} />
        <TextInput
          placeholder="Search  by name..."
          placeholderTextColor={colors.black_color5}
          value={searchQuery}
          onChangeText={handleSearch}
          style={{
            flex: 1, // Take up remaining space
            fontSize: 14,
            color: colors.black_color7,
            fontFamily: fonts.medium,
            padding: 5,
          }}
        />

      </View>

      <View style={{ width: '95%', alignSelf: 'center', height: '90%' }}

      >

        <Text
          style={{
            fontSize: 16,
            marginBottom: 10,
            fontFamily: fonts.medium,
            color: colors.black_color7,
          }}>
          Recent Data
        </Text>

        <FlatList
          data={filteredData}
          contentContainerStyle={{ paddingBottom: 50 }}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={nodatafound()}
        />

      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  wallet: state.customer.wallet,
  openNumerologyData: state.kundli.openNumerologyData
});
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(OpenNumerlogy);
