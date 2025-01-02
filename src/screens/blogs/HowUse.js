import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import { colors, fonts, getFontSize } from '../../config/Constants1';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import MyHeader from '../../components/MyHeader';
import { connect } from 'react-redux';
import * as BlogActions from '../../redux/actions/BlogActions'

const HowUse = ({ navigation, dispatch }) => {
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(BlogActions.getTutorials())
  }, [dispatch])

  return (
    <View style={{ flex: 1, backgroundColor: colors.background_theme1, }}>
      <MyHeader title={'How to use app'} navigation={navigation} />
      <ImageBackground 
      resizeMode='cover'
      source={require('../../assets/images/how_use_app_background.png')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flex: 0, width: '93%', alignSelf: 'center', padding: 15, borderRadius: 10 }}>
          <TouchableOpacity onPress={() => navigation.navigate('HowToScreenshots')}>
            <View style={{ flex: 0, flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 15, backgroundColor: colors.background_theme1, borderWidth: 1, borderRadius: 10, borderColor: colors.black_color8, marginBottom: 15 }}>
              <MaterialCommunityIcons name='file-image' color={colors.black_color8} size={getFontSize(2.8)} />
              <Text allowFontScaling={false} style={{ fontSize: getFontSize(1.7), color: colors.black_color8, fontFamily: fonts.medium, marginLeft: 10 }}>{t("screenshots")}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('HowToVideo')}>
            <View style={{ flex: 0, flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 15, backgroundColor: colors.background_theme1, borderWidth: 1, borderRadius: 10, borderColor: colors.black_color8, }}>
              <MaterialCommunityIcons name='file-video' color={colors.black_color8} size={getFontSize(2.8)} />
              <Text allowFontScaling={false} style={{ fontSize: getFontSize(1.7), color: colors.black_color8, fontFamily: fonts.medium, marginLeft: 10 }}>{t("app_video")}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>

    </View>
  )
}

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(null, mapDispatchToProps)(HowUse) 