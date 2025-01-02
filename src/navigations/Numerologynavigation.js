import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {useEffect} from 'react';
import {colors, fonts} from '../config/Constants1';
import MyStatusBar from '../components/MyStatusbar';
import OpenNumerlogy from '../screens/kundli/OpenNumerlogy';
import Numerology from '../screens/kundli/Numerology';

import MyHeader from '../components/MyHeader';

import { useTranslation } from 'react-i18next';


const Tab = createMaterialTopTabNavigator();

const Numerologynavigation = props => {
  
  const {t} = useTranslation();
  useEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
      header: () => (
        <MyHeader
          title={t("Numerology")}
          navigation={props.navigation}
          statusBar={{
            backgroundColor: colors.background_theme2,
            barStyle: 'light-content',
          }}
        />
      ),    });
  }, []);
  return (
    <Tab.Navigator>
      <Tab.Screen name="Numerology" component={Numerology} />
      <Tab.Screen name="openNumerology" component={OpenNumerlogy} />
    </Tab.Navigator>
  );
};

export default Numerologynavigation;
