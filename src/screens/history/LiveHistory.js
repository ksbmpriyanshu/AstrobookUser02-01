import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import { Colors, Sizes, Fonts } from '../../assets/style';
import { SCREEN_WIDTH } from '../../config/Screen';
import moment from 'moment';
import { secondsToHMS, showNumber } from '../../utils/services';
import { base_url } from '../../config/constants';
import { colors } from '../../config/Constants1';

const LiveHistory = ({ liveVedioCallHistoryData }) => {
  console.log("liveVedioCallHistoryData",liveVedioCallHistoryData)
  if (liveVedioCallHistoryData === null || liveVedioCallHistoryData.length === 0) {
    liveVedioCallHistoryData = 0;
  }

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.container}>
        <Text
          style={{
            ...Fonts.primaryHelvetica,
            fontSize: 11,
            marginBottom: Sizes.fixPadding * 0.5,
            color:"#6F6F6F"
          }}>
          ID: {item?.streamId}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: base_url + item?.roomId?.astrologerId?.profileImage,
              }}
              style={{ width: '100%', height: '100%', borderRadius: 1000 }}
            />
          </View>
          <View style={{ marginLeft: Sizes.fixPadding }}>
            <Text style={{  ...Fonts.primaryHelvetica,color:"#000",fontSize:16}}>
              {item?.roomId?.astrologerId?.astrologerName}
            </Text>
            <Text  style={{ ...Fonts.primaryHelvetica,color:"#363636",fontSize:12,marginTop:-6,}}>
              {item?.roomId?.astrologerId?.gender}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: Sizes.fixPadding }}>
          <Text
            style={styles.orderText}>
            Order Time: {moment(item?.createdAt).format('DD MMM YYYY hh:mm A')}
          </Text>
          <Text
             style={styles.orderText}>
            Duration: {secondsToHMS(item?.durationInSeconds)}
          </Text>
          <Text
              style={styles.orderText}>
            Live Call Price: {showNumber(item?.roomId?.vedioCallPrice)}/min
          </Text>
          <Text
             style={styles.orderText}>
            Total Charge: {showNumber(item?.amount)}
          </Text>
          <Text
            style={styles.orderText}>
            Status: {item?.status}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteDark }}>
      {liveVedioCallHistoryData ?
        <FlatList
          data={liveVedioCallHistoryData}
          renderItem={renderItem}
          initialNumToRender={5}
          contentContainerStyle={{ padding: Sizes.fixPadding * 1.5 }}
        />
        : <View style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingVertical: 200 }}>
          <Text style={{ display: "flex", alignSelf: "center", justifyContent: "center", color: colors.black_color, fontSize: 15 }}>No Data Available</Text>
        </View>
      }
    </View>
  );
};

const mapStateToProps = state => ({
  liveVedioCallHistoryData: state.history.liveVedioCallHistoryData,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(LiveHistory);

const styles = StyleSheet.create({
  container: {
    marginBottom: Sizes.fixPadding * 1.5,
    backgroundColor: "#fff",
    borderRadius: Sizes.fixPadding * 0.7,
    paddingHorizontal: Sizes.fixPadding * 0.7,
    paddingVertical: Sizes.fixPadding,
    borderWidth:0.5,
    borderColor:'#b7b7b7'
  },
  imageContainer: {
    width: SCREEN_WIDTH * 0.16,
    height: SCREEN_WIDTH * 0.16,
    borderRadius: 1000,
    overflow: 'hidden',
  },
  orderText:{
    ...Fonts.primaryHelvetica,color:"#333333",fontSize:13 ,lineHeight:17,
  }
});
