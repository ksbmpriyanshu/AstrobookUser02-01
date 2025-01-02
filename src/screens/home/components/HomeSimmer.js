import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {Skeleton} from '@rneui/themed';
import {connect} from 'react-redux';
import {Sizes} from '../../../assets/style';
import {SCREEN_WIDTH} from '../../../config/Screen';

const HomeSimmer = ({homeSimmer}) => {
  return (
    <View style={{margin: Sizes.fixPadding}}>
      <Skeleton
        animation="pulse"
        width={'100%'}
        height={SCREEN_WIDTH * 0.4}
        style={{borderRadius: Sizes.fixPadding}}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: Sizes.fixPadding * 1.5,
        }}>
        <Skeleton
          animation="pulse"
          width={'30%'}
          height={SCREEN_WIDTH * 0.3}
          style={{borderRadius: Sizes.fixPadding}}
        />
        <Skeleton
          animation="pulse"
          width={'30%'}
          height={SCREEN_WIDTH * 0.3}
          style={{borderRadius: Sizes.fixPadding}}
        />
        <Skeleton
          animation="pulse"
          width={'30%'}
          height={SCREEN_WIDTH * 0.3}
          style={{borderRadius: Sizes.fixPadding}}
        />
      </View>
      <Skeleton
        animation="pulse"
        width={'100%'}
        height={Sizes.fixPadding * 2}
        style={{borderRadius: Sizes.fixPadding}}
      />
      <FlatList
        horizontal
        data={[1, 2, 3, 4]}
        contentContainerStyle={{marginVertical: Sizes.fixPadding*1.5}}
        renderItem={() => {
          return (
            <Skeleton
              animation="pulse"
              width={SCREEN_WIDTH*0.4}
              height={SCREEN_WIDTH * 0.4}
              style={{borderRadius: Sizes.fixPadding, marginRight: Sizes.fixPadding*2}}
            />
          );
        }}
      />
        <Skeleton
        animation="pulse"
        width={'100%'}
        height={Sizes.fixPadding * 2}
        style={{borderRadius: Sizes.fixPadding}}
      />
      <FlatList
        horizontal
        data={[1, 2, 3, 4]}
        contentContainerStyle={{marginVertical: Sizes.fixPadding*1.5}}
        renderItem={() => {
          return (
            <Skeleton
              animation="pulse"
              width={SCREEN_WIDTH*0.4}
              height={SCREEN_WIDTH * 0.4}
              style={{borderRadius: Sizes.fixPadding, marginRight: Sizes.fixPadding*2}}
            />
          );
        }}
      />
    </View>
  );
};

const mapStateToProps = state => ({
  homeSimmer: state.home.homeSimmer,
});

export default connect(mapStateToProps, null)(HomeSimmer);
