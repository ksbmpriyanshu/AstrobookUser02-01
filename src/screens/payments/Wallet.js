import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
  PanResponder,
  StyleSheet,
  TextInput,
  Linking,
} from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import MyHeader from '../../components/MyHeader';
import {
  api_addwallet,
  api_getRechargeplans,
  api_url,
  colors,
  fonts,
  vedic_images,
  create_phonepe_order,
  phonepe_success,
  getFontSize
} from '../../config/Constants1';
import { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { success_toast, warnign_toast } from '../../components/MyToastMessage';
import * as CustomerActions from '../../redux/actions/CustomerActions';
import { useRef } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyLoader from '../../components/MyLoader';
import * as UserActions from '../../redux/actions/CustomerActions';
import { useTranslation } from 'react-i18next';
import { showNumber } from '../../utils/services';
import { Sizes, Fonts, Colors } from '../../assets/style';
import { Input } from '@rneui/themed';
import { ColorSpace } from 'react-native-reanimated';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { SCREEN_WIDTH } from '../../config/Screen';
const { width, height } = Dimensions.get('screen');

const Wallet = ({ navigation, route, customerData, dispatch, rechargeOfferList }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [firstOffer, setFirstOffer] = useState(null);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <MyHeader
          title={t('Add Money to wallet')}
          navigation={navigation}
          socialIcons={false}
          statusBar={{
            backgroundColor: colors.background_theme2,
            barStyle: 'light-content',
          }}
        />
      ),
    });
  }, []);

  useEffect(() => {
    dispatch(CustomerActions.getWalletRechargeOfferList())
  }, [dispatch]);

  const add_money = () => {
    const amountRegex = /^\d+(\.\d+)?$/
    if (amount.length == 0) {
      warnign_toast('Please Enter your amount to add your wallet.');
      return
    } else if (amount < 1) {
      warnign_toast('Minimum amount required is INR 50');
      return
    } else if (!amountRegex.test(amount)) {
      warnign_toast('Please enter valid amount');
      return
    } else {
      navigation.navigate('WalletGstAmount', { amount: amount })
    }

  };
  console.log("customerData?.wallet_balance", customerData?.wallet_balance)
  return (
    <View
      source={require('../../assets/images/back.png')}
      style={{ flex: 1 }}>
      <MyLoader isVisible={isLoading} />

      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{paddingHorizontal:20,paddingVertical:10,}}>
          <Text allowFontScaling={false} style={{...Fonts.primaryHelvetica,fontSize:responsiveScreenFontSize(1.8)}}>
            {t('available_balance')}:

          </Text>
          <Text allowFontScaling={false} 
         style={{...Fonts.primaryHelvetica,fontSize:responsiveScreenFontSize(3.4),color:"#000000",marginVertical:7,}}>
            {showNumber(customerData?.wallet_balance)}
          </Text>

          
        </View>
     <View>
     <View style={{paddingHorizontal:10,}}>
            <View style={{
              borderBottomWidth:0.5,
              borderBottomColor:"#B7B7B7",
              marginBottom:20,
              display:"flex",
              flexDirection:"row",
              justifyContent:"space-between",alignItems:'center',
          
              }}>
             <TextInput 
              value={amount}
              placeholder={t('enter_amount')}
              placeholderTextColor={"#878787"}
              keyboardType="number-pad"
              maxLength={6}
              returnKeyType="done"
              onChangeText={setAmount}
              style={{width:"80%",height:50,...Fonts.primaryHelvetica,fontSize:17,color:colors.black_color7}}
             />
              <TouchableOpacity onPress={() => add_money()} >
                <Image source={require('../../assets/astrobookimages/proceed_btn.png')}
                  style={{ width: responsiveScreenWidth(11), height: responsiveScreenHeight(5), objectFit: "cover", }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {imageData == '0' && (
          <TouchableOpacity
            style={{
              width: width * 0.95,
              height: width * 0.32,
              alignSelf: 'center',
              borderRadius: 10,
             borderWidth: 1,
              borderColor: colors.black_color,
              marginBottom: 20,
              overflow: 'hidden',
              padding: 5
            }}
            onPress={() => navigation.navigate('walletgstoffer', { data: firstOffer[0]?.recharge_of, data2: firstOffer[0]?.recharge_get })}>
            <ImageBackground
              source={require('../../assets/images/permotional_banner.jpeg')}
              style={{
                width: '100%',
                height: '100%',
              }}
              resizeMode="cover">
              <View
                style={{
                  width: '50%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text allowFontScaling={false}
                  style={{
                    fontSize: 18,
                    color: colors.black_color8,
                    fontFamily: fonts.medium,
                    textAlign: 'center',
                  }}>
                  Get ₹ {firstOffer && (parseFloat(firstOffer[0]?.recharge_get))}.0
                </Text>
                <Text allowFontScaling={false}
                  style={{
                    fontSize: 13,
                    color: colors.black_color8,
                    fontFamily: fonts.medium,
                    textAlign: 'center',
                  }}>
                  First Recharge offer{'\n'}Recharge with {'\n'}₹ {firstOffer && parseFloat(firstOffer[0]?.recharge_of)}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}

        <View
          style={{
            width: '100%',
          paddingHorizontal:SCREEN_WIDTH*0.025,
            flexDirection: 'row',
            flexWrap:"wrap",
                  
            justifyContent:"space-between"
          }}>
          {rechargeOfferList &&
            rechargeOfferList.map((item, index) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('WalletGstAmount', { amount: item?.amount, rechargePlanId: item?._id })}
                key={index}
                style={{
                  flex: 0,
                  width: '30%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: Sizes.fixPadding,
                  backgroundColor: colors.background_theme1,
                 borderWidth:0.5,
                 borderColor:"#E6E6E6",
                 
                 paddingTop:20,
                 }}>
                <Text allowFontScaling={false}
                  style={{ ...Fonts.primaryHelvetica, color: "#000000",fontSize:17,marginBottom:10, }}>
                 ₹{item?.amount}
                </Text>
                <Text style={{backgroundColor:'#92FFC08A',width:"100%"
                  , ...Fonts.primaryHelvetica, color: "#01AA48",fontSize:12,textAlign:'center'
                }}>{`Extra ${item?.percentage}%`}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>



    </View>
  );
};

const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  wallet: state.customer.wallet,
  rechargeOfferList: state.customer.rechargeOfferList,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

const styles = StyleSheet.create({
  box: {
    height: 50,
    width: 50,
    backgroundColor: colors.background_theme1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  amountInput: {
    fontSize: getFontSize(1.6),
    width: '70%',
    fontFamily: fonts.medium,
    color: colors.black_color,
  },

  box1: {
    width: width * 0.25,
    height: 20,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    position: 'absolute',
    alignItems: 'center',
    transform: [{ rotate: '-50deg' }],
    overflow: 'hidden',
    right: width * 0.18,
    top: width * 0.05,
  },
  bannerText: {
    color: 'white',
    fontFamily: fonts.medium,
    fontSize: getFontSize(1),
    textAlign: 'center',
  },

  rowContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  rowText: {
    fontSize: 14,
    color: colors.black_color7,
    fontFamily: fonts.medium,
  },
});
