import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Modal } from 'react-native-paper';
import { connect } from 'react-redux';
import * as LiveActions from '../../../redux/actions/LiveActions';
import { Colors, Sizes, Fonts } from '../../../assets/style';

const StartLiveAlert = ({ dispatch, coHostStartVisible }) => {
  console.log(":::>",coHostStartVisible)
  return (
    <Modal
      visible={coHostStartVisible}
    >
      <View style={styles.container}>
        <Text style={{ ...Fonts.primaryLight15RobotoMedium, fontSize: 18 }}>
          Alert!
        </Text>
        <Text
          style={{ ...Fonts.black14RobotoRegular, marginTop: Sizes.fixPadding }}>
          Do you want to start a video call?
        </Text>
        <View style={styles.buttonContianer}>
          <TouchableOpacity
            hitSlop={{ bottom: 5, top: 5 }}
            activeOpacity={0.8}
            onPress={() => dispatch(LiveActions.onCancelCallRequest())}
            style={styles.buttons}>
            <Text style={{ ...Fonts.black14RobotoRegular }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => dispatch(LiveActions.onGoLive())}
            hitSlop={{ bottom: 5, top: 5 }}
            activeOpacity={0.8}
            style={styles.buttons}>
            <Text style={{ ...Fonts.primaryLight14RobotoRegular }}>Yes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const mapStateToProps = state => ({
  coHostStartVisible: state.live.coHostStartVisible,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(StartLiveAlert);

const styles = StyleSheet.create({
  container: {
    height: 150,
    backgroundColor: Colors.white,
    zIndex: 1,
    width: '90%',
    alignSelf: 'center',
    borderRadius: Sizes.fixPadding,
    padding: Sizes.fixPadding * 2,
  },
  buttonContianer: {
    marginTop: Sizes.fixPadding * 2,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttons: {
    marginHorizontal: Sizes.fixPadding,
  },
});
