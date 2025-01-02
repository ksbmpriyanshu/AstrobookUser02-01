import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ScrollView, Text, Dimensions, Linking, FlatList } from 'react-native';
import { colors } from '../../config/Constants1';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MyHeader from '../../components/MyHeader';
import { api_url, howtousevideos, provider_img_url } from '../../config/Constants1';
import axios from 'axios';
import MyLoader from '../../components/MyLoader';
const { width, height } = Dimensions.get('screen');
import { useTranslation } from 'react-i18next';
import YoutubePlayer from "react-native-youtube-iframe";
import { Colors, Sizes } from '../../assets/style';
import { connect } from 'react-redux';
import { SCREEN_WIDTH } from '../../config/Screen';


const HowToVideo = ({ navigation, tutorialsVedio }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <MyHeader title={'Video Tutorials'} navigation={navigation} />
      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={<>
            {tutorialsVedio && listInfo()}
          </>}
        />
      </View>
    </View>
  );

  function listInfo() {

    const renderItem = ({ item, index }) => {
      return (
        <View style={{ marginBottom: Sizes.fixPadding }}>
          <YoutubePlayer
            height={SCREEN_WIDTH * 0.6}
            width={SCREEN_WIDTH}
            // play={playing}
            videoId={item?.link}
          // onChangeState={onStateChange}
          />

        </View>

      )
    }

    return (
      <View>
        <FlatList
          data={tutorialsVedio}
          renderItem={renderItem}
          initialNumToRender={5}
        />
      </View>
    )
  }

};

const mapStateToProps = state => ({
  tutorialsVedio: state.blogs.tutorialsVedio
})

export default connect(mapStateToProps, null)(HowToVideo);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bodyColor
  },
  video: {
    width: 300,
    height: 200,
  },
  itemContainer: {
    backgroundColor: 'white',
    marginBottom: 8,
    borderRadius: 10,
    elevation: 2,
    margin: 10
  },
});
