import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
  TextInput,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import * as AstrologerActions from '../redux/actions/AstrologerActions';
import MyLoader from '../components/MyLoader';
import HomeHeader from '../components/HomeHeader';
import { Colors, Fonts, Sizes } from '../assets/style';
import { ActivityIndicator } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { colors, fonts } from '../config/Constants1';
import { base_url } from '../config/constants';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../config/Screen';
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import MyStatusBar from '../components/MyStatusbar';
import StarRating from 'react-native-star-rating-widget';
import HomeChat from '../components/HomeChat';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { showToastMessage } from '../utils/services';

const { width } = Dimensions.get('screen');

let timeout;

const Search = ({ chatListData, navigation, dispatch, isRefreshing, isMoreLoading }) => {
  const [rating, setRating] = useState(4.5);
  const { t } = useTranslation();

  const [noData, setNoData] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');


  const sortedData = useMemo(() => {
    const statusOrder = { online: 1, busy: 2, offline: 3 };
    return chatListData?.sort((a, b) => (statusOrder[a.chat_status] || 4) - (statusOrder[b.chat_status] || 4));
  }, [chatListData]);

  useEffect(() => {
    dispatch(AstrologerActions.getChatAstroData());
  }, [dispatch]);

  const filteredAstrologers = chatListData.filter(astro =>
    astro.astrologerName.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const rounditem = (item) => {
    const wallet = item.toString();
    const slice11 = wallet.slice(0, 4);
    return slice11;
  };
  function formatNumber(value) {
    if (value >= 1_000_000_000) {
      // Format as billion (e.g., 1.2B)
      return `${(value / 1_000_000_000).toFixed(1)}B`;
    } else if (value >= 1_000_000) {
      // Format as million (e.g., 1.5M)
      return `${(value / 1_000_000).toFixed(1)}M`;
    } else if (value >= 1_000) {
      // Format as thousand (e.g., 2.3K)
      return `${(value / 1_000).toFixed(1)}K`;
    } else {
      // For values less than 1,000, show the raw number
      return value.toString();
    }
  }
  const renderItems = ({ item }) => {
    return (
      <View
        // onPress={() =>
        //   navigation.navigate('astrologerDetailes', {
        //     _id: item?._id,
        //     type: 'call',
        //   })
        // }
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
          {/* <View style={{ position: "absolute", top: 5, left: 5 }}>
            <View
              style={{
                backgroundColor:
                  item?.call_status === 'offline'
                    ? '#6D6D6D'
                    : item?.call_status === 'busy'
                      ? '#F6FF00'
                      : item?.call_status === 'online'
                        ? '#27AE60'
                        : '#FFFFFF',
                height: 15,
                width: 15,
                borderRadius: 15,
              }}
            />
          </View> */}
          <View style={{ position: "absolute", right: 5, top: 5 }}>
            <StarRating
              rating={item?.rating}
              onChange={setRating}
              starStyle={{ marginHorizontal: 1 }}
              starSize={12}
            />
            <Text style={{ ...Fonts.primaryHelvetica, color: "#000", fontSize: 10, textAlign: "center" }}>{formatNumber(item?.follower_count)} followers</Text>
            <Text style={{ ...Fonts.primaryHelvetica, color: "#828282", fontSize: 8, textAlign: "center", lineHeight: 8 }}>2212 orders</Text>
          </View>
          <View>
            {item?.profileImage ? (
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
                                   ):(  
                                     <Image
                                     source={require('../assets/astrobookimages/avatar_book.png')}
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
                                   )}
          </View>
          <View>
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
            <View style={{ marginTop: 10, display: "flex", flexDirection: "row", gap: 5 }}>


              <TouchableOpacity style={{
                borderWidth: 1,
                borderColor: '#27AE60',
                paddingVertical: 5,
                borderRadius: 10,
                paddingHorizontal: 12,
                borderColor: item?.chat_status === 'offline'
                  ? 'red'
                  : item?.chat_status === 'busy'
                    ? '#F6FF00'
                    : item?.chat_status === 'online'
                      ? '#27AE60'
                      : '#FFFFFF',

              }}
                onPress={() => {
                  if (item?.chat_status === 'offline') {

                    showToastMessage({ message: "Astrologer is offline" });
                  } else if (item?.chat_status === 'busy') {

                    showToastMessage({ message: "Astrologer is busy" });
                  } else {

                    navigation.navigate('astrologerDetailes', {
                      _id: item?._id,
                      type: 'call',
                    });
                  }
                }}
              >
                <Text style={{
                  ...Fonts.primaryHelvetica,


                  color: item?.chat_status === 'offline'
                    ? 'red'
                    : item?.chat_status === 'busy'
                      ? 'gray'
                      : item?.chat_status === 'online'
                        ? '#27AE60'
                        : '#FFFFFF',



                  fontSize: 10, lineHeight: 14, textAlign: "center"
                }}>Chat</Text>
                <Text style={{
                  ...Fonts.primaryHelvetica,

                  color: item?.chat_status === 'offline'
                    ? 'red'
                    : item?.chat_status === 'busy'
                      ? 'gray'
                      : item?.chat_status === 'online'
                        ? '#27AE60'
                        : '#FFFFFF',




                  fontSize: 8, lineHeight: 10, textAlign: 'center'
                }}>₹{rounditem(parseFloat(item?.chat_price) + parseFloat(item?.commission_chat_price))}/min</Text>
              </TouchableOpacity>


              <TouchableOpacity style={{
                borderWidth: 1,
                borderColor: '#27AE60',
                paddingVertical: 5,
                borderRadius: 10,
                paddingHorizontal: 12,
                borderColor: item?.call_status === 'offline'
                  ? 'red'
                  : item?.call_status === 'busy'
                    ? '#F6FF00'
                    : item?.call_status === 'online'
                      ? '#27AE60'
                      : '#FFFFFF',
              }}
                onPress={() => {
                  if (item?.call_status === 'offline') {

                    showToastMessage({ message: "Astrologer is offline" });
                  } else if (item?.call_status === 'busy') {

                    showToastMessage({ message: "Astrologer is busy" });
                  } else {

                    navigation.navigate('astrologerDetailes', {
                      _id: item?._id,
                      type: 'call',
                    });
                  }
                }}
              >
                <Text style={{
                  ...Fonts.primaryHelvetica,
                  color: item?.call_status === 'offline'
                    ? 'red'
                    : item?.call_status === 'busy'
                      ? 'gray'
                      : item?.call_status === 'online'
                        ? '#27AE60'
                        : '#FFFFFF',
                  fontSize: 10, lineHeight: 14, textAlign: "center"
                }}>Call</Text>
                <Text style={{
                  ...Fonts.primaryHelvetica,

                  color: item?.call_status === 'offline'
                    ? 'red'
                    : item?.call_status === 'busy'
                      ? 'gray'
                      : item?.call_status === 'online'
                        ? '#27AE60'
                        : '#FFFFFF',

                  fontSize: 8, lineHeight: 10, textAlign: 'center'
                }}>₹{rounditem(parseFloat(item?.call_price) + parseFloat(item?.commission_call_price))}/min</Text>
              </TouchableOpacity>


              <TouchableOpacity style={{
                borderWidth: 1,

                paddingVertical: 5,
                borderRadius: 10,
                paddingHorizontal: 10,
                borderColor: item?.video_call_status === 'offline'
                  ? 'red'
                  : item?.video_call_status === 'busy'
                    ? '#F6FF00'
                    : item?.video_call_status === 'online'
                      ? '#27AE60'
                      : '#FFFFFF',



              }}
                onPress={() => {
                  if (item?.video_call_status === 'offline') {

                    showToastMessage({ message: "Astrologer is offline" });
                  } else if (item?.video_call_status === 'busy') {

                    showToastMessage({ message: "Astrologer is busy" });
                  } else {

                    navigation.navigate('astrologerDetailes', {
                      _id: item?._id,
                      type: 'call',
                    });
                  }
                }}
              >
                <Text style={{
                  ...Fonts.primaryHelvetica,
                  color: item?.video_call_status === 'offline'
                    ? 'red'
                    : item?.video_call_status === 'busy'
                      ? 'gray'
                      : item?.video_call_status === 'online'
                        ? '#27AE60'
                        : '#FFFFFF',



                  fontSize: 10, lineHeight: 14, textAlign: "center"
                }}>Video Call</Text>
                <Text style={{
                  ...Fonts.primaryHelvetica,

                  color: item?.video_call_status === 'offline'
                    ? 'red'
                    : item?.video_call_status === 'busy'
                      ? 'gray'
                      : item?.video_call_status === 'online'
                        ? '#27AE60'
                        : '#FFFFFF',




                  fontSize: 8, lineHeight: 10, textAlign: 'center'
                }}>₹{rounditem(parseFloat(item?.normal_video_call_price) + parseFloat(item?.commission_normal_video_call_price))}/min</Text>
              </TouchableOpacity>


            </View>
          </View>
        </View>
      </View>
    )
  };

  const renderSearchBar = () => {
    return (
      <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.022, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
        <View
          onPress={() => navigation.navigate('Search')}
          style={{
            flexDirection: "row", alignItems: "center", gap: SCREEN_WIDTH * 0.02,
            paddingHorizontal: SCREEN_WIDTH * 0.025, borderRadius: 5, backgroundColor: "white", elevation: 1
          }}>
          <AntDesign name='search1' size={20} color={colors.black_color7} />
          <TextInput
            placeholderTextColor={colors.black_color7}
            placeholder='Search astrologers by name'
            value={searchTerm}
            onChangeText={setSearchTerm}
            style={{color:colors.black_color7}}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <MyStatusBar backgroundColor={colors.black_color2} barStyle="dark-content" />
      <HomeChat title="Search" navigation={navigation} />
      <View style={{ flex: 1 }}>
        {renderSearchBar()}
        {noData ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: "black", fontSize: 16, fontFamily: fonts.medium }}>
              {t('No Astrologers Found')}
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredAstrologers}
            renderItem={renderItems}
            keyExtractor={item => item?._id}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
              <View style={{ height: 50 }}>
                {isMoreLoading && <ActivityIndicator color={Colors.primaryLight} size={'small'} />}
              </View>
            }
            onEndReached={() => dispatch(AstrologerActions.getMoreChatAstroData(searchTerm))}
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => {
              setSearchTerm('');
              dispatch(AstrologerActions.onRefreshCallAstrologer());
            }} />}
          />
        )}
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  chatListData: state.astrologer.chatListData,
  customerData: state.customer.customerData,
  isRefreshing: state.setting.isRefreshing,
  isMoreLoading: state.setting.isMoreLoading,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Search);
