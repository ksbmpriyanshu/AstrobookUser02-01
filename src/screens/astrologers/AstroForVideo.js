import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  TextInput,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { api_astrolist1, api_url, colors, fonts } from '../../config/Constants1';
import MyLoader from '../../components/MyLoader';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyHeader from '../../components/MyHeader';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';
import { connect } from 'react-redux';
import * as AstrologerActions from '../../redux/actions/AstrologerActions';
import { base_url } from '../../config/constants';
import * as ChatActions from '../../redux/actions/ChatActions';
import { Colors, Fonts, Sizes } from '../../assets/style';
import Stars from 'react-native-stars';
import HomeHeader from '../../components/HomeHeader';
import { ActivityIndicator } from 'react-native-paper';
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { SCREEN_WIDTH } from '../../config/Screen';
import MyStatusBar from '../../components/MyStatusbar';
import StarRating from 'react-native-star-rating-widget';
import HomeChat from '../../components/HomeChat';
import RBSheet from 'react-native-raw-bottom-sheet';
import Filter from './components/Filter';

const { width, height } = Dimensions.get('screen');

let timeout;

const AstroForVideo = ({
  chatListData,
  navigation,
  dispatch,
  isRefreshing,
  isMoreLoading,
  filterData
}) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [noData, setNoData] = useState(false);
  const [rating, setRating] = useState(4.5);
  const refRBSheet = useRef();
