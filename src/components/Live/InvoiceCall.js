import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Modal} from 'react-native-paper';
import {Colors, Fonts, Sizes} from '../../assets/style';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
import {SCREEN_WIDTH} from '../../config/Screen';
import {Image} from 'react-native';
import { colors, img_url_2 } from '../../config/Constants1';

const InvoiceCall = ({
  astroData,
  invoiceModalVisible,
  updateState,
  wallet,
  navigation,
  invoiceData,
  waitListData
}) => {

    
  const total_time = () => {
    let total_balance = waitListData.reduce(
      (accumulator, currentValue) =>
        parseFloat(accumulator) + parseFloat(currentValue.time),
      0,
    );
    const minutes = parseFloat(total_balance/60).toFixed(0);
    return String(minutes).padStart(2, '0');
  };

  const audio_price = () =>
    parseFloat(astroData?.audio_price) + parseFloat(astroData?.audio_commission)

  const vedio_price = () =>
    parseFloat(astroData?.video_price) + parseFloat(astroData?.video_commission)

  const audio_wallet_check = () => {
    if (parseFloat(wallet) <= audio_price()) {
      return true;
    } else {
      return false;
    }
  };

  const vedio_wallet_check = () => {
    if (parseFloat(wallet) <= vedio_price()) {
      return true;
    } else {
      return false;
    }
  };

  const totalSeconds = invoiceData?.call_log_duration_min;
  const integerPart = Math.floor(totalSeconds);

const minutes = Math.floor(integerPart / 60);
const seconds = integerPart % 60;

// Format the time
const formattedTime = `${minutes}:${seconds}`;


  return (
    <Modal
      visible={invoiceModalVisible}
      onDismiss={() => updateState({invoiceModalVisible: false})}
      contentContainerStyle={{
        flex: 0,
        paddingVertical: Sizes.fixPadding * 2,
        backgroundColor: Colors.white,
        marginHorizontal: Sizes.fixPadding * 1.5,
        borderRadius: Sizes.fixPadding * 2,
        elevation: 8,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowColor: Colors.blackLight
      }}>
      <View style={{}}>
        <TouchableOpacity 
        onPress={() => updateState({invoiceModalVisible: false})}
        style={{alignItems:'flex-end',marginRight:20,position:'absolute',right:0}}>
            <Ionicons name='close' size={30} color={colors.background_theme2} />
        </TouchableOpacity>
        <View
          style={[
            styles.row,
            {
              alignItems: 'center',
              paddingHorizontal: Sizes.fixPadding,
              borderBottomWidth: 1,
              borderBottomColor: Colors.grayLight,
              paddingBottom: Sizes.fixPadding * 0.5,
              alignSelf:'center'
            },
          ]}>
          
            <Text allowFontScaling={false} style={{color:colors.background_theme2,
            fontSize:20,textAlign:'center'}}>Video Call Invoice</Text>
            
         
          
        </View>
       
        <View style={{position: 'relative', bottom: Sizes.fixPadding * 0.5}}>
          
        <View style={{flexDirection:'row',alignItems:'center',margin:10}}>
            <Text allowFontScaling={false} style={{...Fonts.gray14RobotoMedium,fontSize:18}}>
                Video Call Id:
            </Text>
        <Text allowFontScaling={false} style={{...Fonts.gray14RobotoMedium,fontSize:18}}>
              {' '}{'AK'}{invoiceData?.invoiceId}
          </Text>
        </View>
          <View style={{flexDirection:'row',alignItems:'center',margin:10}}>
            <Text allowFontScaling={false} style={{...Fonts.gray14RobotoMedium,fontSize:18}}>
                Time:
            </Text>
        <Text allowFontScaling={false} style={{...Fonts.gray14RobotoMedium,fontSize:18}}>
               {' '}  {formattedTime} min
          </Text>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',margin:10}}>
            <Text allowFontScaling={false} style={{...Fonts.gray14RobotoMedium,fontSize:18}}>
                Charge:
            </Text>
        <Text allowFontScaling={false} style={{...Fonts.gray14RobotoMedium,fontSize:18}}>
        {' '}₹ {invoiceData?.call_log_invoice_amt}
          </Text>
        </View>

        
          
         
        </View>
        <LinearGradient
            colors={[Colors.primaryLight, Colors.primaryDark]}
            style={{width: '50%', borderRadius: Sizes.fixPadding * 2,alignSelf:'center'}}>
            <TouchableOpacity
              onPress={() => updateState({invoiceModalVisible: false})}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: Sizes.fixPadding * 0.5,
                paddingHorizontal: Sizes.fixPadding * 2,
              }}>
              <Text allowFontScaling={false}
                style={{
                  ...Fonts.black16RobotoMedium,
                  color: Colors.white,
                }}>
                OK
              </Text>
            </TouchableOpacity>
          </LinearGradient>
      </View>
    </Modal>
  );
};

export default InvoiceCall;

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'column',
    // height: '100%'
    alignItems: 'center',
  },
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContainer: {
    borderRadius: 1000,
    marginVertical: Sizes.fixPadding,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemCount: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: -2,
    backgroundColor: '#FB4A59',
    borderRadius: 1000,
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowColor: Colors.blackLight,
    zIndex: 99,
  },
});
