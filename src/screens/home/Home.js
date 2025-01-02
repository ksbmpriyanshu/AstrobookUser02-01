import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  StyleSheet,
  Animated,
  ImageBackground,
  RefreshControl,
  Linking,
  PermissionsAndroid,
  Platform,
  Alert,
  FlatList,
  PixelRatio,
  BackHandler,
  AppState,
  Modal,
  TouchableWithoutFeedback,
  SafeAreaView,
  TextInput,
} from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { useEffect, useRef } from 'react';
import {
  api_url,
  blog,
  colors,
  fonts,
  getFontSize,
  updateFlash,
} from '../../config/Constants1';
import Ionicons from 'react-native-vector-icons/Ionicons'; AntDesign
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as HomeActions from '../../redux/actions/HomeActions';
import * as EcommerceActions from '../../redux/actions/ecommerceActions';
import { base_url, get_astro_blogs, img_url } from '../../config/constants';
import HomeSimmer from './components/HomeSimmer';
import { Sizes, Fonts, Colors } from '../../assets/style';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeHeader from '../../components/HomeHeader';
import MyStatusBar from '../../components/MyStatusbar';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import * as BlogActions from '../../redux/actions/BlogActions';
import * as PoojaActions from '../../redux/actions/PoojaActions';
import * as AstrologerActions from '../../redux/actions/AstrologerActions';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth, useResponsiveScreenWidth } from 'react-native-responsive-dimensions';
import database from '@react-native-firebase/database'
import * as LiveActions from '../../redux/actions/LiveActions';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import moment from 'moment';
const { width, height } = Dimensions.get('screen');

