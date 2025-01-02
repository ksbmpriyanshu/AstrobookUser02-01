import { View, Text, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import React, { useEffect } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Feather from 'react-native-vector-icons/Feather';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, fonts, getFontSize } from '../config/Constants1';
import { connect } from 'react-redux';
import { openFacebook, openInstagram, openYoutube } from './Methods';
import { useTranslation } from 'react-i18next';
import { showNumber, showNumber0 } from '../utils/services';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen';
import { Fonts, Sizes } from '../assets/style';
import { mainlogo } from '../assets/images/Images';
import MenuIcon from '../svgicons/MenuIcon';
import WalletIcon from '../svgicons/WalletIcon';
import LanguageIcon from '../svgicons/LanguageIcon';
import SupportIcon from '../svgicons/SupportIcon';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('screen');
const HomeChat = props => {
  const { t } = useTranslation();
  const { title } = props;
  useEffect(()=>{
    console.log("cus-data",props?.customerData)
    if(props?.customerData?.banned_status){
      Alert.alert("AstroBook","You are banned, Please contact administrator")
      props.navigation.navigate('login')
    }
  },[])
const navigation = useNavigation();
  return (
    // <View
    //   style={{
    //     flex: 0,
    //     width: '100%',
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     padding: 8,
    //     backgroundColor: colors.white_color,
      
        
    //   }}>
    //     <View style={{flexDirection:'row',alignItems:'center',gap:5,}}>

        
    //   <TouchableOpacity
    //     activeOpacity={0.8}
    //     onPress={() => props.navigation.openDrawer()}
    //     style={{elevation:3,zIndex:4,}}>
    //     <Feather name="menu"  color={colors.black_color} size={30} />
    //   </TouchableOpacity>

    //     <Text style={{color:"#F45F4B",fontSize:16,fontWeight:"800",textTransform:"uppercase"}}>Astro Remedy</Text>
    //     </View>      
    //     <View style={{flexDirection:'row',alignItems:'center'}}>

        
    //   <TouchableOpacity
    //     onPress={() => props.navigation.navigate('notifications')}
    //     style={{ flexDirection: 'row',marginHorizontal:Sizes.fixPadding }}>
    //     {
    //       props?.notificationCounts != 0 && <View
    //         style={{
    //           flex: 0.1,
    //           justifyContent: 'center',
    //           alignItems: 'center',
    //           borderRadius: getFontSize(1.2),
    //           justifyContent: 'center',
    //           position: 'absolute',
    //           left: getFontSize(1.3),
    //           bottom: getFontSize(1.3),
    //           zIndex: 1,
    //         }}>
    //         <Text allowFontScaling={false}
    //           style={{
    //             fontSize: getFontSize(1.2),
    //             fontFamily: fonts.medium,
    //             textAlign: 'center',
    //             color: colors.red_color1,

    //           }}>
    //           {props?.notificationCounts ?? ''}
    //         </Text>
    //       </View>
    //     }
    //     <AntDesign name="bells" color={colors.black_color8} size={getFontSize(2.2)} />
    //   </TouchableOpacity>
    //   <TouchableOpacity
    //     onPress={() => props.navigation.navigate('wallet')}
    //     style={{
    //       // flex: 0.3,
    //       flexDirection: 'row',
    //       backgroundColor: colors.background_theme2,
    //       alignItems:"center", 
    //       borderRadius: 15,
    //       justifyContent: 'center',
    //       paddingHorizontal:getFontSize(0.8),
    //       paddingVertical:getFontSize(0.7)
    //     }}>
    //     <Ionicons name="wallet" color={"#fff"} size={15} />
    //     <Text allowFontScaling={false}
    //       style={{
    //         fontSize: getFontSize(1.2),
    //         color: colors.black_color,
    //         fontFamily: fonts.medium,
    //         marginLeft: 5,
    //         color:"#fff"
    //       }}>
    //       {showNumber0(props.customerData?.wallet_balance ?? 0)}
    //     </Text>
    //   </TouchableOpacity>
    //   </View>
    // </View>
    <View style={{display:"flex",flexDirection:"row",alignItems:'center',justifyContent:"space-between",paddingHorizontal:5,paddingVertical:5,}}>
      <View  style={{display:"flex",flexDirection:"row",alignItems:'center',gap:10}}>
      <TouchableOpacity
         activeOpacity={0.8}
         onPress={() => props.navigation.openDrawer()}>
        
        <MenuIcon/>
        </TouchableOpacity>
        <Text style={{
          ...Fonts.primaryHelvetica,
          color:"#000",
          fontSize:15,
        }}>{title}</Text>
      </View>
      <View style={{display:"flex",flexDirection:"row",alignItems:'center',gap:5,}}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('wallet')}>
       <Text style={{...Fonts.primaryHelvetica,color:"#000",fontSize:12,
        borderWidth:0.4,
        paddingHorizontal:10,
        paddingTop:2,
        borderRadius:40,
        textAlign:'center',
        paddingBottom:1,
       }}>{showNumber0(props.customerData?.wallet_balance ?? 0)}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          navigation.navigate('liveChatCall')
        }}>
        <Image source={require('../assets/astrobookimages/messanger.png')} style={{height:26,width:26,objectFit:"contain"}}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  notificationData: state.customer.notificationData,
  notificationCounts: state.customer.notificationCounts,
});

export default connect(mapStateToProps)(HomeChat);
