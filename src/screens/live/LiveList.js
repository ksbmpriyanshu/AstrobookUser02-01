import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, { useEffect } from 'react';
import MyStatusBar from '../../components/MyStatusbar';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { colors, fonts, getFontSize } from '../../config/Constants1';
import HomeHeader from '../../components/HomeHeader';
import { useState } from 'react';
import MyLoader from '../../components/MyLoader';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as AstrologerActions from '../../redux/actions/AstrologerActions';
import { base_url, img_url } from '../../config/constants';
import * as LiveActions from '../../redux/actions/LiveActions';
import database from '@react-native-firebase/database'
import { Sizes, Fonts, Colors } from '../../assets/style';
import moment from 'moment';

const { width, height } = Dimensions.get('screen');

const AstroLive = ({
  navigation,
  route,
  dispatch,
  isRefreshing,
  customerData,
  recentLiveSteamingsData,
}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [liveAstroListData, setLiveAstroListData] = useState(null);
  const { t } = useTranslation();
 console.log("shreee::>>>>>>>>>",liveAstroListData)
  useEffect(() => {
    dispatch(AstrologerActions.getRecentLiveStreamings())
  }, [dispatch])
  // console.log(recentLiveSteamingsData,'all data live::::')

  useEffect(() => {
    database().ref(`LiveAstro`).on('value', snapshot => {
      if (snapshot.val()) {
        const myDataObject = snapshot.val();
        if (myDataObject) {
          const myDataArray = Object.keys(myDataObject)
            .sort()
            .map(key => JSON.parse(myDataObject[key]));
          setLiveAstroListData(myDataArray.reverse());
        }
      } else {
        setLiveAstroListData(null)
      }
    })
  }, [])

  const onPress = (item) => {
    if (!!customerData?.customerName) {
      dispatch(LiveActions.createLiveProfile(item))
    } else {
      navigation.navigate('customerAccount')
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.black_color1 }}>
       <MyStatusBar
        backgroundColor={colors.book_status_bar}
        barStyle="dark-content"
      />
      <HomeHeader navigation={navigation} />

      <MyLoader isVisible={isLoading} />
      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={<>
            {liveAstroListData && liveAstrolgoerInfo()}
            {recentLiveSteamingsData && recentLiveSessions()}
          </>}
        />
      </View>

    </View>
  );

  function liveAstrolgoerInfo() {

    const renderItem = ({ item, index }) => {
      return (
        <TouchableOpacity
          activeOpacity={0.9} // Set the active opacity level here
          onPress={() => onPress(item)}
          style={{
            flex: 0,
            width: width * 0.355,
            borderRadius: 5,
            marginVertical: 10,
            shadowColor: colors.black_color5,
            shadowOffset: { width: 2, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            marginHorizontal: 20,
          }}>
          <View
            style={{
              borderRadius: 10,
              borderColor: '#ddd',
              backgroundColor: colors.background_theme2,
            }}>
            <View style={{ height: 150, alignItems: 'center' }}>
              <Image
                source={{ uri: base_url + item?.astrologerId?.profileImage }}
                style={{
                  width: width * 0.25,
                  height: width * 0.25,
                  borderRadius: 100,
                  borderWidth: 0.5,
                  borderColor: colors.white_color,
                  marginTop: 10,
                }}
              />
              <View style={{}}>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: getFontSize(1.4),
                    color: colors.black_color9,
                    fontFamily: fonts.semi_bold,
                    paddingRight: 10,
                    textAlign: 'center',
                  }}>
                  {item?.astrologerId?.astrologerName}
                </Text>
                <View
                  style={{
                    flex: 0.9,
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('../../assets/images/live_gif.gif')}
                    style={{ width: 102, height: 25 }}
                  />
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )
    }

    return (
      <View style={{ margin: Sizes.fixPadding * 1.5 }}>
        <FlatList
          data={liveAstroListData}
          renderItem={renderItem}
          keyExtractor={item => item?._id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </View>
    )
  }

  function recentLiveSessions() {
    const renderItem = ({ item, index }) => {
      return (
        <TouchableOpacity
          activeOpacity={0.9} // Set the active opacity level here
          onPress={() => onPress(item)}
          disabled
          style={{
            flex: 0,
            width: width * 0.355,
            borderRadius: 5,
            marginVertical: 10,
            shadowColor: colors.black_color5,
            shadowOffset: { width: 2, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            marginHorizontal: 20,
          }}>
          <View
            style={{
              borderRadius: 10,
              borderColor: '#ddd',
              backgroundColor: Colors.grayLight,
              paddingVertical:Sizes.fixPadding
            }}>
            <View style={{ height: 150, alignItems: 'center' }}>
              <Image
                source={{ uri: base_url + item?.profileImage }}
                fadeDuration={300}
                style={{
                  width: width * 0.25,
                  height: width * 0.25,
                  borderRadius: 100,
                  borderWidth: 0.5,
                  borderColor: colors.white_color,
                  marginTop: 10,
                }}
              />
              <Text
                allowFontScaling={false}
                style={{
                  ...Fonts.black14InterMedium,
                  color: Colors.blackLight
                }}
                numberOfLines={1}
                >
                {item?.astrologerName}
              </Text>
              <Text
                allowFontScaling={false}
                style={{
                  ...Fonts.black11InterMedium,
                  color: Colors.gray
                }}>
                {moment(item?.endTime).format('DD.MM.YYYY hh:mm A')}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    }
    
    return (
      <View style={{ margin: Sizes.fixPadding * 1.5 }}>
        <Text style={{ ...Fonts.black16RobotoMedium }}>Recent Sessions</Text>
        <FlatList
          data={recentLiveSteamingsData}
          renderItem={renderItem}
          keyExtractor={item => item?._id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </View>
    )
  }

};

const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  liveAstroListData: state.astrologer.liveAstroListData,
  recentLiveSteamingsData: state.astrologer.recentLiveSteamingsData,
  isRefreshing: state.setting.isRefreshing,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AstroLive);

const styles = StyleSheet.create({
  noContentContainer: {
    flex: 0,
    height: height * 0.15,
    backgroundColor: colors.background_theme1,
    borderRadius: 10,
    borderColor: colors.black_color6,
    borderWidth: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    width: width * 0.16,
    height: width * 0.16,
    resizeMode: 'cover',
    borderRadius: 1000,
  },
});
