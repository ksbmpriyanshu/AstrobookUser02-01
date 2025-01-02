import { View, Text, ScrollView, Image, Dimensions,StyleSheet } from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import MyHeader from '../../components/MyHeader';
import { colors, fonts } from '../../config/Constants1';
import { useState } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import RenderHtml from 'react-native-render-html';
import HTMLView from 'react-native-htmlview';
import { img_url } from '../../config/constants';
import { SCREEN_WIDTH } from '../../config/Screen';
const { width, height } = Dimensions.get('screen');

const BlogDetailes = props => {
  const { t } = useTranslation();
  const [blogData] = useState(props.route.params.blogData);
  useEffect(() => {
    props.navigation.setOptions({
      header: () => (
        <MyHeader
          title={t("blogs")}
          navigation={props.navigation}
          statusBar={{
            backgroundColor: colors.background_theme2,
            barStyle: 'light-content',
          }}
        />
      ),
    });
  }, []);

  

  // console.log(`<html><head></head><body><div style="color: black; max-width: 320px;">${blogData.description}</div></body></html>`);
  return (
    <View style={{ flex: 1, backgroundColor: colors.black_color1 }}>
      <ScrollView>
      <Image
          source={{ uri: img_url + blogData.image }}
          style={{ width: width, height: width * 0.5 }}
        />
        <View
          style={{
            flex: 0,
            width: '90%',
            alignSelf: 'center',
            marginVertical: 20,
          }}>
          <Text allowFontScaling={false}
            style={{
              fontSize: 16,
              color: colors.black_color8,
              fontFamily: fonts.bold,
            }}>
            {blogData.title}
          </Text>
          <Text allowFontScaling={false}
            style={{
              fontSize: 14,
              color: colors.black_color5,
              fontFamily: fonts.medium,
              fontStyle: 'italic',
            }}>
           Posted: {moment(blogData.createdAt).format('Do MMM YYYY hh:mm A')}
          </Text>
          <Text allowFontScaling={false}
            style={{
              fontSize: 14,
              color: colors.black_color6,
              fontFamily: fonts.medium,
            }}>
            {/* Category: {blogData.blogCategory} */}
          </Text>
          <RenderHtml
            contentWidth={SCREEN_WIDTH*0.9}
            source={{
              html: `<div style="color: black; max-width: 320px;">${blogData?.description}</div>`,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  a: {
    fontWeight: '300',
    color: '#FF3366', // make links coloured pink
  },
});

export default BlogDetailes;