const Home = ({
  props,
  navigation,
  dispatch,
  productCategoryData,
  isRefreshing,
  homeSimmer,
  bannerData,
  callAstrologer,
  chatAstrologer,
  astroBlogData,
  customerData,
  videoCallAstrologers,
  poojaData,
  videoCallAstrolgoer,
  newPoojaData,
  myblogdata,
  customereviewdata,
  myorderData
}) => {
  console.log("customereviewdata", customereviewdata)
  console.log("myorderData", myorderData)

  const [astoListData, setAstroListData] = useState(false);
  const [livelist, setLivelist] = useState(null);
  const [ModalView, setModalView] = useState(null);
  const [modalVisible, setModalVisible] = useState(true);
  const [search, setSearchInput] = useState('');
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [liveAstroListData, setLiveAstroListData] = useState(null);
  const { t } = useTranslation();
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



  useEffect(() => {
    dispatch(HomeActions.getBlogList())
    dispatch(HomeActions.getCustomerList())
    dispatch(HomeActions.getHomeData());
    dispatch(EcommerceActions.getProductCategory());
    dispatch(BlogActions.getAstroBlogs());
    dispatch(PoojaActions.getPoojaData())
    dispatch(PoojaActions.getNewPoojaData())
    dispatch(PoojaActions.getAllPoojaList())
    dispatch(HomeActions.getMyorder())



    // dispatch(AstrologerActions.getVideoCallAstrologers());
  }, [dispatch]);


  useEffect(() => {
    dispatch(HomeActions.getBlogList())
  }, [dispatch])



  console.log("myblogData::anuj", myblogdata)
  const update_flash = () => {
    axios({
      method: 'post',
      url: api_url + updateFlash,
      data: {
        user_id: customerData?._id,
      },
    })
      .then(res => { })
      .catch(err => {
        console.log(err);
      });
  };

  const openYouTubeVideo = youtubeLink => {
    // Assuming the youtubeLink is a valid YouTube video URL
    Linking.openURL(youtubeLink);
  };

  const astrologer_list = item => {
    navigation.navigate('astrologerList', { routename: item });
  };



  const searchFilterFunction = text => {
    if (text) {
      const newData = masterDataSource.filter(item => {
        const itemData = item.owner_name
          ? item.owner_name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.includes(textData); // Use includes for partial matching
      });

      setAstroListData(newData);
      setvastulist(newData);
      setOtherVastuList(newData);
      setSearchInput(text);
    } else {
      on_referesh();
      setAstroListData(astoListData);
      setvastulist(vastulist);
      setOtherVastuList(othervastulist);
      setSearchInput(text);
    }
  };

  const _listEmptyComponent = () => {
    return (
      <View
        style={{
          alignSelf: 'center',
          marginTop: 20,
          marginBottom: 20,
          alignSelf: 'center',
        }}>
        <Text
          allowFontScaling={false}
          style={{
            color: '#000',
            textAlign: 'center',
            marginHorizontal: width * 0.35,
          }}>
          {t('NoVideo')}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F6F6F6" }}>
      <MyStatusBar
        backgroundColor={colors.black_color2}
        barStyle="dark-content"
      />
      <View style={{ flex: 1, backgroundColor: colors.black_color1 }}>
        <HomeHeader navigation={navigation} />
        {/* <TouchableOpacity style={{ paddi        gHorizontal: 10, }}
        onPress={()=>{
          console.log("dshfdsoa")
        }}
        >
          <TextInput  placeholder='search astrologer..'
            style={{ borderWidth: 1, paddingLeft: 10, borderColor: "#dadada", borderRadius: 10, }}
          />
        </TouchableOpacity> */}
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => dispatch(HomeActions.getHomeDataOnRefresh())}
            />
          }
          ListHeaderComponent={
            <>
              {homeSimmer ? (
                <HomeSimmer />
              ) : (
                <>
                  {/* {sreaching()} */}
                  {Search()}
                  {kundliInfo()}
                  {bannerData && bannerInfo()}
                  {LiveAstrologer()}
                  {myOrder()}
                  {astrologerBook()}
                  {/* {livelist && liveListInfo()} */}
                  {/* {callAstrologer && callAstrologerListInfo()} */}
                  {/* {chatAstrologer && chatAstrologerList()} */}
                  {/* {videoCallAstrolgoer && videoCallAstrologerList()} */}
                  {/* {OtherExperts()} */}
                  {/* {blogsInfo()} */}
                  {/* {mallInfo()}*/}
                  {OurCustomers()}
                  {MyBlogs()}
                  {BottomPolicy()}
                  {/* {astropooja()} */}

                  {/* {footerInfo()} */}
                </>
              )}
            </>
          }
        />
        <View style={{ paddingVertical: 0 }}></View>
      </View>
      <View style={styles.bottomButtonsContainer}>
        <View style={{ flexDirection: "row", justifyContent: "center", gap: SCREEN_WIDTH * 0.04, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('astroForCall')}
            style={{ backgroundColor: colors.astrobook1, height: SCREEN_HEIGHT * 0.08, width: SCREEN_WIDTH * 0.16, alignItems: "center", justifyContent: "center", borderRadius: 100, elevation: 2 }}>

            <Image
              style={{ height: SCREEN_HEIGHT * 0.05, width: SCREEN_WIDTH * 0.10, resizeMode: "contain" }}
              source={require('../../assets/images/chatuser.png')} />

          </TouchableOpacity>


          <TouchableOpacity
            onPress={() => navigation.navigate('astroForCall')}
            style={{ backgroundColor: colors.astrobook1, height: SCREEN_HEIGHT * 0.08, width: SCREEN_WIDTH * 0.16, alignItems: "center", justifyContent: "center", borderRadius: 100, elevation: 2 }}>

            <Image
              style={{ height: SCREEN_HEIGHT * 0.05, width: SCREEN_WIDTH * 0.09, resizeMode: "contain" }}
              source={require('../../assets/images/CALLUSER.png')} />

          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('astroForCall')}
            style={{ backgroundColor: colors.astrobook1, height: SCREEN_HEIGHT * 0.08, width: SCREEN_WIDTH * 0.16, alignItems: "center", justifyContent: "center", borderRadius: 100, elevation: 2 }}>

            <Image
              style={{ height: SCREEN_HEIGHT * 0.04, width: SCREEN_WIDTH * 0.10, resizeMode: "contain" }}
              source={require('../../assets/images/VIDEOUSER.png')} />

          </TouchableOpacity>
        </View>
      </View>
      {astoListData && customerData?.flash_seen == 0 && (
        <Modal visible={modalVisible} transparent={true}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
            <View
              style={{
                flex: 1,
                backgroundColor: '#00000050',
                justifyContent: 'center',
                alignItems: 'center',
                // opacity: 0.4
              }}>
              <View
                style={{
                  flex: 0,
                  width: '90%',
                  alignSelf: 'center',
                  backgroundColor: colors.background_theme2,
                  borderRadius: 10,
                }}>
                <TouchableOpacity
                  style={{ padding: 10, left: width * 0.75 }}
                  onPress={() => {
                    update_flash();
                    setModalVisible(false);
                  }}>
                  <Ionicons name="close" color={colors.white_color} size={25} />
                </TouchableOpacity>
                <View
                  style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    borderRadius: 1000,
                    borderWidth: 10,
                    overflow: 'hidden',
                    top: -60,
                    backgroundColor: 'white',
                    padding: 10,
                    borderColor: colors.background_theme2,
                  }}>
                  <Image
                    source={require('../../assets/images/ganesha.png')}
                    style={{ width: 70, height: 70 }}
                  />
                </View>
                <View
                  style={{
                    flex: 0,
                    padding: 15,
                    backgroundColor: colors.background_theme1,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  }}>
                  {ModalView && (
                    <>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                        }}>
                        {ModalView.image.map((imageUrl, index) => (
                          <View key={index}>
                            <Image
                              source={{ uri: imageUrl }}
                              style={{
                                width: width * 0.2,
                                height: width * 0.2,
                                borderRadius: (width * 0.22) / 2,
                                borderWidth: 1,
                                borderColor: 'black',
                                alignSelf: 'center',
                                overflow: 'hidden',
                              }}
                            />
                          </View>
                        ))}
                      </View>
                      <View
                        style={{
                          alignItems: 'center',
                          marginTop: 20,
                          marginBottom: 20,
                        }}>
                        <Text
                          allowFontScaling={false}
                          style={{ color: 'black', fontSize: getFontSize(2.6) }}>
                          {ModalView.text}
                        </Text>
                      </View>
                    </>
                  )}

                  <TouchableOpacity
                    onPress={() => astrologer_list('astroChatList')}
                    style={{
                      alignSelf: 'center',
                      backgroundColor: colors.background_theme2,
                      borderRadius: 10,
                      padding: 10,
                    }}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        color: 'black',
                      }}>
                      {t('chat_now')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
  function LiveAstrologer() {


    if (!liveAstroListData || liveAstroListData.length === 0) {
      return null;
    }

    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          onPress={() => onPress(item)}
          style={{ height: SCREEN_HEIGHT * 0.25, width: SCREEN_WIDTH * 0.36, borderRadius: 10, alignItems: "center", elevation1: 10, marginHorizontal: SCREEN_WIDTH * 0.01, overflow: "hidden" }}>

          <ImageBackground
            style={{ height: SCREEN_HEIGHT * 0.25, width: SCREEN_WIDTH * 0.36, borderRadius: 10, elevation: 2 }}
            source={{ uri: base_url + item?.astrologerId?.profileImage }}>

            <View style={{ paddingVertical: SCREEN_HEIGHT * 0.01, paddingHorizontal: SCREEN_WIDTH * 0.015 }}>
              <FontAwesome name='video-camera' color={"white"} size={responsiveFontSize(2)} />
            </View>

            <View style={{ paddingTop: SCREEN_HEIGHT * 0.15, alignItems: "center" }}>
              <Text style={{ ...Fonts.black11InterMedium, color: "white", fontSize: responsiveFontSize(1.7) }}> {item?.astrologerId?.astrologerName}</Text>
            </View>

          </ImageBackground>

        </TouchableOpacity>
      );
    }

    return (
      <View style={{ backgroundColor: colors.white_color, elevation: 10, paddingBottom: SCREEN_HEIGHT * 0.02, paddingTop: SCREEN_HEIGHT * 0.01, marginTop: 10 }}>

        <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.02, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
          <View style={styles.orderSubView}>
            <Text style={styles.orderText}>Live Astrologer</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('astrolive')}
            >
              <Text style={styles.orderBtn}>View All</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.02 }}>

          <FlatList
            data={liveAstroListData}
            horizontal={true}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          />

        </View>

      </View>
    );
  }
  function astropooja() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate('PoojaDetails2', { ...item })}
          style={{ margin: 10, overflow: 'hidden', elevation: 2 }}>
          <Image
            source={{ uri: img_url + item?.image }}
            style={{
              width: 100,
              height: 100,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              borderWidth: 1,
              backgroundColor: "#bababa",
              borderColor: "#bababa",
              resizeMode: 'stretch',
            }}
          />
          <Text
            style={{
              color: colors.white_color,
              textAlign: 'center',
              marginTop: 5,
              paddingBottom: 5,

              backgroundColor: "#F45F4B",
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              // borderWidth: 1,
              top: -5,
              fontSize: 10,
              width: 100,
            }}>
            {item?.pujaName}
            {/* Vivah Badha Nivaran Puja */}
          </Text>
          {/* <View style={{ position: 'absolute', backgroundColor: Colors.white, padding: Sizes.fixPadding * 0.5, right: 0, paddingHorizontal: Sizes.fixPadding, borderBottomLeftRadius: 10, borderWidth: 1 }}>
            <Text style={{ ...Fonts.black16RobotoMedium }}>{item?.type}</Text>
          </View> */}
        </TouchableOpacity>
      )
    };
    return (
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 10,
            alignItems: 'center',
          }}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: getFontSize(1.4),
              color: colors.black_color,
              fontFamily: fonts.medium,
            }}
          >
            {/* {t('e-commerce')} */}
            {t('Astro_Pooja')}
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={
              () =>
                navigation.navigate('astromallCategory')
            }
            style={{
              paddingHorizontal: 10,
              paddingVertical: 3,
              elevation: 15,
              shadowColor: colors.background_theme2,
              borderRadius: 20,
              backgroundColor: colors.white_color,
            }}>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: getFontSize(1),
                color: colors.black_color,
                fontFamily: fonts.medium,
                paddingHorizontal: 5,
                paddingVertical: 2,
                fontWeight: "800"
              }}>
              {t('view_all')}
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={newPoojaData}
          renderItem={renderItem}
          // keyExtractor={item => item.id}
          horizontal={true} // Change to true for horizontal scroll
        />
      </ScrollView>
    )
  }
  function Search() {
    return (
      <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.022, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Search')}
          style={{ flexDirection: "row", alignItems: "center", gap: SCREEN_WIDTH * 0.02, paddingVertical: SCREEN_HEIGHT * 0.015, paddingHorizontal: SCREEN_WIDTH * 0.02, borderRadius: 5, backgroundColor: "white", elevation: 1 }}>
          <AntDesign name='search1' size={20}  color={colors.black_color7}/>
          <Text style={{ ...Fonts.black11InterMedium, color: colors.black_color7 }}>Search astrologers</Text>
        </TouchableOpacity>



      </View>

    )
  }

  function footerInfo() {
    return (
      <View style={styles.info}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.box2}
            onPress={() => navigation.navigate('DailyPanchang')}>
            <Image
              source={require('../../assets/images/icon/hinduism.png')}
              style={{
                width: 60,
                height: 60,
                alignSelf: 'center',
                resizeMode: 'contain',
              }}
            />
            <Text allowFontScaling={false} style={styles.boxtext}>
              {t('daily_panchang')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box2}
            onPress={() => navigation.navigate('auspicions')}>
            <Image
              source={require('../../assets/images/muhurat.png')}
              style={{
                width: 85,
                height: 85,
                alignSelf: 'center',
                resizeMode: 'contain',
              }}
            />
            <Text allowFontScaling={false} style={styles.boxtext}>
              {t('muhurat')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{}}
            onPress={() => navigation.navigate('birhatHoroscope')}>
            <Image
              source={require('../../assets/images/icon/astrology.png')}
              style={{
                width: 60,
                height: 60,
                alignSelf: 'center',
                resizeMode: 'contain',
              }}
            />
            <Text allowFontScaling={false} style={styles.boxtext}>
              {t('birhat')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.row, {}]}>
          <TouchableOpacity
            style={styles.box2}
            onPress={() => navigation.navigate('magazine')}>
            <Image
              source={require('../../assets/images/icon/book.png')}
              style={{
                width: 60,
                height: 60,
                alignSelf: 'center',
                resizeMode: 'contain',
              }}
            />
            <Text allowFontScaling={false} style={styles.boxtext}>
              {t('magazine')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box2}
            onPress={() => navigation.navigate('religion')}>
            <Image
              source={require('../../assets/images/icon/pray.png')}
              style={{
                width: 60,
                height: 60,
                alignSelf: 'center',
                resizeMode: 'contain',
              }}
            />
            <Text allowFontScaling={false} style={styles.boxtext}>
              {t('religion')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{}}
            onPress={() => navigation.navigate('remedies')}>
            <Image
              source={require('../../assets/images/icon/medicine.png')}
              style={{
                width: 60,
                height: 60,
                alignSelf: 'center',
                resizeMode: 'contain',
              }}
            />
            <Text allowFontScaling={false} style={styles.boxtext}>
              {t('remedies')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.row, {}]}>
          <TouchableOpacity
            style={styles.box2}
            onPress={() =>
              openYouTubeVideo('https://www.youtube.com/@AstroKunjofficial')
            }>
            <Image
              source={require('../../assets/images/icon/youtube_1.png')}
              style={{
                width: 60,
                height: 60,
                alignSelf: 'center',
                resizeMode: 'contain',
              }}
            />
            <Text allowFontScaling={false} style={styles.boxtext}>
              {t('youtube')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box2}
            onPress={() => navigation.navigate('yellowBook')}>
            <Image
              source={require('../../assets/images/book1.png')}
              style={{
                width: 80,
                height: 70,
                alignSelf: 'center',
                resizeMode: 'contain',
              }}
            />
            <Text allowFontScaling={false} style={styles.boxtext}>
              {t('yellow_book')}
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
  function myOrder() {

    const images = {
      samagri: require('../../assets/images/calendar.png'),

    };

    const DATA = [
      { id: '1', image: images.samagri, title: 'Samagri', },
      { id: '2', image: images.samagri, title: 'Flowers', },
      { id: '3', image: images.samagri, title: 'Heart', },
      { id: '4', image: images.samagri, title: 'Chocolates', },
      { id: '5', image: images.samagri, title: 'Clove', },
      { id: '6', image: images.samagri, title: 'Sweets', },
    ];

    const renderanujItem = ({ item }) => {
      return (
        <View style={{}}>
          <View style={styles.orderAstrologerView}>

            <View>

              <Image source={{ uri: base_url + item?.astrologerId?.profileImage }} style={styles.orderAstrologerImage} />
            </View>
            <View style={{ gap: 2 }}>
              <Text style={styles.orderAstrologerText}>{item?.astrologerId?.astrologerName}</Text>
              <Text style={styles.orderAstrologerDate}>
              {moment(item?.createdAt).format('DD-MM-YYYY')}
              </Text>
              <View style={styles.btnView}>
                {/* <TouchableOpacity
                  onPress={() => navigation.navigate('astrologerDetailes', {
                    _id: item?.astrologerId,
                    type: 'chat',
                  })
                  }
                  style={styles.orderBtnOne}>
                  <Text style={styles.orderTextOne}>View chat</Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                  onPress={() => navigation.navigate('astrologerDetailes', {
                    _id: item?.astrologerId,
                    type: 'chat',
                  })
                  }
                  style={styles.orderBtnTwo}>
                  <Text style={styles.orderTextTwo}>Chat Again</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </View>
      )
    }



    function NoDATA(){
      return(
        <View style={{}}>
        <View style={{paddingHorizontal:SCREEN_WIDTH*0.35,paddingVertical:SCREEN_HEIGHT*0.01}}>
          <Text style={{...Fonts.black11InterMedium}}>No Data Found</Text>
          
        </View>
        </View>
      )
    }



    return (

      <View style={[styles.orderView, { backgroundColor: "#fff", marginVertical: 15, }]}>
        <View style={styles.orderSubView}>
          <Text style={styles.orderText}>My Order</Text>
          {/* <Text style={styles.orderBtn}>View All</Text> */}
        </View>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={myorderData}
          renderItem={renderanujItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={NoDATA()}
        />
      </View>
    )
  }

  function astrologerBook() {
    const renderItems = ({ item, index }) => {
      console.log("item?.call_status", item?.call_status)
      return (
        <View >

          <TouchableOpacity activeOpacity={0.8} key={index} onPress={() => navigation.navigate('astrologerDetailes', {
            _id: item?._id,
            type: 'chat',
          })
          }
            style={{ position: "relative" }}
          >

            <View style={[styles.astroView]}>
              <Image source={require('../../assets/astrobookimages/celebrity.png')}
                style={{
                  width: responsiveScreenWidth(16),
                  height: responsiveScreenHeight(5),
                  position: "absolute",
                  left: 0,
                  top: 0
                }}
              />

              <Image source={{ uri: base_url + item?.profileImage }} style={styles.astroImage} />
              <Text style={styles.astrologerName}>
                {item?.astrologerName?.length > 10
                  ? `${item.astrologerName.slice(0, 10)}...`
                  : item?.astrologerName}
              </Text>
              <Text style={styles.astrologerMin}>₹ {Number(item?.call_price)+Number(item.commission_call_price)}/min</Text>
              <View style={styles.callView}>

                <TouchableOpacity activeOpacity={0.8} key={index} onPress={() => navigation.navigate('astrologerDetailes', {
                  _id: item?._id,
                  type: 'chat',
                })
                }
                >
                  <Image source={require('../../assets/astrobookimages/chat.png')} style={styles.astroCallIcon} />

                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} key={index} onPress={() => navigation.navigate('astrologerDetailes', {
                  _id: item?._id,
                  type: 'chat',
                })
                }
                >
                  <Image source={require('../../assets/astrobookimages/call.png')} style={styles.astroCallIcon} />

                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} key={index} onPress={() => navigation.navigate('astrologerDetailes', {
                  _id: item?._id,
                  type: 'chat',
                })
                }
                >
                  <Image source={require('../../assets/astrobookimages/video.png')} style={styles.astroCallIcon} />

                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    };
    return (
      <View style={{ backgroundColor: "#fff", marginBottom: 5, paddingVertical: 10, paddingHorizontal: 10 }} >
        <View style={[styles.orderSubView]}>
          <Text style={styles.orderText}>Astrologers</Text>
          <TouchableOpacity onPress={() => {
            navigation.navigate('astroForCall')
          }}>
            <Text style={styles.orderBtn}>View All</Text>
          </TouchableOpacity>

        </View>
        {chatAstrologer?.length === 0 ? (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: Colors.grayA }}>No Chat Astrologer Online</Text>
          </View>
        ) : (
          <FlatList data={chatAstrologer} horizontal renderItem={renderItems} showsHorizontalScrollIndicator={false} />
        )}
      </View>
    );

  }
  function liveListInfo() {
    const live = (live_ud, astroId, data) => {
      if (customerData.username != null) {
        navigation.navigate('goLive', {
          liveID: live_ud,
          astro_id: astroId,
          userID: customerData.id,
          userName: customerData.username,
          astroData: data,
        });
      } else {
        Alert.alert('Message', 'Please Update Customer Account.');
      }
    };

    const renderItems = ({ item, index }) => {
      return item.current_status1 === 'Live' ? (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => live(item.live_id, item.user_id, item)}
          key={index}
          style={{
            flex: 0,
            width: width * 0.355,
            borderRadius: 5,
            marginVertical: 10,
            shadowColor: colors.black_color5,
            shadowOffset: { width: 2, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            zIndex: 100,
            marginHorizontal: 20,
          }}>
          <View
            style={{
              borderRadius: 10,
              borderColor: '#ddd',
              backgroundColor: colors.background_theme2,
            }}>
            <View
              style={{
                height: 150,
                alignItems: 'center',
              }}>
              <Image
                source={{ uri: item.img_url }}
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
                    fontSize: getFontSize(1.2),
                    color: colors.black_color9,
                    fontFamily: fonts.semi_bold,
                    paddingRight: 10,
                    textAlign: 'center',
                  }}>
                  {item.owner_name}
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
      ) : null;
    };
    return (
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text
            allowFontScaling={false}
            style={{
              color: 'black',
              marginHorizontal: 10,
              fontSize: getFontSize(1.8),
            }}>
            {t('astrologer_live')}
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('astrolive', { data: 'home' })}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 3,
              elevation: 15,
              shadowColor: colors.background_theme2,
              borderRadius: 20,
              backgroundColor: colors.white_color,
            }}>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 12,
                color: colors.black_color,
                fontFamily: 'BalluBhai-Regular',
                fontWeight: '800',
                paddingHorizontal: 5,
                paddingVertical: 2,
              }}>
              {t('view_all')}
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={livelist}
          renderItem={renderItems}
          keyExtractor={item => item.id}
          numColumns={1}
          ListEmptyComponent={_listEmptyComponent}
          showsVerticalScrollIndicator={false}
          horizontal
          centerContent={true}
        />
      </View>
    );
  }


  function kundliInfo() {
    return (
      <View style={styles.kundaliView}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('selectSign')}>
          <View style={styles.kundaliIconView}>
            <Image source={require('../../assets/astrobookimages/daily.png')} style={styles.kundaliImage} />
            <Text style={styles.kundaliIconText}>Daily{'\n'} Horoscope</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('kundli')}>
          <View style={styles.kundaliIconView}>
            <Image source={require('../../assets/astrobookimages/freekundli.png')} style={styles.kundaliImage} />
            <Text style={styles.kundaliIconText}>Free {'\n'}Kundli</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('newMatching')}>
          <View style={styles.kundaliIconView}>
            <Image source={require('../../assets/astrobookimages/kundlimatching.png')} style={styles.kundaliImage} />
            <Text style={styles.kundaliIconText}>Kundli {'\n'}Matching</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={()=>navigation.navigate("poojacategory")}
        style={styles.kundaliIconView}>
          <Image source={require('../../assets/astrobookimages/remedy.png')} style={styles.kundaliImage} />
          <Text style={styles.kundaliIconText}>Remedies</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function bannerInfo() {
    return (
      <Image
        source={require('../../assets/astrobookimages/banner.png')}
        style={{ width: width * 0.95, height: SCREEN_HEIGHT * 0.17, borderRadius: 10, alignSelf: "center" }}
        resizeMode="cover"
      />
    )
    // const renderItem = ({ index, item }) => {

    //   const handlePress = () => {
    //     const url = item?.redirectionUrl;
    //     const urlPattern = new RegExp(
    //       '^(https?:\\/\\/)?' + // protocol
    //       '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' +
    //       '((\\d{1,3}\\.){3}\\d{1,3}))' +
    //       '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
    //       '(\\?[;&a-z\\d%_.~+=-]*)?' +
    //       '(\\#[-a-z\\d_]*)?$',
    //       'i',
    //     );
    //     if (url && urlPattern.test(url)) {
    //       Linking.openURL(url).catch(err => {
    //       });
    //     } else {
    //       Alert.alert('Invalid URL', 'The provided URL is not valid.');
    //     }
    //   };
    //   console.log("item", item)
    //   return (
    //     <TouchableOpacity
    //       activeOpacity={0.8}
    //       style={{
    //         flex: 1,
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //       }}
    //     onPress={handlePress}
    //     >
    //       <Image
    //         source={{ uri: img_url + item.bannerImage }}
    //         style={{ width: width * 0.95, height: SCREEN_HEIGHT*0.14, borderRadius: 10 }}
    //         resizeMode="cover"
    //       />
    //       <Image
    //         source={require('../../assets/astrobookimages/banner.png')}
    //         style={{ width: width * 0.95, height: SCREEN_HEIGHT * 0.17, borderRadius: 10 }}
    //         resizeMode="cover"
    //       />
    //     </TouchableOpacity>
    //   );
    // };
    // return (
    //   <Carousel
    //     loop
    //     width={width}
    //     height={SCREEN_HEIGHT * 0.17}
    //     autoPlay={true}
    //     data={bannerData}
    //     scrollAnimationDuration={1500}
    //     autoPlayInterval={5000}
    //     renderItem={renderItem}
    //   />
    // );
  }

  // function blogsInfo() {
  //   const renderItem = ({ item }) => {
  //     return (
  //       <TouchableOpacity
  //         onPress={() =>
  //           navigation.navigate('blogDetailes', {
  //             blogData: item,
  //           })
  //         }
  //         style={{ margin: 10, overflow: 'hidden', elevation: 5 }}>
  //         <Image
  //           source={{ uri: img_url + item?.image }}
  //           style={{
  //             width: 200,
  //             height: 100,
  //             borderTopRightRadius: 10,
  //             borderTopLeftRadius: 10,
  //             resizeMode: 'stretch',
  //           }}
  //         />
  //         <Text
  //           style={{
  //             textAlign: 'center',
  //             marginTop: 5,
  //             backgroundColor: colors.background_theme2,
  //             borderBottomLeftRadius: 10,
  //             borderBottomRightRadius: 10,
  //             top: -5,
  //             width: 200,
  //             height: 20,
  //             color: colors.white_color
  //           }}>
  //           {' '}
  //           {item.title}
  //         </Text>
  //       </TouchableOpacity>
  //     );
  //   };

  //   return (
  //     <ScrollView>
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           justifyContent: 'space-between',
  //           marginHorizontal: 10,
  //         }}>
  //         <Text
  //           allowFontScaling={false}
  //           style={{
  //             color: 'black',
  //             // marginHorizontal: 10,
  //             fontSize: getFontSize(1.8),
  //           }}>
  //           {t('blogs')}
  //         </Text>
  //         <TouchableOpacity
  //           activeOpacity={0.8}
  //           onPress={() => navigation.navigate('astroBlog')}
  //           style={{
  //             paddingHorizontal: 10,
  //             paddingVertical: 3,
  //             elevation: 15,
  //             shadowColor: colors.background_theme2,
  //             borderRadius: 20,
  //             backgroundColor: colors.white_color,
  //           }}>
  //           <Text
  //             allowFontScaling={false}
  //             style={{
  //               fontSize: 12,
  //               color: colors.black_color,
  //               fontFamily: 'BalluBhai-Regular',
  //               fontWeight: '800',
  //               paddingHorizontal: 5,
  //               paddingVertical: 2,
  //             }}>
  //             {t('view_all')}
  //           </Text>
  //         </TouchableOpacity>
  //       </View>
  //       <FlatList
  //         data={astroBlogData}
  //         renderItem={renderItem}
  //         keyExtractor={item => item.id}
  //         horizontal={true}
  //       />
  //     </ScrollView>
  //   );
  // }
  function OurCustomers() {

    // const images = {
    //   samagri: require('../../assets/images/myblog1.jpg'),
    //   flowers: require('../../assets/images/myblog2.jpg'),
    //   heart: require('../../assets/images/myblog1.jpg'),
    //   heart2: require('../../assets/images/myblog2.jpg'),


    // };

    // const DATA = [
    //   { id: '1', image: images.samagri, title: 'Decoding Astrobook’s fortune: How the astrology startup hit success by blending ancient', Date: '1-nov-24', Name: "Acharya Anuj " },
    //   { id: '2', image: images.flowers, title: 'Decoding Astrobook’s fortune: How the astrology startup hit success by blending ancient', Date: '1-nov-24', Name: "shiva," },
    //   { id: '3', image: images.heart, title: 'Decoding Astrobook’s fortune: How the astrology startup hit success by blending ancient', Date: '1-nov-24', Name: "acgarya" },
    //   { id: '4', image: images.heart2, title: 'Decoding Astrobook’s fortune: How the astrology startup hit success by blending ancient', Date: '1-nov-24', Name: "acharya" },

    // ];

    const renderItem = ({ item }) => {
      console.log("my item suptomer data", item)
      return (


        <View style={{ borderWidth: 1, width: SCREEN_WIDTH * 0.6, borderRadius: 10, alignItems: "center", borderColor: "#dadada", elevation1: 2, marginHorizontal: SCREEN_WIDTH * 0.01 }}>

          <View style={{ width: SCREEN_WIDTH * 0.6, height: SCREEN_HEIGHT * 0.12, alignItems: "center", justifyContent: "center" }}>
            <Image
              style={{ width: SCREEN_WIDTH * 0.6, height: SCREEN_HEIGHT * 0.12, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
              source={{ uri: img_url + item?.image }} />
          </View>

          <View style={{ paddingHorizontal: 2.5, paddingVertical: 5 }}>
            <Text style={{ ...Fonts.primaryDark11InterMedium, fontSize: 9, color: colors.black_color9, }}>{item?.customerName}</Text>
          </View>


        </View>

      )
    }
    return (
      <View style={{ backgroundColor: colors.white_color, elevation: 10, paddingBottom: SCREEN_HEIGHT * 0.02, paddingTop: SCREEN_HEIGHT * 0.01 }}>

        <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.02, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
          <View style={styles.orderSubView}>
            <Text style={styles.orderText}>Our Customers</Text>
            <TouchableOpacity
              activeOpacity={0.8}
            // onPress={() => navigation.navigate('AstrologyBlog')}

            >
              {/* <Text style={styles.orderBtn}>View All</Text> */}
            </TouchableOpacity>

          </View>
        </View>

        <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.02 }}>

          <FlatList
            horizontal={true}
            data={customereviewdata}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          />

        </View>



      </View>
    )
  }



  function MyBlogs() {


    const renderItem = ({ item }) => {
      return (

        <TouchableOpacity onPress={() => navigation.navigate('BlogDescription', { blogData: item })}>
          <View style={{ borderWidth: 1, width: SCREEN_WIDTH * 0.6, borderRadius: 10, alignItems: "center", borderColor: '#DFDFDF', elevation1: 2, marginHorizontal: SCREEN_WIDTH * 0.01 }}>

            <View style={{ width: SCREEN_WIDTH * 0.6, height: SCREEN_HEIGHT * 0.15, alignItems: "center", justifyContent: "center" }}>
              <Image
                style={{ width: SCREEN_WIDTH * 0.6, height: SCREEN_HEIGHT * 0.15, borderTopLeftRadius: 10, borderTopRightRadius: 10, objectFit: "cover" }}
                source={{ uri: img_url + item?.image }} />
            </View>

            <View style={{ paddingTop: SCREEN_HEIGHT * 0.002, width: SCREEN_WIDTH * 0.6, paddingHorizontal: SCREEN_WIDTH * 0.015, justifyContent: "center", paddingTop: SCREEN_HEIGHT * 0.01 }}>
              <Text style={{ ...Fonts.primaryDark11InterMedium, fontSize: 10, color: colors.black_color9, }}>{item?.title}</Text>
            </View>
            <View style={{ flexDirection: "row", width: SCREEN_WIDTH * 0.6, justifyContent: "space-between", alignItems: "center", paddingHorizontal: SCREEN_WIDTH * 0.015 }}>
              <Text style={{ ...Fonts.primaryHelvetica, fontSize: 10, color: colors.black_color6 }}>{item?.created_by}</Text>
              <Text style={{ ...Fonts.primaryHelvetica, fontSize: 10, color: colors.black_color6 }}>
                {new Date(item?.createdAt).toLocaleDateString()}
              </Text>
            </View>

          </View>
        </TouchableOpacity>
      )
    }
    return (
      <View style={{ backgroundColor: colors.white_color, elevation: 10, paddingBottom: SCREEN_HEIGHT * 0.02, paddingTop: SCREEN_HEIGHT * 0.01 }}>

        <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.02, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
          <View style={styles.orderSubView}>
            <Text style={styles.orderText}>Blog</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('AstrologyBlog')}

            >
              <Text style={styles.orderBtn}>View All</Text>
            </TouchableOpacity>

          </View>
        </View>

        <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.02 }}>

          <FlatList
            horizontal={true}
            data={myblogdata}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          />

        </View>



      </View>
    )
  }

  function mallInfo() {
    const renderItem = ({ item }) => (
      // <TouchableOpacity
      //   onPress={() => navigation.navigate('products', { ...item })}
      //   style={{ margin: 10, marginRight: 0, overflow: 'hidden', elevation: 2, }}>
      //   <Image
      //     source={{ uri: img_url + item?.image }}
      //     style={{
      //       width: 100,
      //       height: 100,
      //       borderTopRightRadius: 10,
      //       borderTopLeftRadius: 10,
      //       borderWidth: 1,
      //       backgroundColor: "#bababa",
      //       borderColor: "#bababa",
      //       resizeMode: 'stretch',
      //     }}
      //   />
      //   <Text>
      //     {item?.categoryName}
      //   </Text>
      // </TouchableOpacity>
      <View
        style={{
          paddingLeft: 10,
          marginTop: 10,
          width: responsiveScreenWidth(40),
          borderRadius: 10,
          marginRight: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('products', { ...item })}
        >
          <ImageBackground
            source={{ uri: img_url + item?.image }}
            style={styles.imageBackground}
            imageStyle={{ borderRadius: 10 }}
          >

            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: 10,
              }}
            />

            <Text style={{ color: 'white', zIndex: 1, padding: 10, textAlign: "center", ...Fonts.primaryHelvetica }}>
              {item?.categoryName}
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>

    );
   

    return (
      <View style={{ backgroundColor: "#fff", marginVertical: 5, paddingVertical: 10, paddingHorizontal: 10, marginTop: 10, }}>
        <View style={styles.orderSubView}>
          <Text style={styles.orderText}>AstroRemedy</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('productCategory', { data: 'home' })
            }>
            <Text style={styles.orderBtn}>View All</Text>
          </TouchableOpacity>

        </View>
        <FlatList
          data={productCategoryData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={NoDATA()}
        />
      </View>


    );
  }
  function BottomPolicy() {
    return (
      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly", paddingTop: 30 }}>
          <View style={{ alignItems: "center", gap: SCREEN_HEIGHT * 0.003, }}>

            <View style={{ height: SCREEN_HEIGHT * 0.12, width: SCREEN_WIDTH * 0.24, borderRadius: 100, alignItems: "center", justifyContent: "center", backgroundColor: "white", elevation: 2 }}  >

              <Image
                style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.2, resizeMode: 'contain' }}
                source={require('../../assets/astrobookimages/secure.png')} />

            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.6) }}>Private &</Text>
              <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.6) }}>Confidential</Text>

            </View>

          </View>
          <View style={{ alignItems: "center", gap: SCREEN_HEIGHT * 0.003, }}>

            <View style={{ height: SCREEN_HEIGHT * 0.12, width: SCREEN_WIDTH * 0.24, borderRadius: 100, alignItems: "center", justifyContent: "center", backgroundColor: "white", elevation: 2 }}  >

              <Image
                style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.2, resizeMode: 'contain' }}
                source={require('../../assets/astrobookimages/verified.png')} />

            </View>

            <View style={{ alignItems: "center" }}>
              <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.6) }}>Verified</Text>
              <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.6) }}>Astrologers</Text>
            </View>

          </View>
          <View style={{ alignItems: "center", gap: SCREEN_HEIGHT * 0.003, }}>

            <View style={{ height: SCREEN_HEIGHT * 0.12, width: SCREEN_WIDTH * 0.24, borderRadius: 100, alignItems: "center", justifyContent: "center", backgroundColor: "white", elevation: 2 }}  >

              <Image
                style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.2, resizeMode: 'contain' }}
                source={require('../../assets/astrobookimages/private.png')} />

            </View>

            <View style={{ alignItems: 'center' }}>

              <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.6) }}>Secure</Text>
              <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.6) }}>Payments</Text>

            </View>


          </View>

        </View>
        <View style={{ paddingVertical: SCREEN_HEIGHT * 0.06 }}>
        </View>
      </View>
    )
  }
};

