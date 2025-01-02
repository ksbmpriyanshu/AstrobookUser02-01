import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useEffect } from 'react';
import MyHeader from '../components/MyHeader';
import { colors, google_map_key } from '../config/Constants1';
import { useTranslation } from 'react-i18next';
import * as SettingActions from '../redux/actions/SettingActions'
import { connect } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';

const { width, height } = Dimensions.get('screen');

const PlaceOfBirth = ({ dispatch, navigation, route }) => {
  const { t } = useTranslation();
  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <MyHeader
          title="Place of Birth"
          socialIcons={false}
          navigation={navigation}
          statusBar={{
            backgroundColor: colors.background_theme2,
            barStyle: 'light-content',
          }}
        />
      ),
    });
  }, []);

  const handle_selected = (address, lat, lon) => {
    console.log("dis---",address)
    if (typeof route?.params?.type != 'undefined' && route.params?.type == 'sub') {
      dispatch(SettingActions.setSubLocationData({ address, lat, lon }))
    } else {
      console.log("dis--",address)
      dispatch(SettingActions.setLocationData({ address, lat, lon }))
    }
    navigation.goBack()
  }

  return (
    <View style={{ flex: 1 }}>
      
      <GooglePlacesAutocomplete
        placeholder="Birth Place"
    placeholderTextColor='#000000'
        fetchDetails={true}
        // onPress={handle_selected}
        onPress={(data, details) => {
          // console.log("====",details.geometry)
          handle_selected(data.description, details.geometry?.location?.lat, details.geometry?.location?.lng)
        }}
        query={{
          key: google_map_key,
          language: t('lang'),
        }}
        currentLocation={true}
        numberOfLines={3}
        isRowScrollable={false}
        currentLocationLabel="Current location"
        enablePoweredByContainer={false}
        returnKeyType='previous'
        renderLeftButton={() => {
          return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign
              name="search1"
              size={24}
              color={colors.grey_color}
              style={{ paddingLeft: 10 }}
            />
            </View>
          );
        }}
        styles={{
          textInputContainer: {
            flexDirection: 'row',
            borderWidth:1,
            marginHorizontal:10,
            marginTop:10,
            borderRadius:10,
            backgroundColor:colors.white_color,
            alignItems:'center'
          },
          textInput: {
            color: 'black',
            height: 44,
            borderRadius: 5,
            // paddingVertical: 5,
            // paddingHorizontal: 10,
            fontSize: 18,
            flex: 1,
            // borderWidth: 1,
            // borderColor: 'black',
            // margin: 10,
            placeholderTextColor: "black",
            marginTop:3
            
          },
          poweredContainer: {
            justifyContent: 'flex-end',
            alignItems: 'center',
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
            borderColor: '#c8c7cc',
            borderTopWidth: 0.5,
          },
          powered: {},
          listView: {

          },
          row: {
            padding: 13,
            height: 44,
            flexDirection: 'row',
          },
          separator: {
            height: 0.5,
            backgroundColor: '#c8c7cc',
          },
          description: { color: 'black' },
          loader: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            height: 20,

          },
          
        }}
        
      />
    </View>
  );
};

export const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(null, mapDispatchToProps)(PlaceOfBirth);


