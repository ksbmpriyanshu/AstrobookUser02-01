import { View, Text, FlatList, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import { api_getfollowinglist, api_url, colors, fonts, getFontSize, img_url } from '../../config/Constants1';
import MyHeader from '../../components/MyHeader';
import { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import MyLoader from '../../components/MyLoader';
import { useTranslation } from 'react-i18next';
import { getFSInfo } from 'react-native-fs';
import * as CustomerActions from '../../redux/actions/CustomerActions'
import { base_url } from '../../config/constants';
import { Sizes, Fonts, Colors } from '../../assets/style';
import * as ChatActions from '../../redux/actions/ChatActions'
import * as AstrologerActions from '../../redux/actions/AstrologerActions'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import StarRating from 'react-native-star-rating-widget';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const { width, height } = Dimensions.get('screen');

const Following = ({ navigation, route, dispatch, followingListData }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [followingData, setFollowingData] = useState(null);


  useEffect(() => {
    dispatch(CustomerActions.getFollowingList())
    navigation.setOptions({
      header: () => (
        <MyHeader
          title={t('following')}
          socialIcons={false}
          navigation={navigation}
          statusBar={{
            backgroundColor: colors.background_theme2,
            barStyle: 'light-content',
          }}
        />
      ),
    });
  }, [dispatch]);

  const onChat = (astroData) => {
    const payload = {
      type: 'chat',
      astrologerName: astroData?.astrologerName,
      language: astroData?.language,
      astrologerId: astroData?._id,
      chatPrice:
        parseFloat(astroData?.chat_price) +
        parseFloat(astroData?.commission_chat_price),
    };
    dispatch(ChatActions.onChatNow(payload));
  }

  const onCall = (astroData) => {
    const payload = {
      type: 'call',
      astrologerName: astroData?.astrologerName,
      language: astroData?.language,
      astrologerId: astroData?._id,
      chatPrice:
        parseFloat(astroData?.chat_price) +
        parseFloat(astroData?.commission_chat_price),
    };
    dispatch(ChatActions.onChatNow(payload));
  }
  const [rating, setRating] = useState(4);
  const renderItem = ({ item, index }) => {
    console.log(item, 'all data ')
    return (
      // <TouchableOpacity
      //   style={styles.container}
      //   activeOpacity={0.6}
      //   onPress={() =>
      //     navigation.navigate('astrologerDetailes', {
      //       _id: item?._id,
      //     })}
      //   >
      //   <View style={[styles.row, { justifyContent: 'space-between' }]}>
      //     <View style={styles.row} >
      //       <Image source={{ uri: base_url + item?.profileImage }} style={{ width: width  0.2, height: width  0.2, borderRadius: 10000 }} />
      //       <View style={{ marginLeft: Sizes.fixPadding }}>
      //         <Text allowFontScaling={false} style={{ ...Fonts.primaryDark16RobotoMedium }}>{item.astrologerName}</Text>
      //         <Text allowFontScaling={false} style={{ ...Fonts.gray12RobotoMedium }}>{item.gender}</Text>
      //       </View>

      //   </View>
      //   </View>
      //     <TouchableOpacity activeOpacity={0.8} onPress={() => dispatch(AstrologerActions.onFollowUnfollowAstrologer(item?._id))} style={{...styles.actions,borderRadius:10}}>
      //       <Text allowFontScaling={false} style={{ ...Fonts.black14InterMedium,color:Colors.white }}>Unfollow</Text>
      //     </TouchableOpacity>

      //   {/* <View style={styles.actionsContainer}>
      //     <TouchableOpacity onPress={() => onChat(item)} style={styles.actions}>
      //       <Text style={{ ...Fonts.white14RobotoMedium }}>Chat</Text>
      //     </TouchableOpacity>
      //     <TouchableOpacity onPress={() => onCall(item)} style={[styles.actions, { marginLeft: Sizes.fixPadding }]}>
      //       <Text style={{ ...Fonts.white14RobotoMedium }}>Call</Text>
      //     </TouchableOpacity>
      //   </View> */}

      // </TouchableOpacity>
      <View style={{  flexDirection: "row" ,paddingVertical:SCREEN_HEIGHT*0.01,borderRadius:10,backgroundColor:"white",elevation:10,marginVertical:SCREEN_HEIGHT*0.01}}>

        <View style={{ alignItems:"center",gap:SCREEN_HEIGHT*0.001,paddingHorizontal:SCREEN_WIDTH*0.025}}>

          <View style={{ width: width*0.26, height: width*0.26, borderWidth: 1.5, borderRadius: 100, alignItems: "center", justifyContent: "center",borderColor:colors.astrobook1 }}>
            <Image source={{ uri: base_url + item?.profileImage }} style={{ width: width*0.25, height: width*0.25, borderRadius: 100, }} />
          </View>

          <StarRating
            rating={rating}
            onChange={setRating}
            starStyle={{ marginHorizontal: 0 }}
            starSize={16}
          />

          <View style={{ flexDirection: "row", gap: SCREEN_WIDTH * 0.01, alignItems: "center" }}>

            <Ionicons name='person' color={colors.black_color7} size={8} />

            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1) }}>15550 Orders</Text>
          </View>

        </View>

        <View style={{gap:SCREEN_HEIGHT*0.002,paddingHorizontal:SCREEN_WIDTH*0.015,paddingVertical:SCREEN_HEIGHT*0.01}}>
          <Text style={{...Fonts.black11InterMedium,fontSize:responsiveFontSize(2)}}>{item.astrologerName}</Text>
          <Text style={{...Fonts.black12RobotoRegular,fontSize:responsiveFontSize(1.6)}}>Numerlogy,Vastu,Tarot,face Reading...</Text>
          <Text style={{...Fonts.black12RobotoRegular,fontSize:responsiveFontSize(1.6)}}>{item.language}</Text>
          <Text style={{...Fonts.black12RobotoRegular,fontSize:responsiveFontSize(1.6)}}>Exp:5 Years</Text>
          <View style={{flexDirection:"row",justifyContent:"flex-end",}}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => dispatch(AstrologerActions.onFollowUnfollowAstrologer(item?._id))} style={{ borderWidth:1,width:SCREEN_WIDTH*0.3,alignItems:"center" ,height:SCREEN_HEIGHT*0.05,justifyContent:"center",borderRadius:15,backgroundColor:colors.astrobook1,borderColor:colors.white_color}}>
              <Text allowFontScaling={false} style={{ ...Fonts.black14InterMedium, color: Colors.white }}>Unfollow</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    );
  };

  const _listEmptyComponent = () => {
    return (
      <View style={{ height: SCREEN_HEIGHT * 0.8, justifyContent: 'center', alignItems: 'center' }}>
        <Text allowFontScaling={false} style={{
          fontSize: 16,
          color: colors.black_color,
          fontFamily: fonts.medium,
          textAlign: 'center'
        }}>You Have Not Followed Anyone Yet</Text>
        {/* <Image  source={require('../../assets/images/icon/novideo.png')} 
              style={{width:300,height:300,borderRadius:20}}/> */}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.book_status_bar }}>
      <MyLoader isVisible={isLoading} />
      {followingListData && (
        <FlatList
          data={followingListData}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 15 }}
          ListEmptyComponent={_listEmptyComponent}
        />
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  followingListData: state.customer.followingListData,
});

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Following);

const styles = StyleSheet.create({
  container: {
    flex: 0,

    backgroundColor: colors.background_theme1,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    shadowColor: colors.black_color2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
    borderWidth: 1,
    borderColor: "#dadada"
  },
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: Sizes.fixPadding
  },
  actions: {
    backgroundColor: Colors.primaryLight,
    width: '30%',
    paddingVertical: Sizes.fixPadding,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Sizes.fixPadding * 0.8,
    alignSelf: 'flex-end'
  }

})
