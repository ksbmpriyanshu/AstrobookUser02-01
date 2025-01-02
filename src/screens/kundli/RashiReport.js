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

import { useTranslation } from 'react-i18next';
import MoonRashi from './RashiReport/moon';
import MarsRashi from './RashiReport/mars';
import MercuryRashi from './RashiReport/mercury';
import JupiterRashi from './RashiReport/jupiter';
import VenusRashi from './RashiReport/venus';

const { height } = Dimensions.get('screen');
const Tab = createMaterialTopTabNavigator();

const RashiReport = props => {

  const { t } = useTranslation();





  return (
    <View style={{ flex: 1 }}>
            <MyHeader title={t('Rashi_Report')} navigation={props.navigation} />
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarLabelStyle: { fontSize: getFontSize(1.4), fontFamily: fonts.medium },
          tabBarGap: 0,
          tabBarStyle: { flex: 0 },
          tabBarItemStyle: { flex: 0, paddingHorizontal: 0, margin: 0 },
        }}>

        <Tab.Screen
          name={t("moon1")}
          component={MoonRashi}
          initialParams={{ data: props.route?.params?.data }}
        />
        <Tab.Screen
          name={t("mars1")}
          component={MarsRashi}
          initialParams={{ data: props.route?.params?.data }}
        />
        <Tab.Screen
          name={t("mercury1")}
          component={MercuryRashi}
          initialParams={{ data: props.route?.params?.data }}
        />
        <Tab.Screen
          name={t("jupiter1")}
          component={JupiterRashi}
          initialParams={{ data: props.route?.params?.data }}
        />
        <Tab.Screen
          name={t("venus1")}
          component={VenusRashi}
          initialParams={{ data: props.route?.params?.data }}
        />
        {/* <Tab.Screen
          name={t("rahu1")}
          component={RahuRashi}
          initialParams={{ data: props.route?.params?.data }}
        />
        <Tab.Screen
          name={t("ketu1")}
          component={KetuRashi}
          initialParams={{ data: props.route?.params?.data }}
        /> */}
      </Tab.Navigator>
    </View>



  );
};

export default RashiReport;

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

