import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { Modal } from 'react-native-paper';
import { connect } from 'react-redux';
import * as LiveActions from '../../../redux/actions/LiveActions';
import { Colors, Sizes, Fonts } from '../../../assets/style';
import { SCREEN_HEIGHT } from '../../../config/Screen';
import WaitingTimer from './WaitingTimer';

const WaitingList = ({ dispatch, waitingListVisible, waitListData, layout }) => {
  useEffect(() => {
  }, [dispatch]) 
  return (
    <Modal
      visible={waitingListVisible}
      onDismiss={() => dispatch(LiveActions.setWatingListVisible(false))}>
      <View style={styles.container}>
        {titleDescriptionInfo()}
        {waitListData && waitingListInfo()}
        {joinWaitingListInfo()}
      </View>
    </Modal>
  );

  function joinWaitingListInfo() {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={{ ...Fonts.white11InterMedium }}>Wait Time - 5 min</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={layout == "VEDIO_CALL"}
          onPress={() => dispatch(LiveActions.addInWaitingList())}
          style={{
            width: '60%',
            backgroundColor: layout == "VEDIO_CALL" ? Colors.grayA :  '#F0DF20',
            marginTop: Sizes.fixPadding,
            paddingVertical: Sizes.fixPadding * 0.8,
            borderRadius: 1000,
          }}>
          <Text style={{ ...Fonts.black16RobotoMedium, color: layout == "VEDIO_CALL" ? Colors.white : Colors.black, textAlign: 'center' }}>
            Join WaitList
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function waitingListInfo() {
    const getCurrentDuration = (joingtime) => {
      try {
        const date1 = new Date(joingtime).getTime()
        const date2 = new Date().getTime()
        const totalSconds = (date2 - date1) / 1000
        return parseInt(totalSconds)
      } catch (e) {
        console.log(e)
        return 0
      }

    }

    const renderItem = ({ item, index }) => {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: Colors.white,
            paddingHorizontal: Sizes.fixPadding * 0.8,
            paddingVertical: Sizes.fixPadding * 0.8,
            borderRadius: 1000,
            marginBottom: Sizes.fixPadding,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.primaryLight,
              }}>
              <Text style={{ ...Fonts.white11InterMedium }}>
                {item?.userName[0]}
              </Text>
            </View>
            <Text
              style={{
                ...Fonts.black11InterMedium,
                fontSize: 13,
                marginLeft: Sizes.fixPadding * 0.5,
                color: Colors.primaryLight,
              }}>
              {item?.userName}
            </Text>
          </View>
          <Text style={{ ...Fonts.gray11RobotoRegular }}>
            Waiting - <WaitingTimer joingTime={getCurrentDuration(item?.joingTime)} />
          </Text>
        </View>
      );
    };
    return (
      <View style={{ maxHeight: SCREEN_HEIGHT * 0.3 }}>
        <FlatList
          data={waitListData}
          renderItem={renderItem}
          initialNumToRender={5}
          ListEmptyComponent={() => (
            <View
              style={{
                height: SCREEN_HEIGHT * 0.1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ ...Fonts.white12RobotoRegular }}>
                No one is in waiting list
              </Text>
            </View>
          )}
        />
      </View>
    );
  }

  function titleDescriptionInfo() {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={{ ...Fonts.white11InterMedium, fontSize: 13 }}>
          Waiting List
        </Text>
        <Text
          style={{
            ...Fonts.white11InterMedium,
            textAlign: 'center',
            paddingVertical: Sizes.fixPadding * 0.5,
          }}>
          Customers who missed the call & were marked offline will get priority
          as per the list, if they come online
        </Text>
      </View>
    );
  }
};

const mapStateToProps = state => ({
  waitingListVisible: state.live.waitingListVisible,
  waitListData: state.live.waitListData,
  layout: state.live.layout
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(WaitingList);

const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: Colors.primaryLight,
    alignSelf: 'center',
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding * 0.6,
    paddingHorizontal: Sizes.fixPadding,
  },
});
