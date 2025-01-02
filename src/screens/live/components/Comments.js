import {View, Text, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../config/Screen';
import {Colors, Sizes, Fonts} from '../../../assets/style';
import MaskedView from './masked/maskedView';
import MaskedElement from './masked/maskElement';

const Comments = ({commentsData}) => {
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.nameContainer}>
          <Text style={{...Fonts.black14InterMedium}}>
            {item?.fromUser?.userName[0]}
          </Text>
        </View>
        <View style={styles.messageContainer}>
        <Text style={{...Fonts.white18RobotBold, fontSize: 13}}>
            {item?.fromUser?.userName}
          </Text>
          <Text style={{...Fonts.white11InterMedium, width:SCREEN_WIDTH*0.4}}>{item.message}</Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        height: SCREEN_HEIGHT * 0.4,
        transform: [{scaleY: -1}],
      }}>
      <MaskedView element={<MaskedElement />}>
        <FlatList
          data={commentsData}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          contentContainerStyle={{
            padding: Sizes.fixPadding * 0.5,
          }}
        />
      </MaskedView>
    </View>
  );
};

const mapStateToProps = state => ({
  commentsData: state.live.commentsData,
});

export default connect(mapStateToProps, null)(Comments);

const styles = StyleSheet.create({
  itemContainer: {
    transform: [{scaleY: -1}],
    flexDirection: 'row',
    marginBottom: Sizes.fixPadding * 0.5,
  },
  nameContainer: {
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    marginLeft: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding * 0.2,
    borderRadius: Sizes.fixPadding * 0.5,
  },
});