const sortedData = useMemo(() => {
  const statusOrder = { online: 1, busy: 2, offline: 3 };
  return chatListData?.sort((a, b) => (statusOrder[a.chat_status] || 4) - (statusOrder[b.chat_status] || 4));
}, [chatListData]);
  useFocusEffect(
    useCallback(() => {
      dispatch(AstrologerActions.getChatAstroData());
      return () => setSearch('');
    }, [dispatch])
  );

  const searchFilterFunction = text => {
    setSearch(text);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      dispatch(AstrologerActions.getChatAstroData(text));
      clearTimeout(timeout);
    }, 1500);
  };

  useEffect(() => {
    setNoData(chatListData?.length === 0 && search.length > 0)
  }, [chatListData, search]);

  const rounditem = item => {
    const wallet = item.toString();
    return wallet.slice(0, 4);
  };

  const renderItems = ({ item, index }) => {
    const onChat = astroData => {
      const payload = {
        type: 'chat',
        astrologerName: astroData?.astrologerName,
        language: astroData?.language,
        astrologerId: astroData?._id,
        chatPrice: parseFloat(astroData?.chat_price) + parseFloat(astroData?.commission_chat_price),
        astrostatus: astroData?.chat_status,
      };
      dispatch(ChatActions.onChatNow(payload));
    };
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('astrologerDetailes', {
            _id: item?._id,
            type: 'chat',

          })
        }
      >
        <View style={{
          borderWidth: 0.23,
          padding: 10,
          marginBottom: 10,
          marginHorizontal: 10,
          borderColor: "#bababa",
          borderRadius: 3,
          display: "flex",
          flexDirection: "row",
          gap: 7,

        }}>
          <View style={{ position: "absolute", top: 5, left: 5 }}>
            <View
              style={{
                backgroundColor:
                item?.video_call_status === 'offline'
                    ? '#6D6D6D'
                    : item?.video_call_status === 'busy'
                      ? '#F6FF00'
                      : item?.video_call_status === 'online'
                        ? '#27AE60'
                        : '#FFFFFF',
                height: 15,
                width: 15,
                borderRadius: 15,
              }}
            />
          </View>
          <View style={{ position: "absolute", right: 5, top: 5 }}>
            <StarRating
              rating={item?.rating}
              onChange={setRating}
              starStyle={{ marginHorizontal: 1 }}
              starSize={12}
            />
            <Text style={{ ...Fonts.primaryHelvetica, color: "#000", fontSize: 10, textAlign: "center" }}>{item?.follower_count} followers</Text>
            <Text style={{ ...Fonts.primaryHelvetica, color: "#828282", fontSize: 8, textAlign: "center", lineHeight: 8 }}>2212 orders</Text>
          </View>
          <View >
            <Image
              source={{ uri: base_url + item.profileImage }}
              style={{
                width: width * 0.30,
                height: width * 0.30,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: "#F1B646",
                resizeMode: 'cover',
                marginBottom: 5,
              }}
            />
            <Image source={require('../../assets/astrobookimages/tickverifires.png')}
              style={{ height: 20, width: 20, position: "absolute", right: responsiveScreenWidth(3), bottom: responsiveScreenHeight(2) }}
            />
          </View>
          <View >
            <Text style={{ ...Fonts.primaryHelvetica, color: "#000", fontSize: 14, lineHeight: 20 }}>
              {item?.astrologerName?.length > 15
                ? `${item.astrologerName.slice(0, 10)}...`
                : item?.astrologerName}
            </Text>
            <Text style={{ ...Fonts.primaryHelvetica, color: "#828282", fontSize: 10, lineHeight: 15 }}>Exp: {item.experience} Years</Text>
            <Text style={{ ...Fonts.primaryHelvetica, color: "#828282", fontSize: 10, lineHeight: 15 }}>{item?.language.join(', ')}</Text>
            <Text style={{
              ...Fonts.primaryHelvetica,
              color: "#828282",
              fontSize: 10,
              lineHeight: 15,
              width: responsiveScreenWidth(50),

            }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >{item?.skill && item?.skill.map(item => item?.skill).join(',')}</Text>

            <View style={{ marginTop: 10, display: "flex", flexDirection: "row", gap: 5, }}>
              <TouchableOpacity style={{
                borderWidth: 0.5,
                borderColor: '#27AE60',
                paddingVertical: 5,
                borderRadius: 10,
                paddingHorizontal: 12,
              }}
                onPress={() =>
                  navigation.navigate('astrologerDetailes', {
                    _id: item?._id,
                    type: 'call',

                  })
                }
              >
                <Text style={{ ...Fonts.primaryHelvetica, color: "#27AE60", fontSize: 10, lineHeight: 14, textAlign: "center" }}>Chat</Text>
                <Text style={{ ...Fonts.primaryHelvetica, color: "#000000", fontSize: 8, lineHeight: 10, textAlign: 'center' }}>₹{rounditem(parseFloat(item?.call_price) + parseFloat(item?.commission_call_price))}/min</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{
                borderWidth: 0.5,
                borderColor: '#27AE60',
                paddingVertical: 5,
                borderRadius: 10,
                paddingHorizontal: 12,
              }}
                onPress={() =>
                  navigation.navigate('astrologerDetailes', {
                    _id: item?._id,
                    type: 'call',

                  })
                }
              >
                <Text style={{ ...Fonts.primaryHelvetica, color: "#27AE60", fontSize: 10, lineHeight: 14, textAlign: "center" }}>Call</Text>
                <Text style={{ ...Fonts.primaryHelvetica, color: "#000000", fontSize: 8, lineHeight: 10, textAlign: 'center' }}>₹{rounditem(parseFloat(item?.call_price) + parseFloat(item?.commission_call_price))}/min</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{
                borderWidth: 0.5,
                borderColor: '#27AE60',
                paddingVertical: 5,
                borderRadius: 10,
                paddingHorizontal: 10,
              }}
                onPress={() =>
                  navigation.navigate('astrologerDetailes', {
                    _id: item?._id,
                    type: 'call',

                  })
                }
              >
                <Text style={{ ...Fonts.primaryHelvetica, color: "#27AE60", fontSize: 10, lineHeight: 14, textAlign: "center" }}>Video Call</Text>
                <Text style={{ ...Fonts.primaryHelvetica, color: "#000000", fontSize: 8, lineHeight: 10, textAlign: 'center' }}>₹{rounditem(parseFloat(item?.call_price) + parseFloat(item?.commission_call_price))}/min</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
 
  return (
    <View style={{ flex: 1, backgroundColor: colors.black_color1 }}>
      <MyLoader isVisible={isLoading} />
      <MyStatusBar
        backgroundColor={colors.book_status_bar}
        barStyle="dark-content"
      />
      <HomeChat title="Video With Astrologer" navigation={navigation} />
      <View style={{ flex: 1 }}>
        {/* {searchInfo()} */}
        <Filter />
        <View>
          <Image source={require('../../assets/astrobookimages/callbanner.png')}
            style={{
              width: SCREEN_WIDTH * 0.95,
              height: 80,
              objectFit: "contain",
              alignSelf: 'center'
            }}
          />
        </View>
        {chatListData?.length < 1 ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: colors.white_color, fontSize: 16, fontFamily: fonts.medium, color: "black" }}>
              No Data Found
            </Text>
          </View>
        ) : (
          <FlatList
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => {
              setSearch('');
              dispatch(AstrologerActions.onRefreshChatAstrologer());
            }} />}
            ListHeaderComponent={<>{chatListData && astrologerInfo()}</>}
            ListFooterComponent={<View style={{ height: 50 }}>
              {isMoreLoading && <ActivityIndicator color={Colors.primaryLight} size={'small'} />}
            </View>}
            onEndReached={() => dispatch(AstrologerActions.getMoreChatAstroData(search))}
          />
        )}
      </View>
    </View>
  );

  function astrologerInfo() {
    return (

      <FlatList
        data={sortedData}
        renderItem={renderItems}
        keyExtractor={item => item?._id}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: 50 }}>
          {isMoreLoading && <ActivityIndicator color={Colors.primaryLight} size={'small'} />}
        </View>}
        onEndReached={() => dispatch(AstrologerActions.getMoreChatAstroData(search))}
      />
    );
  }

  function searchInfo() {
    return (
      <View
        style={{
          flex: 0,
          backgroundColor: colors.background_theme1,
          paddingVertical: 10,
        }}
      >
        <View
          style={{
            flex: 0,
            width: '95%',
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            borderRadius: 1000,
            borderWidth: 1,
          }}
        >
          <Ionicons name="search" color={colors.black_color6} size={22} />
          <TextInput
            value={search}
            placeholder="Search Astrologer by name..."
            placeholderTextColor={colors.black_color6}
            onChangeText={text => searchFilterFunction(text)}
            style={{
              width: '100%',
              fontFamily: fonts.medium,
              color: colors.black_color8,
              padding: 8,
            }}
          />
        </View>
      </View>
    );
  }
};

const mapStateToProps = state => ({
  chatListData: state.astrologer.chatListData,
  isRefreshing: state.setting.isRefreshing,
  isMoreLoading: state.setting.isMoreLoading,
  filterData: state.astrologer.filterData,

});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AstroForVideo);
const styles = StyleSheet.create({

  proceedBtn: {
    backgroundColor: "#F1B646",
    paddingVertical: 15,
  },
  proceedText: {
    color: "#fff",
    ...Fonts.primaryHelvetica,
    textAlign: 'center',
    fontWeight: "700"
  },
  sortText: {
    backgroundColor: '#F1B646',
    color: "#fff",
    textAlign: "center",
    ...Fonts.primaryHelvetica,
    paddingVertical: 15,
  },
  crossBtn: {
    height: 30,
    width: 30,
    objectFit: "contain",
    backgroundColor: "#fff",
    borderRadius: 40,
    marginTop: -20,
    //  position:"absolute",
    //  top:-20,
    //  left:30,
  },
  filterView: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#fff",
    flex: 0.81,
  },
  filterTextSkills: {
    ...Fonts.primaryHelvetica,
    color: "#000", fontSize: 14,
    marginBottom: 10,
  }
})  