const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  wallet: state.customer.wallet,
  notificationData: state.customer.notificationData,
  firebaseId: state.customer.firebaseId,
  bannerData: state.home.bannerData,
  callAstrologer: state.home.callAstrologer,
  customereviewdata: state.home.customereviewdata,

  chatAstrologer: state.home.chatAstrologer,
  // videoCallAstrologers: state.astrologer.videoCallAstrologers,
  homeSimmer: state.home.homeSimmer,
  isRefreshing: state.setting.isRefreshing,
  productCategoryData: state.ecommerce.productCategoryData,
  astroBlogData: state.blogs.astroBlogData,
  poojaData: state.pooja.poojaData,
  newPoojaData: state.pooja.newPoojaData,
  videocallInvoiceVisble: state.chat.videocallInvoiceVisble,
  videoCallAstrolgoer: state.home.videoCallAstrolgoer,
  myblogdata: state.home.myblogdata,
  liveAstroListData: state.astrologer.liveAstroListData,
  myorderData: state.home.myorderData,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  panchangContainer: {
    width: width * 0.18,
    height: width * 0.18,
    backgroundColor: '#48cae4',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 9,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: colors.black_color6,
  },

  punchangText: {
    fontSize: getFontSize(1),
    fontWeight: '400',
    fontFamily: fonts.medium,
    color: 'black',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  box: {
    backgroundColor: colors.white_color,
    borderWidth: 1,
    borderColor: 'orange',
    flex: 1,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  box2: {
    alignSelf: 'center',
  },
  boxtext: {
    textAlign: 'center',
    fontSize: getFontSize(1.5),
    fontWeight: 'bold',
    paddingTop: 5,
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    borderBottomWidth: 1, // Add a border to the bottom of each row
    borderColor: '#dee2e6',
    marginTop: 10,
    marginBottom: 10,
  },
  row1: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  info: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    margin: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  panchangImage: {
    width: width * 0.13,
    height: width * 0.13,
    resizeMode: 'contain',
    borderRadius: 1000,
  },
  kundaliImage: {
    objectFit: "contain",
    width: SCREEN_WIDTH * 0.22,
    height: SCREEN_WIDTH * 0.22,
  },
  kundaliView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  kundaliIconView: {
    display: "flex",
    flexDirection: "column",

  },
  kundaliIconText: {
    ...Fonts.primaryHelvetica,
    color: "#444444",
    fontSize: 12,
    textAlign: "center",
  },
  orderText: {
    ...Fonts.primaryHelvetica,
    color: "#000",
    fontSize: 15,
  },
  orderBtn: {
    ...Fonts.primaryHelvetica,
    fontSize: 12,
    color: "#8C8C8C"
  },
  orderSubView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  orderView: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    paddingBottom: 10,
  },
  orderAstrologerView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.2,
    borderColor: "#bababa",
    padding: 10,
    borderRadius: 4,
    marginTop: 10,
    gap: 20,

    marginHorizontal: SCREEN_WIDTH * 0.005
  },
  orderAstrologerImage: {
    objectFit: "contain",
    width: 90,
    height: 90,
    borderRadius: 100,
  },
  orderAstrologerText: {
    ...Fonts.primaryHelvetica,
    color: "#000",
    fontSize: 15,
    fontWeight: "800"
  },
  orderAstrologerDate: {
    ...Fonts.primaryHelvetica,
    color: "#7A7777",
    fontSize: 10,
    fontWeight: "400",
    marginTop: -2,
  },
  orderBtnOne: {
    borderWidth: 1,
    borderColor: '#F1B646',
    paddingHorizontal: 6,
    paddingVertical: 5,
    width: SCREEN_WIDTH * 0.25,
    borderRadius: 4,
  },
  orderTextOne: {
    color: "#381415",
    ...Fonts.primaryHelvetica,
    textAlign: "center", fontSize: 11,

  },
  orderBtnTwo: {
    borderWidth: 1,
    borderColor: '#F1B646',
    paddingHorizontal: 6,
    paddingVertical: 5,
    width: SCREEN_WIDTH * 0.25,
    backgroundColor: "#F1B646",
    borderRadius: 4,
  },
  orderTextTwo: {
    color: "#fff",
    ...Fonts.primaryHelvetica,
    textAlign: "center", fontSize: 11,

  },
  btnView: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  astroView: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: responsiveScreenWidth(40),
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
    marginRight: 10,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: '#DFDFDF'
  },
  astroImage: {
    objectFit: "contain",
    width: 90,
    height: 90,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#F1B646',
    alignSelf: "center",
  },
  astrologerName: {
    ...Fonts.primaryHelvetica,
    color: "#000",
    fontSize: 15,
    fontWeight: "600",
    textAlign: 'center'
  },
  astrologerMin: {
    color: '#7A7575',
    ...Fonts.primaryHelvetica,
    fontSize: 11,
    textAlign: 'center'
  },
  callView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },
  astroCallIcon: {
    objectFit: "contain",
    width: 30,
    height: 30,
  },
  imageBackground: {
    width: responsiveScreenWidth(45),
    height: 140,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  bottomButtonsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',

    zIndex: 10,

  },
});
