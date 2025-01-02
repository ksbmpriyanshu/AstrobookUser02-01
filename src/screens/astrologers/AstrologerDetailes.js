import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  ImageBackground,
  // Modal,
} from 'react-native';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import MyHeader from '../../components/MyHeader';
import {
  colors,
  fonts,
  getFontSize,
} from '../../config/Constants1';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useState } from 'react';
import MyLoader from '../../components/MyLoader';
import { connect } from 'react-redux';
const { width } = Dimensions.get('screen');
import { useTranslation } from 'react-i18next';
import * as AstrologerActions from '../../redux/actions/AstrologerActions';
import { base_url, img_url } from '../../config/constants';
import { Colors, Sizes, Fonts } from '../../assets/style';
import * as ChatActions from '../../redux/actions/ChatActions';
import { showNumber, showToastMessage } from '../../utils/services';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import Stars from 'react-native-stars';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import StarRating from 'react-native-star-rating-widget';
import RBSheet from 'react-native-raw-bottom-sheet';
import * as CustomerActions from '../../redux/actions/CustomerActions';
import MyStatusBar from '../../components/MyStatusbar';

const AstrologerDetailes = ({
  route,
  navigation,
  dispatch,
  reviewData,
  astroData,
  isFollow,
  customerData,
  rechargeOfferList
}) => {
  const { t } = useTranslation();
  const purpose = route.params.type;
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(4.5);

  const [state, setState] = useState({
    seeMore: false,
    seeMore1: false
  });

console.log("anujjjjjj",astroData)


  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => {
    dispatch(CustomerActions.getWalletRechargeOfferList())
  }, [dispatch]);
  const refRBSheet = useRef();
  const [selectedOffer, setSelectedOffer] = useState(null);

  const handleSelectOffer = (item) => {
    setSelectedOffer(item);
  };

  const handleProceed = () => {
    if (selectedOffer) {
      navigation.navigate('WalletGstAmount', {
        amount: selectedOffer?.amount,
        rechargePlanId: selectedOffer?._id,
      });
    }
  };
  const bio = astroData?.astrologer?.long_bio || '';
  const words = bio.split(' ');
  const truncatedBio = words.slice(0, 90).join(' ');
  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <MyHeader
          title={t('astrologer_details')}
          navigation={navigation}
          statusBar={{
            backgroundColor: colors.background_theme2,
            barStyle: 'light-content',
          }}
        />
      ),
    });
  }, []);

  useEffect(() => {
    dispatch(AstrologerActions.getAstrologerData(route?.params?._id));
    return () => {
      dispatch(AstrologerActions.setAstrologerReviewData(null));
    }
  }, [dispatch]);

  const updateState = data => {
    setState(prevState => {
      const newData = { ...prevState, ...data }
      return newData
    })
  }


  const { seeMore, seeMore1 } = state
  console.log(seeMore1, 'muskan')
  return (
    <View style={{ flex: 1, backgroundColor: "#F4F4F4" }}>
      <MyStatusBar
        backgroundColor={colors.black_color2}
        barStyle="dark-content"
      />
      <MyLoader isVisible={isLoading} />
      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={
            <>
              {astroData && astroDetailInfo()}
              {/* {astroData?.astrologer && chatCallPriceInfo()} */}
              {/* {astroData?.astrologer?.nextOnline?.date && nextOnlineInfo()} */}
              {astroData && totalMin()}
              {astroData && aboutInfo()}

              {/* {astroData?.astrologer && skillsInfo()} */}
              {/* {astroData?.astrologer && mainExpertiesInfo()} */}
              {/* {astroData?.astrologer && remediesInfo()} */}
              {/* {reviewData && ratingInfo()} */}
              {reviewData && reviewInfo()}

            </>
          }
        />
        {chatCallButtonInfo()}

      </View>
    </View>
  );



  function reviewInfo() {
    return (
      <View style={{ paddingHorizontal: 10, marginTop: 10, }}>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: 10, }}>
          <Text style={{ ...Fonts.primaryHelvetica, color: "#000", fontSize: 13 }}>User Reviews</Text>
          {/* <Text style={{ ...Fonts.primaryHelvetica, color: "#7A7777", fontSize: 13 }}>View All</Text> */}
        </View>

        {
          reviewData?.reviews?.length > 0 ? (
            reviewData.reviews.map((item) => {
              return (
                <View style={{
                  padding: 10,
                  marginBottom: 10,
                  borderColor: "#bababa",
                  borderRadius: 3,
                  marginTop: 0,
                  backgroundColor: "#fff"
                }}>
                  <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 5 }}>
                    {item?.customer?.image ? (
                      <Image
                        source={{ uri: img_url + item?.customer?.image }}
                        resizeMode="cover"
                        style={{
                          width: responsiveScreenWidth(11),
                          height: responsiveScreenHeight(5),
                          resizeMode: "cover",
                          borderColor: "#000",
                          borderRadius: 100,
                        }}
                      />
                    ) : (
                      <View
                        style={{
                          width: responsiveScreenWidth(11),
                          height: responsiveScreenHeight(5),
                          backgroundColor: "#D9D9D9",
                          borderRadius: 100,
                        }}
                      ></View>
                    )}

                    <Text style={{ ...Fonts.primaryHelvetica, color: "#000000" }}>  {item?.customer?.customerName}</Text>
                    <StarRating
                      rating={astroData?.astrologer?.rating}
                      onChange={setRating}
                      starStyle={{ marginHorizontal: 0 }}
                      starSize={12}
                    />
                  </View>
                  <View>
                    <Text style={{ ...Fonts.primaryHelvetica, color: "#848484", fontSize: 10, marginTop: 5 }}>
                      Excellent advice given by rajansh ji, his accuracy is 100% and he explains everything in a very simple language
                    </Text>
                  </View>

                  <View style={{ backgroundColor: "#F4F4F4", padding: 4, borderRadius: 5, paddingHorizontal: 10 }}>
                    <Text style={{ ...Fonts.primaryHelvetica, color: "#000", fontSize: 10 }}>
                      {astroData?.astrologer?.astrologerName}
                    </Text>
                    <Text style={{ ...Fonts.primaryHelvetica, color: "#848484", fontSize: 9 }}>
                      Thanks 🙏
                    </Text>
                  </View>
                </View>
              );
            })
          ) : (
            <Text style={{ textAlign: 'center', color: '#848484', fontSize: 16 }}>
              No reviews found
            </Text>
          )
        }


      </View>
    )

    // const noreviewFound = () => {
    //   return (
    //     <View>
    //       <Text style={{ color: Colors.grayDarkA, textAlign: 'center' }}>No Review Found</Text>
    //     </View>
    //   )
    // }
    // const renderItem = ({ item }) => {
    //   return (


    //     <View
    //       style={{
    //         borderWidth: 1,
    //         borderRadius: 10,
    //         borderColor: Colors.gray,
    //         marginBottom: 10,
    //         padding: Sizes.fixPadding,
    //         marginHorizontal: Sizes.fixPadding
    //       }}>

    //       <View
    //         style={{
    //           flexDirection: 'row',
    //           justifyContent: 'space-between',
    //           alignItems: 'center',
    //         }}>
    //         <View style={{ flexDirection: 'row' }}>
    //           <View
    //             style={{
    //               width: SCREEN_WIDTH * 0.12,
    //               height: SCREEN_WIDTH * 0.12,
    //               borderRadius: 100,
    //               overflow: 'hidden',
    //             }}>
    //             <Image
    //               source={{ uri: img_url + item?.customer?.image }}
    //               resizeMode="cover"
    //               style={{ width: '100%', height: '100%' }}
    //             />
    //           </View>
    //           <View style={{ marginLeft: 10 }}>
    //             <Text style={{ ...Fonts.black14InterMedium }}>
    //               {item?.customer?.customerName}
    //             </Text>
    //             <Text style={{ ...Fonts.gray14RobotoRegular }}>
    //               {moment(item?.createdAt).format('DD MMM YYYY')}
    //             </Text>
    //           </View>
    //         </View>
    //         <View>
    //           <Stars
    //             default={parseFloat(item?.ratings)}
    //             disabled
    //             count={5}
    //             half={true}
    //             starSize={14}
    //             fullStar={
    //               <Ionicons
    //                 name={'star'}
    //                 size={14}
    //                 color={Colors.primaryLight}
    //               />
    //             }
    //             emptyStar={
    //               <Ionicons
    //                 name={'star-outline'}
    //                 size={14}
    //                 color={Colors.primaryLight}
    //               />
    //             }
    //             halfStar={
    //               <Ionicons
    //                 size={14}
    //                 name={'star-half'}
    //                 style={{ color: Colors.primaryLight }}
    //               />
    //             }
    //           />
    //         </View>
    //       </View>
    //       <View style={{ marginTop: 10 }}>

    //         {item?.comments === '' ? (<Text style={{ ...Fonts.gray12RobotoMedium }}>
    //           No Comments
    //         </Text>) : (<Text style={{ ...Fonts.black12RobotoRegular }}>
    //           {item?.comments}
    //         </Text>)}
    //       </View>
    //     </View>

    //   );
    // };
    // return (
    //   <View
    //     style={{
    //       // paddingHorizontal: Sizes.fixPadding * 1.5,
    //       // paddingTop: Sizes.fixPadding * 1.5,
    //       backgroundColor: Colors.white,
    //     }}>

    //     <View style={{ marginTop: Sizes.fixPadding * 1.5, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderColor: Colors.grayMedium, paddingBottom: Sizes.fixPadding }}>
    //       <Text style={{ ...Fonts.primaryDark18RobotoMedium }}>
    //         {t('customer_revie')}
    //       </Text>
    //     </View>
    //     <View style={{ marginTop: Sizes.fixPadding }}>
    //       <FlatList
    //         data={reviewData?.reviews}
    //         renderItem={renderItem}
    //         keyExtractor={item => item._id}
    //         showsVerticalScrollIndicator={false}
    //         ListEmptyComponent={noreviewFound()}
    //       />
    //     </View>
    //   </View>
    // );
  }


  function ratingInfo() {
    const getFillColor = (percentage) => {
      return percentage > 0 ? Colors.primaryLight : Colors.grayLight;
    };

    const getStarColor = (percentage) => {
      return percentage > 0 ? Colors.primaryLight : Colors.gray;
    };

    return (
      <View
        style={{
          // margin: Sizes.fixPadding * 1.5,
          backgroundColor: Colors.white,
        }}>
        <View style={{ padding: Sizes.fixPadding * 0.4, backgroundColor: Colors.grayLight, marginTop: Sizes.fixPadding * 1.5 }}>
        </View>
        <View style={{ marginTop: Sizes.fixPadding * 1.5, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderColor: Colors.grayMedium, paddingBottom: Sizes.fixPadding }}>
          <Text style={{ ...Fonts.primaryDark18RobotoMedium }}>
            {t('Rating_reviews')}<Text style={{ color: Colors.black }}>({reviewData?.summary?.totalReview})</Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: Sizes.fixPadding * 1.5,
          }}>
          <Stars
            default={reviewData?.summary?.averageRating ?? astroData?.astrologer?.rating}
            disabled
            count={5}
            half={true}
            starSize={20}
            fullStar={
              <Ionicons name={'star'} size={20} color={getStarColor(reviewData?.summary?.averageRating ?? 0)} />
            }
            emptyStar={
              <Ionicons
                name={'star-outline'}
                size={20}
                color={getStarColor(reviewData?.summary?.averageRating ?? 0)}
              />
            }
            halfStar={
              <Ionicons
                size={20}
                name={'star-half'}
                style={{ color: getStarColor(reviewData?.summary?.averageRating ?? 0) }}
              />
            }
          />
        </View>
        {['five', 'four', 'three', 'two', 'one'].map((rating, index) => {
          const ratingPercentage = reviewData?.summary[`${rating}Percentage`] ?? 0;
          const ratingCount = reviewData?.summary[`${rating}Rating`] ?? 0;
          const starCount = 5 - index;

          return (
            <View
              key={rating}
              style={{
                flexDirection: 'row',
                marginVertical: 5,
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: Sizes.fixPadding * 1.5,

              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ ...Fonts.black14InterMedium, marginRight: 5 }}>
                    {starCount}
                  </Text>
                  <Ionicons name={'star'} size={14} color={getStarColor(ratingPercentage)} />
                </View>
                <View
                  style={{
                    backgroundColor: Colors.grayLight,
                    width: SCREEN_WIDTH * 0.7,
                    height: SCREEN_WIDTH * 0.04,
                    borderRadius: 10,
                    overflow: 'hidden',
                    marginLeft: 10,
                  }}>
                  <View
                    style={{
                      backgroundColor: getFillColor(ratingPercentage),
                      width: `${ratingPercentage}%`,
                      height: '100%',
                    }}></View>
                </View>
              </View>
              <Text style={{ ...Fonts.gray14RobotoMedium, marginLeft: 10 }}>
                {ratingCount}
              </Text>
            </View>
          );
        })}
      </View>
    );
  }


  function mainExpertiesInfo() {
    return (
      <View style={{ backgroundColor: Colors.white, }}>
        <View style={{ padding: Sizes.fixPadding * 0.4, backgroundColor: Colors.grayLight, marginTop: Sizes.fixPadding * 1.5 }}>
        </View>
        <View style={{ marginTop: Sizes.fixPadding * 1.5, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderColor: Colors.grayMedium, paddingBottom: Sizes.fixPadding }}>
          <Text style={{ ...Fonts.primaryDark18RobotoMedium, }}>{t('main_expert')}</Text>
        </View>
        <Text
          textBreakStrategy='highQuality'
          style={{ ...Fonts.blackLight14RobotoRegular, marginTop: Sizes.fixPadding, paddingHorizontal: Sizes.fixPadding * 1.5, }}
        >{astroData?.astrologer?.mainExpertise && astroData?.astrologer?.mainExpertise.map(item => item?.mainExpertise).join(', ')}</Text>
      </View>
    )
  }

  // function remediesInfo() {

  //   return (
  //     <View style={{  backgroundColor: Colors.white, }}>
  //       <View style={{padding:Sizes.fixPadding * 0.4,backgroundColor:Colors.grayLight,marginTop:Sizes.fixPadding * 1.5}}>
  //       </View>
  //          <View style={{marginTop:Sizes.fixPadding * 1.5,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:Colors.grayMedium,}}>
  //       <Text style={{ ...Fonts.primaryDark18RobotoMedium, marginBottom: Sizes.fixPadding }}>Remedies</Text>
  //       </View>
  //       <View style={{flexDirection:'row',alignItems:'center',marginTop:Sizes.fixPadding,paddingHorizontal: Sizes.fixPadding * 1.5, }}>

  //       <Text
  //         textBreakStrategy='highQuality'
  //         style={{ ...Fonts.blackLight14RobotoRegular, }}
  //         >{astroData?.astrologer?.remedies && astroData?.astrologer?.remedies.map(item => item?.title).join(', ')}</Text>
  //        {/* {astroData?.astrologer?.remedies ? (<Text
  //         textBreakStrategy='highQuality'
  //         style={{ ...Fonts.blackLight14RobotoRegular, padding: Sizes.fixPadding * 1.5,}}
  //         >{astroData?.astrologer?.remedies?.description.length > 100 && !seeMore ? astroData?.astrologer?.remedies?.description.slice(0, 100) : astroData?.astrologer?.remedies?.description}<Text onPress={() => updateState({ seeMore: !seeMore })} style={{ color: Colors.primaryLight }}> {astroData?.astrologer?.remedies?.description.length > 350 ? seeMore ? 'See less...' : 'See more...' : ''}</Text></Text>) : <Text style={{ textAlign: 'center', color: Colors.grayA }}>No Description Found </Text>} */}
  //      <Text>- </Text>
  //        <Text
  //         textBreakStrategy='highQuality'
  //         style={{ ...Fonts.blackLight14RobotoRegular, }}
  //         >{astroData?.astrologer?.remedies && astroData?.astrologer?.remedies.map(item => item?.description).join(', ')}</Text>
  //         </View>
  //     </View>
  //   )
  // }

  function remediesInfo() {
    const renderItem = ({ item }) => {
      return (
        <View style={{ backgroundColor: '#F6F5F5', width: SCREEN_WIDTH / 2 - Sizes.fixPadding, marginHorizontal: Sizes.fixPadding, borderRadius: 10, marginTop: Sizes.fixPadding }}>
          <Text style={{ ...Fonts.primaryDark18RobotoMedium, marginTop: Sizes.fixPadding, textAlign: 'center' }}>{item?.title}</Text>
          <View style={{ paddingVertical: Sizes.fixPadding * 0.3, backgroundColor: Colors.white }}>

          </View>

          {item?.description ? (<Text
            textBreakStrategy='highQuality'
            style={{ ...Fonts.blackLight14RobotoRegular, padding: Sizes.fixPadding * 1.5, }}
          >{item?.description?.length > 10 && !seeMore ? item?.description.slice(0, 90) : item?.description}<Text onPress={() => updateState({ seeMore: !seeMore })} style={{ color: Colors.primaryLight }}> {item?.description.length > 10 ? seeMore ? 'Read less...' : 'Read more...' : ''}</Text></Text>) : <Text style={{ textAlign: 'center', color: Colors.grayA }}>No Description Found </Text>}
        </View>
      )
    }
    return (
      <View style={{ backgroundColor: Colors.white }}>
        <View style={{ padding: Sizes.fixPadding * 0.4, backgroundColor: Colors.grayLight, marginTop: Sizes.fixPadding * 1.5 }}>
        </View>
        <View style={{ marginTop: Sizes.fixPadding * 1.5, borderBottomWidth: 1, borderColor: Colors.grayMedium, }}>
          <Text style={{ ...Fonts.primaryDark18RobotoMedium, marginBottom: Sizes.fixPadding, textAlign: 'center' }}>{t('remedies')}</Text>
        </View>
        <FlatList
          data={astroData?.astrologer?.remedies}
          renderItem={renderItem}

          horizontal
        />
      </View>
    )
  }

  function skillsInfo() {
    return (
      <View style={{ padding: Sizes.fixPadding * 1.5, backgroundColor: Colors.white, }}>
        <Text style={{ ...Fonts.primaryDark18RobotoMedium, marginBottom: Sizes.fixPadding }}>Skills</Text>
        <Text
          textBreakStrategy='highQuality'
          style={{ ...Fonts.blackLight14RobotoRegular, }}
        >{astroData?.astrologer?.skill && astroData?.astrologer?.skill.map(item => item?.skill).join(', ')}</Text>
      </View>
    )
  }
  function totalMin() {
    console.log("astroData?.astrologer?.", astroData?.totalChatTime)
    return (
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
        <View style={styles.minView}>
          <Image source={require('../../assets/astrobookimages/chat_detail.png')} style={styles.callImage} />
          <Text style={{ ...Fonts.primaryHelvetica, color: "#000", fontSize: 14, }}>
            {Math.floor((astroData?.totalChatTime || 0) / 60)} mins</Text>
        </View>
        <View style={styles.minView}>
          <Image source={require('../../assets/astrobookimages/phone_detail.png')} style={styles.callImage} />
          <Text style={{ ...Fonts.primaryHelvetica, color: "#000", fontSize: 14, }}>
            {Math.floor((astroData?.totalCallTime || 0) / 60)} mins</Text>
        </View>
      </View>

    )
  }

  function aboutInfo() {

    return (
      <View
        style={{
          padding: 10,
          marginBottom: 10,
          marginHorizontal: 10,
          borderColor: "#bababa",
          borderRadius: 3,
          backgroundColor: "#fff",
        }}
      >
        <Text style={styles.description}>
          {isExpanded ? bio : `${truncatedBio}${words.length > 90 ? '' : ''}`}{' '}
          {words.length > 90 && (
            <Text
              style={{
                color: "blue",
                textDecorationLine: "underline",
                fontSize: responsiveFontSize(1.7),
              }}
              onPress={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Show Less' : 'Show More'}
            </Text>
          )}
        </Text>
      </View>

    )
  }

  function nextOnlineInfo() {
    return <View style={{ padding: Sizes.fixPadding * 1.5, backgroundColor: '#fff4e8', marginBottom: Sizes.fixPadding }}>
      <Text style={{ ...Fonts.black18RobotoMedium, marginBottom: Sizes.fixPadding * 0.5 }}>Next Online Time</Text>
      <View style={styles.servicesContainer}>
        <Text style={styles.servicesCol1}>{`${moment(astroData?.astrologer?.nextOnline?.data).format('DD MMMM YYYY')} ${moment(astroData?.astrologer?.nextOnline?.time).format('hh:mm A')}`}</Text>
      </View>
    </View>;
  }

  function chatCallPriceInfo() {
    const chatmultiply2 = (astroData?.astrologer?.chat_price + parseFloat(astroData?.astrologer?.commission_chat_price)) + (astroData?.astrologer?.chat_price + parseFloat(astroData?.astrologer?.commission_chat_price))
    const callmultiply2 = (astroData?.astrologer?.call_price + parseFloat(astroData?.astrologer?.commission_call_price)) + (astroData?.astrologer?.call_price + parseFloat(astroData?.astrologer?.commission_call_price))
    const videocall2 = (astroData?.astrologer?.normal_video_call_price + parseFloat(astroData?.astrologer?.commission_normal_video_call_price)) + (astroData?.astrologer?.normal_video_call_price + parseFloat(astroData?.astrologer?.commission_normal_video_call_price))

    const onChatNow = () => {

      if (astroData?.astrologer?.chat_status != 'online') {
        showToastMessage({ message: `Astrologer is ${astroData?.astrologer?.chat_status}` })
        return
      }
      const payload = {
        type: 'chat',
        astrologerName: astroData?.astrologer?.astrologerName,
        language: astroData?.astrologer?.language,
        astrologerId: astroData?.astrologer?._id,
        chatPrice:
          parseFloat(astroData?.astrologer?.chat_price) +
          parseFloat(astroData?.astrologer?.commission_chat_price),
        astrostatus: astroData?.astrologer?.chat_status
      };
      dispatch(ChatActions.onChatNow(payload));


    };
    const onCallNow = () => {

      if (astroData?.astrologer?.call_status != 'online') {
        showToastMessage({ message: ` Astrologer is ${astroData?.astrologer?.call_status}` })
        return
      }
      const payload = {
        type: 'call',
        astrologerName: astroData?.astrologer?.astrologerName,
        language: astroData?.astrologer?.language,
        astrologerId: astroData?.astrologer?._id,
        callPrice:
          parseFloat(astroData?.astrologer?.call_price) +
          parseFloat(astroData?.astrologer?.commission_call_price),
        astrostatus: astroData?.astrologer?.call_status
      };
      dispatch(ChatActions.onChatNow(payload));

    };

    const onVideoCallNow = () => {
      if (astroData?.astrologer?.video_call_status != 'online') {
        showToastMessage({ message: `Astrologer is ${astroData?.astrologer?.video_call_status}` })
        return
      }
      const payload = {
        type: 'video call',
        astrologerName: astroData?.astrologer?.astrologerName,
        language: astroData?.astrologer?.language,
        astrologerId: astroData?.astrologer?._id,
        callPrice:
          parseFloat(astroData?.astrologer?.normal_video_call_price) +
          parseFloat(astroData?.astrologer?.commission_normal_video_call_price),
        astrostatus: astroData?.astrologer?.video_call_status
      };
      dispatch(ChatActions.onChatNow(payload));
    }

    return <View style={{ backgroundColor: Colors.white, }}>
      <View style={{ padding: Sizes.fixPadding * 0.5, backgroundColor: Colors.grayLight }}>
      </View>
      <View style={{ marginVertical: Sizes.fixPadding * 1.5, borderBottomWidth: 1, borderColor: Colors.grayMedium }}>
        <Text style={{ ...Fonts.primaryDark18RobotoMedium, marginBottom: Sizes.fixPadding * 0.5, color: Colors.primaryLight, textAlign: 'center' }}>{t('consultent_charge')}</Text>
      </View>

      <View style={{ flexDirection: 'row', marginHorizontal: Sizes.fixPadding }}>
        <LinearGradient
          colors={['#F87956', '#FF452C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ width: '30%', paddingVertical: Sizes.fixPadding * 0.6, borderRadius: 10 }}
        >
          <TouchableOpacity
            onPress={() => onCallNow()}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

              <View style={{
                height: SCREEN_WIDTH * 0.08, width: SCREEN_WIDTH * 0.08, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white, marginLeft: Sizes.fixPadding * 0.6
              }}>
                <Ionicons
                  name={'call'}
                  size={17}
                  color={Colors.primaryLight}
                />
              </View>
              <View style={{ backgroundColor: colors.white_color, paddingHorizontal: Sizes.fixPadding * 1.5, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
                <Text style={{ ...Fonts.black14InterMedium, color: Colors.primaryLight }}>Call</Text>
              </View>

            </View>
            <View style={{ marginVertical: Sizes.fixPadding }}>
              <Text style={styles.servicesCol2}>{showNumber(astroData?.astrologer?.call_price + parseFloat(astroData?.astrologer?.commission_call_price))}/min</Text>
              <Text style={styles.servicesCol3}>{showNumber(callmultiply2)} /min</Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          colors={['#F87956', '#FF452C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ width: '30%', paddingVertical: Sizes.fixPadding * 0.6, borderRadius: 10, marginHorizontal: Sizes.fixPadding * 1.5 }}
        >
          <TouchableOpacity onPress={() => onChatNow()} >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

              <View style={{
                height: SCREEN_WIDTH * 0.08, width: SCREEN_WIDTH * 0.08, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white, marginLeft: Sizes.fixPadding * 0.6
              }}>
                <Ionicons
                  name={'chatbubbles-outline'}
                  size={17}
                  color={Colors.primaryLight}
                />
              </View>
              <View style={{ backgroundColor: colors.white_color, paddingHorizontal: Sizes.fixPadding * 1.2, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
                <Text style={{ ...Fonts.black14InterMedium, color: Colors.primaryLight }}>Chat</Text>
              </View>

            </View>
            <View style={{ marginVertical: Sizes.fixPadding }}>
              <Text style={styles.servicesCol2}>{showNumber(astroData?.astrologer?.chat_price + parseFloat(astroData?.astrologer?.commission_chat_price))}/min</Text>
              <Text style={styles.servicesCol3}>{showNumber(chatmultiply2)} /min</Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          colors={['#F87956', '#FF452C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ width: '30%', paddingVertical: Sizes.fixPadding * 0.6, borderRadius: 10 }}
        >
          <TouchableOpacity onPress={onVideoCallNow} >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>



              <View style={{
                height: SCREEN_WIDTH * 0.08, width: SCREEN_WIDTH * 0.08, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white, marginLeft: Sizes.fixPadding * 0.6
              }}>
                <Ionicons
                  name={'videocam'}
                  size={17}
                  color={Colors.primaryLight}
                />
              </View>
              <View style={{ backgroundColor: colors.white_color, paddingHorizontal: Sizes.fixPadding * 1, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
                <Text style={{ ...Fonts.black14InterMedium, color: Colors.primaryLight }}>Video</Text>
              </View>

            </View>
            <View style={{ marginVertical: Sizes.fixPadding }}>
              <Text style={styles.servicesCol2}>{showNumber(astroData?.astrologer?.normal_video_call_price + parseFloat(astroData?.astrologer?.commission_normal_video_call_price))}/min</Text>
              <Text style={styles.servicesCol3}>{showNumber(videocall2)} /min</Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </View>

    </View>;
  }

  function astroDetailInfo() {
    const onChatNow = () => {

      if (astroData?.astrologer?.chat_status != 'online') {
        showToastMessage({ message: `Astrologer is ${astroData?.astrologer?.chat_status}` })
        return
      }
      const payload = {
        type: 'chat',
        astrologerName: astroData?.astrologer?.astrologerName,
        language: astroData?.astrologer?.language,
        astrologerId: astroData?.astrologer?._id,
        chatPrice:
          parseFloat(astroData?.astrologer?.chat_price) +
          parseFloat(astroData?.astrologer?.commission_chat_price),
        astrostatus: astroData?.astrologer?.chat_status
      };
      dispatch(ChatActions.onChatNow(payload));


    };
    const onCallNow = () => {

      if (astroData?.astrologer?.call_status != 'online') {
        showToastMessage({ message: ` Astrologer is ${astroData?.astrologer?.call_status}` })
        return
      }
      const payload = {
        type: 'call',
        astrologerName: astroData?.astrologer?.astrologerName,
        language: astroData?.astrologer?.language,
        astrologerId: astroData?.astrologer?._id,
        callPrice:
          parseFloat(astroData?.astrologer?.call_price) +
          parseFloat(astroData?.astrologer?.commission_call_price),
        astrostatus: astroData?.astrologer?.call_status
      };
      dispatch(ChatActions.onChatNow(payload));

    };

    const onVideoCallNow = () => {
      if (astroData?.astrologer?.video_call_status != 'online') {
        showToastMessage({ message: `Astrologer is ${astroData?.astrologer?.video_call_status}` })
        return
      }
      const payload = {
        type: 'video call',
        astrologerName: astroData?.astrologer?.astrologerName,
        language: astroData?.astrologer?.language,
        astrologerId: astroData?.astrologer?._id,
        callPrice:
          parseFloat(astroData?.astrologer?.normal_video_call_price) +
          parseFloat(astroData?.astrologer?.commission_normal_video_call_price),
        astrostatus: astroData?.astrologer?.video_call_status
      };
      dispatch(ChatActions.onChatNow(payload));
    }
    const comingsoon = () => {
      showToastMessage({ message: 'Feature Coming Soon' })
    }


    function formatFollowerCount(count) {
      if (typeof count !== 'number' || isNaN(count)) {
        return '0'; // Default fallback if count is not valid
      }
      if (count >= 1000000) {
        return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'; // Millions format
      } else if (count >= 1000) {
        return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k'; // Thousands format
      } else {
        return count.toString(); // Less than 1000, no formatting
      }
    }

    const followerCount = formatFollowerCount(Number(astroData?.astrologer?.follower_count) || 0);


    return (
      //   <ImageBackground
      //   source={require('../../assets/images/astrologer_background.png')}
      //   style={{
      //     flex: 0,
      //     paddingHorizontal: 15,
      //     paddingVertical: 15,
      //   }}>

      //   <View
      //     style={{
      //       flex: 0,
      //       flexDirection: 'row',
      //       alignItems: 'center',
      //       justifyContent: 'space-around',
      //       position: 'relative',
      //       bottom: -20,
      //       zIndex: 1,
      //     }}>
      //   </View>
      //   <View
      //     style={{
      //       flex: 0,
      //       width: '80%',
      //       alignSelf: 'center',

      //       backgroundColor: 'rgba(0.741, 0.741, 0.741, 0.451)',
      //       // backgroundColor:'red',
      //       borderRadius: 20,
      //       paddingVertical: width * 0.12,
      //       marginTop: 10,
      //     }}>

      //     <Text style={{ ...Fonts.white16RobotoMedium, position: 'absolute', top: 10, left: 10 }}>{astroData?.astrologer?.astrologerName}</Text>

      //     <View style={{
      //       flexDirection: 'row',
      //       justifyContent: 'center',
      //     }}>
      //       <Image
      //         source={{ uri: base_url + astroData?.astrologer?.profileImage }}
      //         style={{
      //           width: width * 0.25,
      //           height: width * 0.25,
      //           borderWidth: 2,
      //           borderRadius: (width * 0.25) / 2,
      //           borderColor: colors.background_theme2,
      //           position: 'relative',
      //           left: (-width * 0.25) / 2,
      //           marginLeft: 10,
      //           shadowColor: '#000',
      //           shadowOffset: {
      //             width: 0,
      //             height: 4,
      //           },
      //           shadowOpacity: 0.3,
      //           shadowRadius: 4.65,
      //         }}
      //       />
      //       <View
      //         style={{
      //           flex: 1,
      //           position: 'relative',
      //           justifyContent: 'center',
      //           left: (-width * 0.25) / 2.5,
      //         }}>

      //         <View style={{ flex: 0, flexDirection: 'row', marginBottom: 2 }}>
      //           <Ionicons
      //             name="people-circle-sharp"
      //             color={colors.white_color}
      //             size={15}
      //           />
      //           {/* <Text
      //             allowFontScaling={false}
      //             style={{
      //               width: '100%',
      //               marginLeft: 5,
      //               fontSize: getFontSize(1.4),
      //               color: colors.white_color,
      //               fontFamily: fonts.medium,
      //             }}>
      //             {astroData?.astrologer?.expertise && astroData?.astrologer?.expertise.map(item => item.expertise).join(', ')}
      //           </Text> */}
      //           <Text
      //             allowFontScaling={false}
      //             style={{
      //               // width: '150%',
      //               flex: 1,
      //               // marginLeft: 5,
      //               fontSize: getFontSize(1.4),
      //               color: colors.white_color,
      //               fontFamily: fonts.medium,
      //               // borderWidth:2,
      //               alignItems: 'center',
      //               // right: 5
      //             }}>{astroData?.astrologer?.skill && astroData?.astrologer?.skill.map(item => item?.skill).join(',')}</Text>
      //         </View>

      //         <View style={{ flex: 0, flexDirection: 'row', marginBottom: 2 }}>
      //           <MaterialCommunityIcons
      //             name="google-translate"
      //             color={colors.white_color}
      //             size={15}
      //           />
      //           <Text
      //             allowFontScaling={false}
      //             style={{
      //               width: '100%',
      //               marginLeft: 5,
      //               fontSize: getFontSize(1.4),
      //               color: colors.white_color,
      //               fontFamily: fonts.medium,
      //             }}>
      //             {[...astroData?.astrologer?.language].join(',')}
      //           </Text>
      //         </View>

      //         <View style={{ flex: 0, flexDirection: 'row', marginBottom: 2 }}>
      //           <MaterialIcons
      //             name="explicit"
      //             color={colors.white_color}
      //             size={15}
      //           />
      //           <Text
      //             allowFontScaling={false}
      //             style={{
      //               width: '100%',
      //               marginLeft: 5,
      //               fontSize: getFontSize(1.3),
      //               color: colors.white_color,
      //               fontFamily: fonts.medium,
      //             }}>
      //             {`${t('experience')}: ${astroData?.astrologer?.experience}-Years`}
      //           </Text>
      //         </View>
      //       </View>
      //     </View>
      //   </View>
      //   <View
      //     style={{
      //       flex: 0,
      //       flexDirection: 'row',
      //       alignItems: 'center',
      //       justifyContent: 'space-around',
      //       position: 'relative',
      //       bottom: 12,
      //     }}>
      //     <TouchableOpacity
      //       onPress={() => dispatch(AstrologerActions.onFollowUnfollowAstrologer(route?.params?._id))}
      //       style={{
      //         flex: 0,
      //         width: '30%',
      //         paddingVertical: 2,
      //         backgroundColor: colors.background_theme2,
      //         borderRadius: 20,
      //       }}>
      //       <Text
      //         allowFontScaling={false}
      //         style={{
      //           fontSize: getFontSize(1.3),
      //           color: colors.black_color,
      //           fontFamily: fonts.medium,
      //           textAlign: 'center',
      //         }}>
      //         {isFollow
      //           ? `${t('following')}`
      //           : `${t('follow')}`}
      //         {/* {astroData?.astrologer?.follower_count} */}
      //       </Text>
      //     </TouchableOpacity>
      //     {/* {astroData?.astrologer?.offer_category &&
      //       astroData?.astrologer.offer_category.split(',').includes('2') && (
      //         <TouchableOpacity
      //           style={{
      //             flex: 0,
      //             width: '30%',
      //             paddingVertical: 2,
      //             backgroundColor: colors.background_theme2,
      //             borderRadius: 20,
      //           }}>
      //           <Text
      //             allowFontScaling={false}
      //             style={{
      //               fontSize: getFontSize(1.3),
      //               color: colors.black_color,
      //               fontFamily: fonts.medium,
      //               textAlign: 'center',
      //             }}>
      //             {t('special_offer')}
      //           </Text>
      //         </TouchableOpacity>
      //       )} */}
      //   </View>
      // </ImageBackground>
      <View style={{
        padding: 10,
        marginBottom: 10,
        marginHorizontal: 10,
        borderColor: "#bababa",
        borderRadius: 3,
        display: "flex",
        flexDirection: "row",
        gap: 7,
        marginTop: 20,
        backgroundColor: "#fff",

      }}>

        <View style={{ position: "absolute", right: 5, top: 5 }}>
          <StarRating
            rating={astroData?.astrologer?.rating}
            onChange={setRating}
            starStyle={{ marginHorizontal: 1 }}
            starSize={12}
          />
          <Text style={{ ...Fonts.primaryHelvetica, color: "#000", fontSize: 10, textAlign: "center" }}>{followerCount} followers</Text>
          <Text style={{ ...Fonts.primaryHelvetica, color: "#828282", fontSize: 8, textAlign: "center", lineHeight: 8 }}>{astroData?.totalOrders} orders</Text>
        </View>
        <View >
          <Image
            source={{ uri: base_url + astroData?.astrologer?.profileImage }}
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
            {astroData?.astrologer?.astrologerName}

          </Text>
          <Text style={{ ...Fonts.primaryHelvetica, color: "#828282", fontSize: 10, lineHeight: 15 }}>{`${t('experience')}: ${astroData?.astrologer?.experience}-Years`}</Text>
          <Text style={{ ...Fonts.primaryHelvetica, color: "#828282", fontSize: 10, lineHeight: 15 }}>{[...astroData?.astrologer?.language].join(',')}</Text>
          <Text style={{ ...Fonts.primaryHelvetica, color: "#828282", fontSize: 10, lineHeight: 15, width: responsiveScreenWidth(60) }}>{astroData?.astrologer?.skill && astroData?.astrologer?.skill.map(item => item?.skill).join(',')}</Text>
          <TouchableOpacity
            onPress={() => dispatch(AstrologerActions.onFollowUnfollowAstrologer(route?.params?._id))}
          >
            <Text
              allowFontScaling={false}
              style={{
                fontSize: getFontSize(1),
                color: colors.astrobook1,
                fontFamily: fonts.medium,
              }}>
              {isFollow
                ? `${t('following')}`
                : `${t('follow')}`}
              {/* {astroData?.astrologer?.follower_count}  */}
            </Text>
          </TouchableOpacity>
          <View style={{ marginTop: 10, display: "flex", flexDirection: "row", gap: 5, }}>

            <TouchableOpacity style={{
              borderWidth: 0.5,
              borderColor: astroData?.astrologer?.chat_status === 'offline'
                ? 'red'
                : astroData?.astrologer?.chat_status === 'busy'
                  ? '#F6FF00'
                  : astroData?.astrologer?.chat_status === 'online'
                    ? '#27AE60'
                    : '#FFFFFF',

              paddingVertical: 5,
              borderRadius: 10,
              paddingHorizontal: 12,
            }}
              // onPress={() => onChatNow()}
              onPress={() => {
                if (astroData?.astrologer?.chat_status === 'offline') {

                  showToastMessage({ message: "Astrologer is offline" });
                } else if (astroData?.astrologer?.chat_status === 'busy') {

                  showToastMessage({ message: "Astrologer is busy" });
                } else {

                  onChatNow()

                }
              }}
            >
              <Text style={{
                ...Fonts.primaryHelvetica,

                color: astroData?.astrologer?.chat_status === 'offline'
                  ? 'red'
                  : astroData?.astrologer?.chat_status === 'busy'
                    ? 'gray'
                    : astroData?.astrologer?.chat_status === 'online'
                      ? '#27AE60'
                      : '#FFFFFF',


                fontSize: 10, lineHeight: 14, textAlign: "center"
              }}>Chat</Text>
              <Text style={{
                ...Fonts.primaryHelvetica,
                color: astroData?.astrologer?.chat_status === 'offline'
                  ? 'red'
                  : astroData?.astrologer?.chat_status === 'busy'
                    ? 'gray'
                    : astroData?.astrologer?.chat_status === 'online'
                      ? '#27AE60'
                      : '#FFFFFF',

                fontSize: 8, lineHeight: 10, textAlign: 'center'
              }}>₹{Number(astroData?.astrologer?.chat_price) + Number(astroData?.astrologer?.commission_chat_price)}/min</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{
              borderWidth: 0.5,
              borderColor: astroData?.astrologer?.call_status === 'offline'
                ? 'red'
                : astroData?.astrologer?.call_status === 'busy'
                  ? '#F6FF00'
                  : astroData?.astrologer?.call_status === 'online'
                    ? '#27AE60'
                    : '#FFFFFF',
              paddingVertical: 5,
              borderRadius: 10,
              paddingHorizontal: 12,
            }}
              // onPress={() => onCallNow()}
              onPress={() => {
                if (astroData?.astrologer?.call_status === 'offline') {

                  showToastMessage({ message: "Astrologer is offline" });
                } else if (astroData?.astrologer?.call_status === 'busy') {

                  showToastMessage({ message: "Astrologer is busy" });
                } else {

                  onCallNow()

                }
              }}
            >
              <Text style={{
                ...Fonts.primaryHelvetica,

                color: astroData?.astrologer?.call_status === 'offline'
                  ? 'red'
                  : astroData?.astrologer?.call_status === 'busy'
                    ? 'gray'
                    : astroData?.astrologer?.call_status === 'online'
                      ? '#27AE60'
                      : '#FFFFFF',


                fontSize: 10, lineHeight: 14, textAlign: "center"
              }}>Call</Text>
              <Text style={{
                ...Fonts.primaryHelvetica,


                color: astroData?.astrologer?.call_status === 'offline'
                  ? 'red'
                  : astroData?.astrologer?.call_status === 'busy'
                    ? 'gray'
                    : astroData?.astrologer?.call_status === 'online'
                      ? '#27AE60'
                      : '#FFFFFF',


                fontSize: 8, lineHeight: 10, textAlign: 'center'
              }}>₹{Number(astroData?.astrologer?.call_price) + Number(astroData?.astrologer?.commission_call_price)}/min</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{
              borderWidth: 0.5,
              borderColor: astroData?.astrologer?.video_call_status === 'offline'
                ? 'red'
                : astroData?.astrologer?.video_call_status === 'busy'
                  ? '#F6FF00'
                  : astroData?.astrologer?.video_call_status === 'online'
                    ? '#27AE60'
                    : '#FFFFFF',
              paddingVertical: 5,
              borderRadius: 10,
              paddingHorizontal: 10,
            }}
              // onPress={() => onVideoCallNow()}
              onPress={() => {
                if (astroData?.astrologer?.video_call_status === 'offline') {

                  showToastMessage({ message: "Astrologer is offline" });
                } else if (astroData?.astrologer?.video_call_status === 'busy') {

                  showToastMessage({ message: "Astrologer is busy" });
                } else {

                  onVideoCallNow()

                }
              }}
            >
              <Text style={{
                ...Fonts.primaryHelvetica,
                color: astroData?.astrologer?.video_call_status === 'offline'
                  ? 'red'
                  : astroData?.astrologer?.video_call_status === 'busy'
                    ? 'gray'
                    : astroData?.astrologer?.video_call_status === 'online'
                      ? '#27AE60'
                      : '#FFFFFF',
                fontSize: 10, lineHeight: 14, textAlign: "center"
              }}>Video Call</Text>
              <Text style={{
                ...Fonts.primaryHelvetica,

                color: astroData?.astrologer?.video_call_status === 'offline'
                  ? 'red'
                  : astroData?.astrologer?.video_call_status === 'busy'
                    ? 'gray'
                    : astroData?.astrologer?.video_call_status === 'online'
                      ? '#27AE60'
                      : '#FFFFFF',


                fontSize: 8, lineHeight: 10, textAlign: 'center'
              }}>₹{Number(astroData?.astrologer?.commission_normal_video_call_price) + Number(astroData?.astrologer?.commission_normal_video_call_price)}/min</Text>
            </TouchableOpacity>


          </View>
        </View>
      </View >


    );
  }

  function chatCallButtonInfo() {
    const onChatNow = () => {
      if (customerData?.wallet_balance < astroData?.astrologer?.chat_price * 5) {
        refRBSheet.current.open()
      } else {
        if (astroData?.astrologer?.chat_status != 'online') {
          showToastMessage({ message: `Astrologer is ${astroData?.astrologer?.chat_status}` })
          return
        }
        const payload = {
          type: 'chat',
          astrologerName: astroData?.astrologer?.astrologerName,
          language: astroData?.astrologer?.language,
          astrologerId: astroData?.astrologer?._id,
          chatPrice:
            parseFloat(astroData?.astrologer?.chat_price) +
            parseFloat(astroData?.astrologer?.commission_chat_price),
          astrostatus: astroData?.astrologer?.chat_status
        };
        dispatch(ChatActions.onChatNow(payload));
      }




    };

    const onCallNow = () => {
      if (customerData?.wallet_balance < astroData?.astrologer?.call_price * 5) {
        refRBSheet.current.open()
      } else {
        if (astroData?.astrologer?.call_status != 'online') {
          showToastMessage({ message: ` Astrologer is ${astroData?.astrologer?.call_status}` })
          return
        }
        const payload = {
          type: 'call',
          astrologerName: astroData?.astrologer?.astrologerName,
          language: astroData?.astrologer?.language,
          astrologerId: astroData?.astrologer?._id,
          callPrice:
            parseFloat(astroData?.astrologer?.call_price) +
            parseFloat(astroData?.astrologer?.commission_call_price),
          astrostatus: astroData?.astrologer?.call_status
        };
        dispatch(ChatActions.onChatNow(payload));
      }


    };

    const onVideoCallNow = () => {
      console.log(astroData?.astrologer?.video_call_price, "astroData?.astrologer?.call_price")
      if (customerData?.wallet_balance < astroData?.astrologer?.video_call_price * 5) {
        refRBSheet.current.open()
      } else {
        if (astroData?.astrologer?.video_call_status != 'online') {
          showToastMessage({ message: `Astrologer is ${astroData?.astrologer?.video_call_status}` })
          return
        }
        const payload = {
          type: 'video call',
          astrologerName: astroData?.astrologer?.astrologerName,
          language: astroData?.astrologer?.language,
          astrologerId: astroData?.astrologer?._id,
          callPrice:
            parseFloat(astroData?.astrologer?.normal_video_call_price) +
            parseFloat(astroData?.astrologer?.commission_normal_video_call_price),
          astrostatus: astroData?.astrologer?.video_call_status
        };
        dispatch(ChatActions.onChatNow(payload));
      }

    }
    const comingsoon = () => {
      showToastMessage({ message: 'Feature Coming Soon' })
    }


    return (
      <View
        style={{
          backgroundColor: "#fff"
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10, gap: 10, }}>


          {/* Call Now Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onCallNow()}
            style={styles.callBtn}
          >
            <Image source={require('../../assets/astrobookimages/phone_detail.png')} style={styles.callImage} />
            <Text style={styles.callText}>
              Call
            </Text>
          </TouchableOpacity>

          {/* Chat Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onChatNow()}
            style={styles.callBtn}
          >
            <Image source={require('../../assets/astrobookimages/chat_detail.png')} style={styles.callImage} />

            <Text style={styles.callText}>
              Chat
            </Text>
          </TouchableOpacity>

          {/* Video Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onVideoCallNow}
            style={styles.callBtn}
          >
            <Image source={require('../../assets/astrobookimages/video_detail.png')} style={styles.callImage} />
            <Text style={styles.callText}>
              Video
            </Text>
          </TouchableOpacity>
        </View>


        <RBSheet
          ref={refRBSheet}
          height={300}
          useNativeDriver={false}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            container: {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
            draggableIcon: {
              backgroundColor: '#000',

            },
          }}
          customModalProps={{
            animationType: 'slide',
            statusBarTranslucent: true,
          }}
          customAvoidingViewProps={{
            enabled: false,
          }}>
          <View style={{
            flex: 1,
            padding: 20,
            paddingHorizontal: 10,
            backgroundColor: "#fff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <Text
                style={{ color: "#F12106", ...Fonts.primaryHelvetica, fontSize: 14, lineHeight: 22 }}
              >Minimum balance of 5 minutes ₹100 is required to start call with {astroData?.astrologer?.astrologerName}
              </Text>
              <TouchableOpacity onPress={() => {
                refRBSheet.current.close()
              }}>
                <Image source={require('../../assets/astrobookimages/cross.png')} style={{ height: 30, width: 30, objectFit: "contain" }} />
              </TouchableOpacity>
            </View>
            <Text style={{ color: "#000", ...Fonts.primaryHelvetica, marginTop: 10, fontSize: 14, }}>Recharge Now</Text>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 20, }}>
              <Image source={require('../../assets/astrobookimages/light.png')}
                style={{ height: 22, width: 22, objectFit: "contain", gap: 2 }} />
              <Text style={{ color: "#000", ...Fonts.primaryHelvetica, fontSize: 12, }}>Tip : 90% users recharge for 10 mins or more.</Text>
            </View>
            <View
              style={{
                width: '100%',
                alignSelf: 'center',
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginBottom: 20,
              }}>
              {console.log('Recharge Offer List:', rechargeOfferList)}
              {rechargeOfferList &&
                rechargeOfferList.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => handleSelectOffer(item)}
                    key={index}
                    style={{
                      flex: 0,
                      width: '33%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: Sizes.fixPadding,
                      backgroundColor: colors.background_theme1,
                      borderWidth: 0.5,
                      borderColor: selectedOffer?._id === item?._id ? "#01AA48" : "#E6E6E6",
                      marginRight: 10,
                      paddingTop: 20,
                    }}>
                    <Text allowFontScaling={false}
                      style={{ ...Fonts.primaryHelvetica, color: "#000000", fontSize: 17, marginBottom: 10, }}>
                      ₹{item?.amount}
                    </Text>
                    <Text style={{
                      backgroundColor: '#92FFC08A', width: "100%"
                      , ...Fonts.primaryHelvetica, color: "#01AA48", fontSize: 12, textAlign: 'center'
                    }}>{`Extra ${item?.percentage}%`}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity style={styles.proceedBtn} onPress={handleProceed}>
              <Text style={styles.proceedText}>Proceed To Pay</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>

      </View>




    );
  }
};

const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  wallet: state.customer.wallet,
  astroData: state.astrologer.astroData,
  reviewData: state.astrologer.reviewData,
  isFollow: state.astrologer.isFollow,
  customerData: state.customer.customerData,
  rechargeOfferList: state.customer.rechargeOfferList,


});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AstrologerDetailes);

const styles = StyleSheet.create({
  servicesContainer: {
    flexDirection: 'column',
    marginBottom: Sizes.fixPadding * 0.5
  },
  servicesCol1: {
    ...Fonts.black14InterMedium,
    flex: 0.6
  },
  servicesCol2: {

    fontWeight: 'bold',
    fontSize: 14,
    flex: 0.4,
    color: colors.white_color,
    textAlign: 'center'

  },
  servicesCol3: {
    color: colors.white_color,
    fontSize: 12,
    flex: 0.4,
    textDecorationLine: 'line-through',
    textAlign: 'center'
  },
  callImage: {
    width: 20,
    height: 16,
    objectFit: "contain"
  },
  callText: {
    ...Fonts.primaryHelvetica,
    color: "#000",
    fontWeight: "700"
  },
  callBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    borderWidth: 0.8,
    borderColor: "#838080",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 100,
  },
  description: {
    ...Fonts.primaryHelvetica,
    color: "#808080",
    fontWeight: "300",
    fontSize: responsiveFontSize(1.9),
    lineHeight: 16,
    letterSpacing: 1,
  },
  minView: {
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    borderColor: "#bababa",
    borderRadius: 3,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 26,
    borderRadius: 30,
  },
  proceedBtn: {
    backgroundColor: "#F1B646",
    paddingVertical: 15,
    borderRadius: 5,
  },
  proceedText: {
    color: "#fff",
    ...Fonts.primaryHelvetica,
    textAlign: 'center',
    fontWeight: "700"
  }
})  
