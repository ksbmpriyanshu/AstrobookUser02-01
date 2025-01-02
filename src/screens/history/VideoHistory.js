import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import { Colors, Sizes, Fonts } from '../../assets/style';
import { SCREEN_WIDTH } from '../../config/Screen';
import moment from 'moment';
import { secondsToHMS, showNumber } from '../../utils/services';
import { base_url } from '../../config/constants';
import { colors } from '../../config/Constants1';

const VideoHistory = ({videocallHistory}) => {
  if (videocallHistory === null || videocallHistory.length === 0) {
    videocallHistory = 0;
  }
console.log('video data',videocallHistory)
  const renderItem = ({ item, index }) => {
    const Videocallprice = parseInt(item?.adminPrice) + parseInt(item?.partnerPrice)
    console.log(Videocallprice)
    return (
      <View style={styles.container}>
        <Text
          style={{
            ...Fonts.primaryHelvetica,
            fontSize: 11,
            marginBottom: Sizes.fixPadding * 0.5,
            color:"#6F6F6F"
          }}>
          ID: {item?.transactionId.slice(-1 - 10)}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: base_url + item?.astrologerId?.profileImage }}
              style={{ width: '100%', height: '100%', borderRadius: 1000 }}
            />
          </View>
          <View style={{ marginLeft: Sizes.fixPadding }}>
            <Text style={{  ...Fonts.primaryHelvetica,color:"#000",fontSize:16}}>
              {item?.astrologerId?.astrologerName}
            </Text>
            <Text  style={{ ...Fonts.primaryHelvetica,color:"#363636",fontSize:12,marginTop:-6,}}>
              {item?.astrologerId?.gender}
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
            Duration: {secondsToHMS(item?.duration)}
          </Text>
          <Text
             style={styles.orderText}>
            Video Call Price: {showNumber(Videocallprice)}/min
          </Text>
          <Text
            style={styles.orderText}>
            Total Charge: {showNumber(item?.totalPrice)}
          </Text>
          <Text
             style={styles.orderText}>
            Status:<Text style={{color:"#007C34"}}> Completed</Text>
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteDark }}>
    {videocallHistory ?
      <FlatList
        data={videocallHistory}
        renderItem={renderItem}
        initialNumToRender={5}
        contentContainerStyle={{ padding: Sizes.fixPadding * 1.5 }}
      />
      : <View style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingVertical: 200 }}>
        <Text style={{ display: "flex", alignSelf: "center", justifyContent: "center", color: colors.black_color, fontSize: 15 }}>No Data Available</Text>
      </View>
    }
  </View>
  )
}
const mapStateToProps = state => ({
  videocallHistory: state.history.videocallHistory,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(VideoHistory);

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
})