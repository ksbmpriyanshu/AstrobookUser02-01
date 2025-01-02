import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { BottomSheet } from '@rneui/themed';
import { connect } from 'react-redux';
import * as LiveActions from '../../../redux/actions/LiveActions';
import { Colors, Sizes, Fonts } from '../../../assets/style';
import { SCREEN_WIDTH } from '../../../config/Screen';
import { showNumber } from '../../../utils/services';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { base_url } from '../../../config/constants';

const LiveCalls = ({ liveCallsVisible, dispatch, liveData, astroData, layout }) => {
  return (
    <BottomSheet
      isVisible={liveCallsVisible} 
      onBackdropPress={() => dispatch(LiveActions.setLiveCallsVisible(false))}>
      <View style={styles.mainContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: base_url + astroData?.profileImage }}
            style={styles.image}
          />
        </View>
        <View style={styles.container}>
          <Text
            style={{
              ...Fonts.white16RobotoMedium,
              textAlign: 'center',
              marginTop: Sizes.fixPadding * 5,
              marginBottom: Sizes.fixPadding * 4,
            }}>
            {astroData?.astrologerName}
          </Text>
          <View style={styles.itemContainer}>
            <View
              style={{
                width: SCREEN_WIDTH * 0.15,
                height: SCREEN_WIDTH * 0.15,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F7C514',
              }}>
              <Ionicons name='videocam' color={Colors.white} size={22} />
            </View>
            <View style={{ width: '60%', paddingHorizontal: Sizes.fixPadding * 0.5 }}>
              <Text style={{ ...Fonts.white12RobotoRegular, fontSize: 13 }}>Video call @ {showNumber(liveData?.vedioCallPrice)} <Text style={{ textDecorationLine: 'line-through' }}>{showNumber(53)}/min</Text></Text>
              <Text style={{ ...Fonts.white12RobotoRegular, fontSize: 8, color: '#F7C514' }}>Both consultant and you on video call</Text>
            </View>
            <TouchableOpacity disabled={layout == 'VEDIO_CALL'} onPress={() => dispatch(LiveActions.addInWaitingList())} activeOpacity={0.8} style={{ width: '25%', backgroundColor: layout == 'VEDIO_CALL' ? Colors.grayDark : '#F7C514', justifyContent: 'center', alignItems: 'center', paddingVertical: Sizes.fixPadding * 0.8, borderRadius: Sizes.fixPadding * 0.5 }}>
              <Text style={{ ...Fonts.black14InterMedium, color: layout == 'VEDIO_CALL' ? Colors.white : Colors.black }}> {layout == 'VEDIO_CALL' ? 'Joined' : 'Join'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BottomSheet>
  );
};

const mapStateToProps = state => ({
  liveCallsVisible: state.live.liveCallsVisible,
  liveData: state.live.liveData,
  astroData: state.live.astroData,
  layout: state.live.layout
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(LiveCalls);

const styles = StyleSheet.create({
  mainContainer: {},
  container: {
    backgroundColor: Colors.primaryLight,
    borderTopRightRadius: Sizes.fixPadding * 2,
    borderTopLeftRadius: Sizes.fixPadding * 2,
    padding: Sizes.fixPadding,
    paddingBottom: Sizes.fixPadding * 3
  },
  imageContainer: {
    width: SCREEN_WIDTH * 0.3,
    height: SCREEN_WIDTH * 0.3,
    borderWidth: 2,
    borderRadius: 1000,
    borderColor: Colors.primaryLight,
    overflow: 'hidden',
    alignSelf: 'center',
    bottom: -SCREEN_WIDTH * 0.15,
    zIndex: 1,

  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
