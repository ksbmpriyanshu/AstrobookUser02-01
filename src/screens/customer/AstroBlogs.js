import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import MyStatusBar from '../../components/MyStatusbar';
import { api_url, base_url, blog, colors, fonts } from '../../config/Constants1';
import { useEffect } from 'react';
import HomeHeader from '../../components/HomeHeader';
import { useState } from 'react';
import axios from 'axios';
import MyLoader from '../../components/MyLoader';
import moment from 'moment/moment';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';
import * as BlogActions from '../../redux/actions/BlogActions'
import { connect } from 'react-redux';
import { Sizes } from '../../assets/style';
import { img_url } from '../../config/constants';
import MyHeader from '../../components/MyHeader';

const { width, height } = Dimensions.get('screen');

const AstroBlogs = ({ navigation, dispatch, astroBlogData ,}) => {
  console.log(astroBlogData)
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    dispatch(BlogActions.getAstroBlogs())
  }, [dispatch]);

  console.log(astroBlogData,'asdf')


  return (
    <View style={{ flex: 1, backgroundColor: colors.black_color1 }}>
      <MyStatusBar
        backgroundColor={colors.background_theme2}
        barStyle="light-content"
      />
      {/* <HomeHeader navigation={navigation} /> */}
      <MyHeader title={'Blogs'} navigation={navigation} />
      <MyLoader isVisible={isLoading} />
      <FlatList ListHeaderComponent={<>
        {astroBlogData && listInfo()}
      </>}
        contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding }}
      />
    </View>
  );

  function listInfo() {
    const renderItem = ({ item, index }) => {
      console.log(item,'blogs')
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('blogDetailes', {
              blogData: item,
            })
          }
          style={{
            flex: 0,
            flexDirection: 'row',
            backgroundColor: colors.background_theme1,
            shadowColor: colors.black_color2,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.3,
            marginBottom: 20,
            marginTop: 10,
            borderWidth: 1,
            borderColor: colors.background_theme2,
            borderRadius: 10,
            overflow: 'hidden'
          }}>
          <Image
            source={{ uri: img_url + item?.image }}
            style={{ width: width*  0.25, height: width * 0.25, resizeMode: 'stretch' }}
          />
          <View style={{ flex: 1, paddingHorizontal: 10, paddingTop: 5 }}>
            <Text allowFontScaling={false}
              style={{
                fontSize: 16,
                color: colors.black_color8,
                fontFamily: fonts.bold,
              }}>
              {item.title}
            </Text>
            <Text allowFontScaling={false}
              style={{
                fontSize: 14,
                color: colors.black_color5,
                fontFamily: fonts.medium,
                fontStyle: 'italic',
              }}>
              Posted:{' '}
              {moment(item.createdAt).format('Do MMM YYYY hh:mm A')}
            </Text>
            <Text allowFontScaling={false}
              style={{
                fontSize: 14,
                color: colors.black_color6,
                fontFamily: fonts.medium,
              }}>
              {/* Category: {item.blogCategory} */}
            </Text>
          </View>
        </TouchableOpacity>
      )
    }
    return (
      <View>
        <FlatList data={astroBlogData} renderItem={renderItem} initialNumToRender={5} />
      </View>
    )
  }

};

const mapStateToProps = state => ({
  astroBlogData: state.blogs.astroBlogData
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(AstroBlogs);

const styles = StyleSheet.create({
  noContentContainer: {
    flex: 0,
    height: height * 0.15,
    backgroundColor: colors.background_theme1,
    borderRadius: 10,
    borderColor: colors.black_color6,
    borderWidth: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    width: width * 0.16,
    height: width * 0.16,
    resizeMode: 'cover',
    borderRadius: 1000,
  },
});
