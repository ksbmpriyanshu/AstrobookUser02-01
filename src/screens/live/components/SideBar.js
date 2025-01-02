import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Colors, Sizes, Fonts } from '../../../assets/style';
import { connect } from 'react-redux';
import * as LiveActions from '../../../redux/actions/LiveActions';
import { SvgXml } from 'react-native-svg';
import { showNumber, showToastMessage } from '../../../utils/services';
import Ionicons from 'react-native-vector-icons/Ionicons'

const SideBar = ({ dispatch, liveData, coHostData, customerData, isMute }) => {
  console.log(customerData?.wallet_balance,'wallet')
  console.log(liveData?.vedioCallPrice,'data')
  const handledata = () => {
    if (customerData?.wallet_balance < liveData?.vedioCallPrice * 5) {
      showToastMessage({ message: 'Insufficient Balance' });
    } else {
      dispatch(LiveActions.setLiveCallsVisible(true))
    }
  }
  return (
    <View style={styles.container}>
      {
        coHostData?.userID === customerData?._id && <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => dispatch(LiveActions.onLiveMuteUnmute())}
          style={styles.itemContainer}>
          <Ionicons name={!isMute ? 'mic' : 'mic-off'} color={'white'} size={22} />
        </TouchableOpacity>
      }

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          if (coHostData?.userID === customerData?._id) {
            showToastMessage({ message: 'During video call you can not send the gifts.' })
          } else {
            dispatch(LiveActions.setGiftVisible(true))
          }

        }}
        style={styles.itemContainer}>
        <Image
          source={require('../../../assets/icons/live_gift.png')}
          style={{
            width: '60%',
            height: '60%',
            borderRadius: 100,
            resizeMode: 'contain',
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => dispatch(LiveActions.setWatingListVisible(true))}
        style={styles.itemContainer}>
        <Image
          source={require('../../../assets/icons/live_waiting.png')}
          style={{
            width: '60%',
            height: '60%',
            borderRadius: 100,
            resizeMode: 'contain',
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        // onPress={() => dispatch(LiveActions.setLiveCallsVisible(true))}
        onPress={handledata}
        style={styles.callPriceContainer}>
        <SvgXml
          width="40"
          height="60"
          xml={`<svg width="50" height="79" viewBox="0 0 50 79" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 18.2444C0 15.3271 1.13718 12.5007 3.2955 10.5379C18.9187 -3.67045 30.5112 -3.34373 46.4974 10.5071C48.7802 12.485 50 15.399 50 18.4195V72.6881C50 76.0018 47.3137 78.6881 44 78.6881H6C2.68629 78.6881 0 76.0018 0 72.6881V18.2444Z" fill="#EA720F"/>
          </svg>`}
        />
        <View style={styles.callPriceView}>
          <View
            style={{
              width: 5,
              height: 5,
              borderRadius: 5,
              backgroundColor: Colors.white,
            }}
          />
          <View
            style={{
              width: '90%',
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderColor: Colors.white,
              marginTop: Sizes.fixPadding * 0.5,
              borderStyle: 'dashed',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../../assets/icons/live_phone.png')}
              style={{ width: 18, height: 18 }}
            />
          </View>
          <Text
            style={{
              ...Fonts.white11InterMedium,
              fontSize: 9,
              textAlign: 'center',
            }}>
            {showNumber(liveData?.vedioCallPrice)}/min
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => ({
  liveData: state.live.liveData,
  coHostData: state.live.coHostData,
  customerData: state.customer.customerData,
  isMute: state.live.isMute
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);

const styles = StyleSheet.create({
  container: {
    flex: 0,
    padding: Sizes.fixPadding * 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    backgroundColor: Colors.primaryLight,
    width: 40,
    height: 40,
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Sizes.fixPadding,
  },
  callPriceContainer: {
    marginTop: Sizes.fixPadding,
  },
  callPriceView: {
    position: 'absolute',
    width: '100%',
    top: 0,
    bottom: 0,
    right: 0,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Sizes.fixPadding * 0.5,
  },
});
