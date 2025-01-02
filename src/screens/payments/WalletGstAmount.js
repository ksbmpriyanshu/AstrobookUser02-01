import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import MyHeader from '../../components/MyHeader';
import {
  colors,
  fonts,
  getFontSize,
} from '../../config/Constants1';
import { useState } from 'react';
import { connect } from 'react-redux';
import MyLoader from '../../components/MyLoader';
import * as UserActions from '../../redux/actions/CustomerActions';
import { useTranslation } from 'react-i18next';
const { width, height } = Dimensions.get('screen');

const WalletGstAmount = ({ route, navigation, dispatch,customerData}) => {

  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [walletData] = useState(route.params.amount);
  const gstpercentage = 18;
  const gstamountrupee = parseFloat((walletData * gstpercentage)/100).toFixed(1) ;

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <MyHeader
          title={t('recharge')}
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

  const phonepe = async (amount, sub) => {
    const payload = {
      data: {
        customerId: customerData?._id,
        amount: route?.params?.amount,
        firstRechargeId: '',
        rechargePlanId: route?.params?.rechargePlanId ?? ''
      },
      dispatch: dispatch
      
    }
    console.log(payload,'pay')
    dispatch(UserActions.onWalletRecharge(payload))
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
              ₹ {parseFloat(walletData).toFixed(1)}
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <Text allowFontScaling={false} style={styles.rowText}>GST @ 18%</Text>
            <Text allowFontScaling={false} style={styles.rowText}>
              {/* admin gst */}
              {gstamountrupee}
              {/* ₹ {parseFloat((walletData * gstpercentage)/100).toFixed(1)}  */}
              {/* ₹ {parseFloat(walletData * 0.18).toFixed(1)} */}
            </Text>
          </View>

          <View style={styles.rowContainer}>
            <Text allowFontScaling={false} style={styles.rowText}>Total Payable Amount</Text>
            <Text allowFontScaling={false} style={styles.rowText}>
              ₹ {parseFloat(walletData) + parseFloat(gstamountrupee)}
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => phonepe()}
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

export default connect(mapStateToProps, mapDispatchToProps)(WalletGstAmount);

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
