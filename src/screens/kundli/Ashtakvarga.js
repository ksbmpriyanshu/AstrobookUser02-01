import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';
import MyHeader from '../../components/MyHeader';
import { colors, fonts, api_url, getFontSize } from '../../config/Constants1';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as KundliActions from '../../redux/actions/KundliActions';
import { useTranslation } from 'react-i18next';
import AstvargAscendant from './ASTVARG/AstvargAscendant';

import { connect } from 'react-redux';
import AstakSun from './ASTVARG/AstakSun';
import AstakMars from './ASTVARG/AstakMars';
import AstakMoon from './ASTVARG/AstakMoon';
import AstvargVenus from './ASTVARG/AstvargVenus';
import AstvargJupiter from './ASTVARG/AstvargJupiter';
import AstvargSaturn from './ASTVARG/AstvargSaturn';
import AstvargMercury from './ASTVARG/AstvargMercury';

const { height } = Dimensions.get('screen');

const Tab = createMaterialTopTabNavigator();

const Ashtakvarga = ({ navigation, dispatch }) => {
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(KundliActions.getAstakReports())
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <MyHeader title={t('astakVarga')} navigation={navigation} />
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarLabelStyle: { fontSize: getFontSize(1.4), fontFamily: fonts.medium },
          tabBarGap: 0,
          tabBarStyle: { flex: 0 },
          tabBarItemStyle: { flex: 0, paddingHorizontal: 0, margin: 0 },
        }}>

        <Tab.Screen
          name={t("ascendant")}
          component={AstvargAscendant}
        />
        <Tab.Screen
          name={t("sun")}
          component={AstakSun}
        />
        <Tab.Screen
        name={t("mars")}
        component = {AstakMars}
        />
        <Tab.Screen
        name={t('moon')}
        component={AstakMoon}
        />
        <Tab.Screen
        name={t('jupiter')}
        component={AstvargJupiter}
        />
        <Tab.Screen
        name={t('mercury')}
        component={AstvargMercury}
        />
        <Tab.Screen
        name={t('saturn')}
        component={AstvargSaturn}
        />
        <Tab.Screen
        name={t('venus')}
        component={AstvargVenus}
        />

      </Tab.Navigator>
    </View>

  );
};


const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  isLoading: state.setting.isLoading,
  getAstakReports: state.kundli.getAstakReports

});

const mapDispatchToProps = dispatch => ({ dispatch })


export default connect(mapStateToProps, mapDispatchToProps)(Ashtakvarga);



const styles = StyleSheet.create({
  rowContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background_theme1,
  },
  rowText: {
    flex: 0.5,
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.black_color9,
    textTransform: 'capitalize',
  },
});

