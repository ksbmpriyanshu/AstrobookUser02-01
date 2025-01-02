import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
} from 'react-native';
import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import {
  api2_logout,
  api_url,
  base_url,
  colors,
  fonts,
  getFontSize,
} from '../config/Constants1';
import { connect } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { CommonActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Share from 'react-native-share';
import { openFacebook, openInstagram, openLinkedIn } from '../components/Methods';
import { useEffect } from 'react';
const { width, height } = Dimensions.get('screen');
import { GoogleSignin } from '@react-native-google-signin/google-signin';
const Drawer = createDrawerNavigator();
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import { img_url } from '../config/constants';
import { unRegisterZegoCall } from '../utils/zegoServices';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen';
import { showNumber, showNumber0 } from '../utils/services';
import { Colors, Fonts } from '../assets/style';
import * as HomeActions from '../redux/actions/HomeActions';
import { info_toast } from '../components/MyToastMessage';


function CustomDrawerContent(props,) {
  console.log("props", props)
  const { t } = useTranslation();
  const navigation = useNavigation();
  const logout = () => {
    Alert.alert('Wait!', 'Do you want to log out?', [
      {
        text: 'CANCEL',
        style: 'cancel',
      },
      {
        style: 'destructive',
        text: 'LOGOUT',
        onPress: () => on_logout(),
      },
    ]);
  };
  const deleteaccount = () => {
    Alert.alert('Wait!', 'Do you want to Delete Account?', [
      {
        text: 'CANCEL',
        style: 'cancel',
      },
      {
        style: 'destructive',
        text: 'DELETE ACCOUNT',
        onPress: () => props.props.dispatch(HomeActions.getDeleteAccount()),
      },
    ]);
  };


  const openWhatsApp = () => {
    // Replace PHONE_NUMBER with the desired phone number (including the country code)
    const phoneNumber = '+91 8800247824';

    // Replace YOUR_MESSAGE with the optional message (URL-encoded if necessary)
    const message = 'Hello%2C%20I%20have%20a%20question';

    // Create the WhatsApp link
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

    // Open the link using the Linking module
    Linking.openURL(whatsappURL)
      .then(data => {
        console.log('WhatsApp opened successfully');
      })
      .catch(() => {
        console.error('An error occurred while opening WhatsApp');
      });
  };

  //share
  const share_app = async () => {
    let options = {
      title: 'Share friend the app',
      message: 'Check out the AstroRemedy app for personalized astrology remedies and predictions!',
      url: 'https://play.google.com/store/apps/details?id=com.ksbm.astrobook_user', // Replace with your actual URL
    };

    try {
      const res = await Share.open(options);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const on_logout = async () => {
    AsyncStorage.clear();
    GoogleSignin.revokeAccess();
    await unRegisterZegoCall();
    GoogleSignin.signOut();
    go_login();
  };




  const go_login = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'login' }],
      }),
    );
  };

  let Imguri = `${img_url}${props.props?.customerData?.image}`;
  console.log(Imguri, 'image')
  const pic = `${img_url}${props.props?.customerData?.image}`.split('/')[5];
  if (pic === 'user_default.jpg') {
    Imguri = null;
  } else {
    Imguri = `${img_url}${props.props?.customerData?.image}`;
  }

  const drawerData = [
    {
      title: "Home",
      image: require('../assets/astrobookimages/drawer/home.png')
    },
    // {
    //   title: "Book a Pooja",
    //   image: require('../assets/astrobookimages/drawer/pooja.png')
    // },
    // {
    //   title: "AstroMall",
    //   image: require('../assets/astrobookimages/drawer/pooja.png')
    // },
    {
      title: "Customer Support Chat",
      image: require('../assets/astrobookimages/drawer/customer.png')
    },
    {
      title: "Wallet Transactions",
      image: require('../assets/astrobookimages/drawer/wallet.png')
    },
    {
      title: "Astrologer Order History",
      image: require('../assets/astrobookimages/drawer/order.png')
    },
    {
      title: "Astro Remedy",
      image: require('../assets/astrobookimages/drawer/astro.png')
    },
    {
      title: "Puja History",
      image: require('../assets/astrobookimages/drawer/order.png')
    },
    {
      title: "Astrology Blog",
      image: require('../assets/astrobookimages/drawer/astrology.png')
    },
    {
      title: "Chat With Astrologers",
      image: require('../assets/astrobookimages/drawer/chatwith.png')
    },
    {
      title: "My Following",
      image: require('../assets/astrobookimages/drawer/follow.png')
    },
    {
      title: "Settings",
      image: require('../assets/astrobookimages/drawer/setting.png')
    },
    {
      title: "Logout",
      image: require('../assets/astrobookimages/drawer/logout.png')
    },
    
  ]

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 20 }} />
      <DrawerContentScrollView {...props.props1}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            // borderRadius: 10,
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          {/* <TouchableOpacity
            style={{ position: 'absolute', right: 10, top: 0 }}
            onPress={() => {
              navigation.closeDrawer()
            }}
          >
            <Image source={require('../assets/astrobookimages/cross.png')} style={{ width: 25, height: 25 }} />
          </TouchableOpacity> */}
          <Image
            source={
              Imguri ? { uri: Imguri } : require('../assets/images/user_img.png')
            }
            style={{
              width: width * 0.18,
              height: width * 0.18,
              paddingVertical: 12,
              borderRadius: (width * 0.25) / 2,
            }}
          />
          <View style={{ marginLeft: 10 }}>
            <View>
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: getFontSize(1.5),
                  color: "#000",
                  ...Fonts.primaryHelvetica,
                  fontSize: 13,
                }}>
                {props.props.customerData?.customerName}

              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('customerAccount')}

                style={{
                  position: "absolute",
                  right: -10,
                  top: -10
                }}>
                <Image source={require('../assets/astrobookimages/edit.png')} style={{ width: 15, height: 15, }} />
              </TouchableOpacity>
            </View>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: getFontSize(1.5),
                color: "#696969",
                ...Fonts.primaryHelvetica,
                fontSize: 13,
              }}>
              {props.props.customerData?.phoneNumber != 0 &&
                props.props.customerData?.phoneNumber}
            </Text>

          </View>
        </View>
        <View
          style={{
            flex: 1,
            width: '100%',
            padding: 20,
            paddingHorizontal: 0,
            alignSelf: 'center',
            paddingTop: 10,
            backgroundColor: colors.white_color,
            marginTop: 20,
          }}>

          {drawerData?.map((item) => {
            return (
              <TouchableOpacity style={{ display: "flex", flexDirection: "row", alignItems: 'center', gap: 10, paddingHorizontal: 10, alignItems: "center", marginBottom: 14, }}
             
             
              onPress={()=>{
                if(item?.title == "Logout"){
                  logout()
                } else if(item?.title == "Home"){
                  navigation.navigate("home3")
                }else if(item?.title == "Astrologer Order History"){
                  navigation.navigate("liveChatCall")
                }else if(item?.title == "Astrology Blog"){
                  navigation.navigate("AstrologyBlog")
                }else if(item?.title == "Astrology Blog"){
                  navigation.navigate("AstrologyBlog")
                }
                else if(item?.title == "My Following"){
                  navigation.navigate("following")
                }
                else if(item?.title == "Astro Remedy"){
                  navigation.navigate("poojacategory")
                }
                else if(item?.title == "Puja History"){
                  navigation.navigate("PujaHistory")
                }
                else if(item?.title == "Chat With Astrologers"){
                  navigation.navigate("astroForCall")
                }
                else if(item?.title == "Customer Support Chat"){
                  navigation.navigate("helpSupport")
                }
                else if(item?.title == "Customer Support Chat"){
                  navigation.navigate("helpSupport")
                }
                else if(item?.title == "Wallet Transactions"){
                  navigation.navigate("walletHistroy")
                }


                // else if (item?.title === "AstroMall") {
                  
                //   navigation.navigate("products",{ ...item });
                // } 
                else {
                  info_toast("Coming Soon")
                }
              }} 
              >
                <Image source={item?.image} style={{ width: 20, height: 20, objectFit: "contain" }} />
                <Text style={{ ...Fonts.primaryHelvetica, color: '#616161', fontSize: 15, }}>{item?.title}</Text>
              </TouchableOpacity>
            )
          })}
          <View style={{ paddingHorizontal: 30, marginTop: 20, }}>
            <Text style={{ color: "#424141", ...Fonts.primaryHelvetica, fontSize: 12, }}>Aslo available on</Text>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 5, }}>
              <Image source={require('../assets/astrobookimages/drawer/apple.png')} style={{ width: 20, height: 20 }} />
              <Image source={require('../assets/astrobookimages/drawer/Website.png')} style={{ width: 20, height: 20 }} />

              <Image source={require('../assets/astrobookimages/drawer/youtube.png')} style={{ width: 20, height: 20 }} />

              <Image source={require('../assets/astrobookimages/drawer/facebook.png')} style={{ width: 20, height: 20 }} />
              <Image source={require('../assets/astrobookimages/drawer/instagram.png')} style={{ width: 20, height: 20 }} />
              <Image source={require('../assets/astrobookimages/drawer/link.png')} style={{ width: 20, height: 20 }} />

            </View>
          </View>
          <Text style={{ color: "#424141", ...Fonts.primaryHelvetica, fontSize: 12, textAlign: "center", marginTop: 30, }}>Version 1.0</Text>

        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const DrawerNavigator = props => {
  return (
    <Drawer.Navigator
      drawerContent={props1 => (
        <CustomDrawerContent props1={props1} props={props} />
      )}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: width * 0.85,
          alignSelf: 'center',
          // backgroundColor: colors.background_theme4,
          elevation: 8,

          shadowColor: colors.black_color6,
        },
      }}>

      <Drawer.Screen name="home2" component={TabNavigator} />
    </Drawer.Navigator>
  );
};

const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  wallet: state.customer.wallet,
  homeSimmer: state.home.homeSimmer,
  isRefreshing: state.setting.isRefreshing,
});
const mapDispatchToProps = dispatch => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(DrawerNavigator);

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0.5,
    padding: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#bababa",
    paddingBottom: 15,
    marginBottom: 7,
  },
  buttonImage: {
    width: width * 0.09,
    height: width * 0.09,
    resizeMode: 'contain'
    // tintColor: '#fff8f0',
  },
  circle: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: getFontSize(1.5),
    color: colors.black_color,
    fontFamily: fonts.medium,
    marginLeft: 10,
  },
  socialLogo: {
    width: width * 0.08,
    height: width * 0.08,
  },
  iconimg: {
    width: width * 0.1,
    height: height * 0.1,
    resizeMode: 'contain',
  },
});
