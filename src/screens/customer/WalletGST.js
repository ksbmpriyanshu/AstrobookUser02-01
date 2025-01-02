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
    getFontSize,
    create_phonepe_order_test
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
  const { width, height } = Dimensions.get('screen');
  
  const WalletGST = props => {
    
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [walletData, setWalletData] = useState(props.route.params.data);
    const [firstOffer, setFirstOffer] = useState(null);
    const [amount, setAmount] = useState('');
   
    
  
    useEffect(() => {
      props.navigation.setOptions({
        header: () => (
          <MyHeader
            title={t('recharge')}
            navigation={props.navigation}
            socialIcons={false}
            statusBar={{
              backgroundColor: colors.background_theme2,
              barStyle: 'light-content',
            }}
          />
        ),
      });
    }, []);
  
     
  
  
  
    const phonepe = async(amount,gift,sub) => {
      console.log('ddd',amount,gift);
      setIsLoading(true);
      await axios({
        method: 'post',
        url: api_url + create_phonepe_order,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: {
          user_id: props.customerData.id,
          amount: amount,
          mobile: props.customerData.phone,
          gift_id: gift,
          sub_total: sub,
        },
      })
        .then(res => {
          console.log('amount===', res.data);
          if (res.data.success == true) {
            setIsLoading(false);
            props.navigation.navigate('phoneView', { url: res.data.data.instrumentResponse.redirectInfo.url });
  
          }
          else {
            setIsLoading(false);
            Alert.alert('Try again, Payment.')
          }
  
  
        })
        .catch(err => {
          setIsLoading(false);
          console.log(err);
        });
    };
  
  
    
  
  
   
  
    return (
      <ImageBackground
        source={require('../../assets/images/back.png')}
        style={{ flex: 1 }}>
        <MyLoader isVisible={isLoading} />
        
          <View style={{ flex: 1, width: '90%', alignSelf: 'center' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text allowFontScaling={false}
                style={{
                  fontSize: 16,
                  color: colors.black_color,
                  fontFamily: fonts.semi_bold,
                  // alignSelf: 'center',
                  marginVertical: 20,
                }}>
                Payment Details
              </Text>
              <View style={styles.rowContainer}>
                <Text allowFontScaling={false} style={styles.rowText}>Total Amount</Text>
                <Text allowFontScaling={false} style={styles.rowText}>
                  ₹ {parseFloat(walletData.recharge_plan_amount).toFixed(1)}
                </Text>
              </View>
              <View style={styles.rowContainer}>
                <Text allowFontScaling={false} style={styles.rowText}>GST @ 18%</Text>
                <Text allowFontScaling={false} style={styles.rowText}>
                  ₹ {parseFloat(walletData.recharge_plan_amount * 0.18).toFixed(1)}
                </Text>
              </View>
              <View style={styles.rowContainer}>
                <Text allowFontScaling={false} style={styles.rowText}>Gift Amount</Text>
                <Text allowFontScaling={false} style={styles.rowText}>
                  ₹ {parseFloat(walletData.recharge_plan_extra_percent).toFixed(1)}
                </Text>
              </View>
              <View style={styles.rowContainer}>
                <Text allowFontScaling={false} style={styles.rowText}>Total Payable Amount</Text>
                <Text allowFontScaling={false} style={styles.rowText}>
                  ₹ {parseFloat(walletData.recharge_plan_amount) + parseFloat(walletData.recharge_plan_amount * 0.18)}
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => phonepe(parseFloat(walletData.recharge_plan_amount) + parseFloat(walletData.recharge_plan_amount * 0.18),walletData.recharge_plan_id, walletData.recharge_plan_amount)}
                style={{
                  flex: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: colors.background_theme2,
                  paddingVertical: 10,
                  borderRadius: 5,
                  marginVertical: 20,
                }}>
                <Text allowFontScaling={false}
                  style={{
                    fontSize: 16,
                    color: colors.background_theme1,
                    fontFamily: fonts.medium,
                  }}>
                  Proceed payment
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        
       
        
  
      </ImageBackground>
    );
  };
  
  const mapStateToProps = state => ({
    customerData: state.customer.customerData,
    wallet: state.customer.wallet,
  });
  
  const mapDispatchToProps = dispatch => ({ dispatch });
  
  export default connect(mapStateToProps, mapDispatchToProps)(WalletGST);
  
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
      textAlign: 'center',
      fontSize: getFontSize(1.8),
      borderBottomWidth: 1,
      width: '70%',
      borderBottomColor: colors.black_color8,
      fontFamily: fonts.medium,
      color: colors.black_color
    },
  
    box1: {
      width: width * 0.25,
      height: 20,
      backgroundColor: colors.background_theme2,
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
  