import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { BottomSheet } from '@rneui/themed';
import { connect } from 'react-redux';
import * as LiveActions from '../../../redux/actions/LiveActions';
import { Colors, Sizes, Fonts } from '../../../assets/style';
import { showNumber, showToastMessage } from '../../../utils/services';
import { SCREEN_WIDTH } from '../../../config/Screen';
import { base_url } from '../../../config/constants';
import { replace } from '../../../navigations/NavigationServices';

const GiftData = ({ dispatch, giftDataVisible, customerData, giftData }) => {
  console.log(giftDataVisible)
  const [selectedGift, setSelectedGift] = useState(null);
  const [isLowBalance, setIsLowBalance] = useState(false);

  return (
    <BottomSheet
      isVisible={giftDataVisible}
      onBackdropPress={() => dispatch(LiveActions.setGiftVisible(false))}
      containerStyle={{zIndex: 6}}
      >
      <View style={styles.container}>
        {headerInfo()}
        {giftData && giftsInfo()}
        {buttonsInfo()}
      </View>
    </BottomSheet>
  );

  function buttonsInfo() {
    const onSend = () => {
      if (!selectedGift) {
        showToastMessage({ message: 'Please select a gift' })
        return
      }

      dispatch(LiveActions.sendGiftToAstrologer(selectedGift))

    }
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => replace('wallet')} style={styles.button}>
          <Text style={{ ...Fonts.black14InterMedium }}>Recharge</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={isLowBalance} onPress={onSend} style={styles.button}>
          <Text style={{ ...Fonts.black14InterMedium, color: isLowBalance ? Colors.gray : Colors.black }}>Send</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function giftsInfo() {
    const onSelect = item => {
      try {
        setSelectedGift(item?._id);
        if (customerData?.wallet_balance < item?.amount) {
          setIsLowBalance(true);
        } else {
          setIsLowBalance(false);
        }
      } catch (e) {
        console.log(e);
      }
    };

    const GiftItem = ({ item, index }) => {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onSelect(item)}
          style={[
            styles.giftItemContainer,
            {
              backgroundColor:
                selectedGift == item?._id ? Colors.primaryDark : Colors.white,
            },
          ]}>
          <Image
            source={{ uri: base_url + item?.giftIcon }}
            style={{ width: '50%', height: '40%' }}
          />
          <Text
            numberOfLines={2}
            style={{
              ...Fonts.black11InterMedium,
              marginTop: Sizes.fixPadding * 0.5,
              color: selectedGift == item?._id ? Colors.white : Colors.black,
            }}>
            {item?.gift}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              ...Fonts.black11InterMedium,
              color: selectedGift == item?._id ? Colors.white : Colors.black,
            }}>
            {showNumber(item?.amount)}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View>
        <Text style={{ ...Fonts.white18RobotMedium, textAlign: 'center' }}>
          Send Gift
        </Text>
        <View style={styles.giftContainer}>
          {giftData.map((item, index) => (
            <GiftItem key={index} item={item} index={index} />
          ))}
        </View>
      </View>
    );
  }

  function headerInfo() {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.walletContainer}>
          <Image
            source={require('../../../assets/icons/live_wallet.png')}
            style={{ width: 25, height: 25 }}
          />
          <Text
            style={{
              ...Fonts.white18RobotBold,
              color: Colors.black,
              fontSize: 12,
              marginLeft: Sizes.fixPadding * 0.5,
            }}>
            {showNumber(customerData?.wallet_balance)}
          </Text>
        </View>
        <Text style={{ ...Fonts.white11InterMedium, fontSize: 9 }}>
          {isLowBalance ? 'Low Balance!' : '   '}
        </Text>
        <TouchableOpacity activeOpacity={0.8} onPress={() => dispatch(LiveActions.setCallInfoVisible(true))} style={{ position: 'absolute', right: 5, top: 5 }}>
          <Image
            source={require('../../../assets/icons/live_info.png')}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
        
      </View>
    );
  }
};

const mapStateToProps = state => ({
  giftDataVisible: state.live.giftDataVisible,
  customerData: state.customer.customerData,
  giftData: state.live.giftData,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(GiftData);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryLight,
    borderTopRightRadius: Sizes.fixPadding * 2,
    borderTopLeftRadius: Sizes.fixPadding * 2,
    zIndex: 2
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Sizes.fixPadding * 1.5,
    borderBottomWidth: 1,
    borderBlockColor: Colors.white,
    paddingVertical: Sizes.fixPadding,
  },
  walletContainer: {
    backgroundColor: Colors.white,
    borderRadius: 1000,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding * 0.5,
    elevation: 5,
    shadowColor: Colors.primaryDark,
  },
  giftContainer: {
    marginHorizontal: SCREEN_WIDTH * 0.05,
    flexDirection: 'row',
    // justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginTop: Sizes.fixPadding,
  },
  giftItemContainer: {
    width: '20%',
    height: SCREEN_WIDTH * 0.25,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Sizes.fixPadding,
    marginRight: SCREEN_WIDTH * 0.04,
    borderRadius: Sizes.fixPadding,
    elevation: 5,
    shadowColor: Colors.grayDark,
  },
  buttonContainer: {
    margin: SCREEN_WIDTH * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    width: '40%',
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Sizes.fixPadding * 0.8,
    borderRadius: 1000,
    elevation: 5,
    shadowColor: Colors.grayDark,
  },
});
