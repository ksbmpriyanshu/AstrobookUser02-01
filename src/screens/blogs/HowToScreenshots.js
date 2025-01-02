import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ScrollView, Text, Dimensions, Modal, TouchableWithoutFeedback, FlatList } from 'react-native';
import { colors } from '../../config/Constants1';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MyHeader from '../../components/MyHeader';
import { api_url, how_to_images, provider_img_url } from '../../config/Constants1';
import axios from 'axios';
import { Colors, Fonts, Sizes } from '../../assets/style';
import MyLoader from '../../components/MyLoader';
const { width, height } = Dimensions.get('screen');
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { base_url } from '../../config/constants';
import RenderHTML from 'react-native-render-html';
const HowToScreenshots = ({ tutorialsImages, navigation }) => {

  const [photo, setPhoto] = useState(null);
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <MyHeader title={'Screenshots'} navigation={navigation} />
      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={<>
            {tutorialsImages && listInfo()}
          </>}
        />
      </View>
      <Modal
        visible={visible}
        transparent
      >
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={() => setVisible(false)}
          style={{
            flex: 1,
            backgroundColor: colors.black_color9 + '80',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{ alignSelf: 'flex-end', padding: 5, backgroundColor: colors.background_theme2, borderRadius: 200, margin: 20 }}>
            <AntDesign name="close" size={20} color={'white'} />
          </View>

          <View
            style={{
              width: '95%',
              backgroundColor: colors.background_theme1,
              paddingVertical: 20,
              borderRadius: 10,
            }}>

            <Image source={{ uri: photo }} style={{ height: height * 0.7, width: width * 0.9, borderRadius: 10, margin: 10 }} />

          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );

  function listInfo() {
    const renderItem = ({ item, index }) => {
      console.log(item,'all data')
      return (
        <TouchableOpacity
          onPress={() => { setPhoto(base_url + item?.image), setVisible(true) }}
          key={index} style={styles.itemContainer}>
          <Image source={{ uri: base_url + item?.image }} style={{ height: height * 0.3, width: width * 0.9, borderRadius: 10, margin: 10 }} />
          <View style={{paddingHorizontal:10}}>

          <RenderHTML
                    contentWidth={320}
                    source={{
                      html: `<div style="color: black; max-width: 320px;">${item?.description}</div>`,
                    }}
                    />
                    </View>
        </TouchableOpacity>
      )
    }

    return (
      <View>
        <FlatList
          data={tutorialsImages}
          renderItem={renderItem}
          initialNumToRender={5}
        />
      </View>
    )
  }

};

const mapStateToProps = state => ({
  tutorialsImages: state.blogs.tutorialsImages
})

export default connect(mapStateToProps, null)(HowToScreenshots);

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
