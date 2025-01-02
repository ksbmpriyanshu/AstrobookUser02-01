import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useEffect,useRef} from 'react';
import MyHeader from '../../components/MyHeader';
import {colors, fonts,getFontSize} from '../../config/Constants1';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';
const Setting = props => {
  const {t} = useTranslation();
  useEffect(() => {
    props.navigation.setOptions({
      header: () => (
        <MyHeader
          title={t("setting")}
          navigation={props.navigation}
          statusBar={{
            backgroundColor: colors.background_theme2,
            barStyle: 'light-content',
          }}
        />
      ),
    });
  }, []);

  const viewRefs = useRef([]);

  return (
    <View style={{flex: 1, backgroundColor: colors.black_color1}} ref={ref => viewRefs.current[0] = ref}>
      <View style={{flex: 1, alignItems: 'center',paddingTop:20}}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={()=>props.navigation.navigate('customerAccount')}
          style={{
            width: '90%',
            paddingVertical:12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            backgroundColor: colors.background_theme1,
            borderRadius: 10,
            // height: getFontSize(9),
            // shadowColor: colors.black_color5,
            // shadowOffset: {width: 1, height: 2},
            // shadowOpacity: 0.1,
            // shadowRadius: 5,
            
          }}>
          <MaterialCommunityIcons
            name="card-account-details"
            color={colors.background_theme2}
            size={getFontSize(3)}
          />
          <Text allowFontScaling={false}
            style={{
              flex: 0.7,
              fontSize: getFontSize(1.8),
              color: colors.black_color8,
              fontFamily: fonts.semi_bold,
            }}>
            {t("update_your")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={()=>props.navigation.navigate('language')}
          style={{
            width: '90%',
            marginTop:20,
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical:12,
            justifyContent: 'space-around',
            backgroundColor: colors.background_theme1,
            borderRadius: 10,
            // height: getFontSize(6),
            // shadowColor: colors.black_color5,
            // shadowOffset: {width: 1, height: 2},
            // shadowOpacity: 0.1,
            // shadowRadius: 5,
          }}>
          <FontAwesome
            name="language"
            color={colors.background_theme2}
            size={getFontSize(3)}
          />
          <Text allowFontScaling={false}
            style={{
              flex: 0.7,
              fontSize: getFontSize(1.9),
              color: colors.black_color8,
              fontFamily: fonts.semi_bold,
            }}>
            {t("ln")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Setting;
