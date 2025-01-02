import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Sizes, Fonts } from '../../../assets/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import * as LiveActions from '../../../redux/actions/LiveActions';
import CallTimer from './CallTimer';
import { base_url, img_url } from '../../../config/constants';
import { goBack } from '../../../navigations/NavigationServices';

const Header = ({ roomUserCount, dispatch, coHostData, astroData, customerData }) => {
  const [duration, setDuration] = useState(null);
  console.log(customerData?._id,'uid')
  console.log(coHostData,'id')
  useEffect(() => {
    if (coHostData) {
      const currentTime = new Date().getTime();
      const startTime = new Date(coHostData?.startTime).getTime();
      const diffTime = (currentTime - startTime) / 6000;
      const duration = coHostData?.totalDuration - parseInt(diffTime);
      if (duration < 0) {
        setDuration(null);
      } else {
        setDuration(duration);
      }
    } else {
      setDuration(null)
    }
  }, [coHostData, astroData]);

  return (
    <View style={styles.container}>
      <View style={styles.col1}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: base_url + astroData?.profileImage }}
            style={{ width: '100%', height: '100%', borderRadius: 100 }}
          />
        </View>
        {coHostData && <View style={styles.coHostImageContainer}>
          <Image
            source={{ uri: img_url + coHostData?.img_url }}
            style={{ width: '100%', height: '100%', borderRadius: 100 }}
          />
        </View>}

        <Text
          numberOfLines={2}
          style={{
            ...Fonts.black14InterMedium,
            fontSize: 9,
            flex: 1,
            marginLeft: Sizes.fixPadding * 0.5,
          }}>
          {coHostData ? `${astroData?.astrologerName}\n&${coHostData?.userName}` : astroData?.astrologerName}

        </Text>
        {duration && <CallTimer totalDuration={duration} />}
        <View style={styles.liveIndicator} />
      </View>
      <View style={styles.col2}>
        <View style={styles.countContainer}>
          <Ionicons name="eye-outline" color={Colors.white} size={16} />
          <Text
            style={{
              ...Fonts.white12RobotoMedium,
              marginHorizontal: Sizes.fixPadding * 0.2,
            }}>
            {roomUserCount}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Are you sure!', 'You want to leave?', [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Yes',
                style: 'destructive',
                onPress: () => goBack()
              }
            ])
          }}
          activeOpacity={0.8}
          style={[styles.countContainer,
          { borderRadius: 1000, paddingVertical: 3, paddingHorizontal: 10, },
          ]}>
          <Text style={{ ...Fonts.white14RobotoMedium }}>Leave</Text>
        </TouchableOpacity>
        {(coHostData && customerData?._id == coHostData?.userID) && <TouchableOpacity
          onPress={() => {
            Alert.alert('Alert!', 'Do you want to end this Video Call?', [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Yes',
                style: 'destructive',
                onPress: () => dispatch(LiveActions.onEndCalling())
              }]);

          }}
          activeOpacity={0.8}
          style={[
            styles.countContainer,
            { borderRadius: 1000, paddingVertical: 0, paddingHorizontal: 0 },
          ]}>
          <Ionicons name="close-outline" color={Colors.white} size={26} />
        </TouchableOpacity>}

      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  roomUserCount: state.live.roomUserCount,
  coHostData: state.live.coHostData,
  astroData: state.live.astroData,
  customerData: state.customer.customerData
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Header);

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: Sizes.fixPadding,
  },
  col1: {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: Sizes.fixPadding * 0.5,
    paddingHorizontal: Sizes.fixPadding * 0.5,
    borderRadius: 10000,
  },
  col2: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  imageContainer: {
    width: 30,
    height: 30,
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: Colors.primaryLight,
  },
  coHostImageContainer: {
    width: 20,
    height: 20,
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: Colors.primaryLight,
    position: 'absolute',
    left: 20,
    bottom: -1,
  },
  liveIndicator: {
    backgroundColor: Colors.red,
    width: 5,
    height: 5,
    position: 'absolute',
    top: Sizes.fixPadding * 0.8,
    left: Sizes.fixPadding * 0.5,
    borderRadius: 1000,
  },
  followContainer: {},
  countContainer: {
    backgroundColor: Colors.primaryLight,
    flexDirection: 'row',
    paddingVertical: Sizes.fixPadding * 0.5,
    paddingHorizontal: Sizes.fixPadding * 0.7,
    borderRadius: 1000,
  },
});
