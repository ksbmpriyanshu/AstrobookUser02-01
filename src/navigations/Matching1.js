
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';


import {useEffect} from 'react';
import {colors, fonts} from '../config/Constants1';

import MyHeader from '../components/MyHeader';
import OpenMatching from '../screens/customer/OpenMatching';
import { useTranslation } from 'react-i18next';
import NewMatching from '../screens/kundli/NewMatching';
import NewMatching1 from '../screens/kundli/Match/NewMatching1';
import OpenMatching1 from '../screens/kundli/Match/OpenMatching1';

const Tab = createMaterialTopTabNavigator();

const Matching1 = props => {
  
  const {t} = useTranslation();
  useEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
      header: () => (
        <MyHeader
          title={t("matching")}
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
      <Tab.Screen name="openMatching" component={OpenMatching1} />
      <Tab.Screen name="newMatching" component={NewMatching1} />
    </Tab.Navigator>
  );
};

export default Matching1;
