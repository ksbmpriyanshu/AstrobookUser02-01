import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useEffect } from 'react';
import { colors, fonts } from '../../config/Constants1';
import MyStatusBar from '../../components/MyStatusbar';
import Home from './Home';
import Year from './Year';
import MyHeader from '../../components/MyHeader';
import HomeHeader from '../../components/HomeHeader';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

const Tab = createMaterialTopTabNavigator();

const Hometab = props => {
  const { t } = useTranslation()

  useEffect(()=>{},[props.homeSimmer])

  return (
    <View style={{flex: 1}}>
      <MyStatusBar
        backgroundColor={colors.background_theme2}
        barStyle="light-content"
      />
      <HomeHeader navigation={props.navigation} />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 13, fontFamily: fonts.medium },
          tabBarGap: 1,
          backgroundColor: 'rgba(34,36,40,1)',
          tabBarStyle: { flex: 0 },
          tabBarItemStyle: { flex: 0, paddingHorizontal: 0, margin: 0 },
          style: {
            elevation: 0,   // for Android

          }, 
          indicatorStyle: {
            width: 0, height: 0, elevation: 0,
          }
        }}

      >
        <Tab.Screen allowFontScaling={false} name={t("home")} component={Home} />
        <Tab.Screen allowFontScaling={false} name={t("astro_companion")} component={Year} />
      </Tab.Navigator>
    </View>

  );
};

const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  wallet: state.customer.wallet,
  notificationData: state.customer.notificationData,
  firebaseId: state.customer.firebaseId,
  homeSimmer: state.home.homeSimmer,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Hometab);


