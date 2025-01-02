import { View, FlatList, Text, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useEffect,useRef } from 'react';
import MyHeader from '../../components/MyHeader';
import { colors, fonts,getFontSize } from '../../config/Constants1';
import { useState } from 'react';
import { sign_data } from '../../config/data';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";
import AntDesign from 'react-native-vector-icons/AntDesign';
const { width, height } = Dimensions.get('screen');
import { Button, Menu, Divider, PaperProvider } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { captureRef } from 'react-native-view-shot';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import DailyRashi from './horoscope/daily';
import WeeklyRashi from './horoscope/weekly';

const Tab = createMaterialTopTabNavigator();


const ShowHoroscope = props => {
  const {t} = useTranslation();
  
 
  console.log(props?.route?.params?.data,'asdfasdf111')

  useEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
      header: () => (
        
        <MyHeader
          title="Horoscope"
          navigation={props.navigation}
          statusBar={{
            backgroundColor: colors.background_theme2,
            barStyle: 'light-content',
          }}
        />
      ),
    });
  }, []);



  

 


  
  return (
    <PaperProvider>
    <View style={{ flex: 1, backgroundColor: colors.background_theme1 }} >
      
     
        <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarLabelStyle: { fontSize: getFontSize(1.5), fontFamily: fonts.medium },
          tabBarGap: 0,
          tabBarStyle: { flex: 0 },
          tabBarItemStyle: { flex: 0, paddingHorizontal: 0, margin: 0 },
        }}
      >
       
        <Tab.Screen name={t("daily1")} component={DailyRashi} initialParams={{
          navigation: props.navigation,
          data: props?.route?.params?.data, 
        }}
        />
       <Tab.Screen name={t("weekly")} component={WeeklyRashi} initialParams={{
          navigation: props.navigation,
          data: props?.route?.params?.data, 
        }}
        />
        
      </Tab.Navigator>
      
      
    </View>
    </PaperProvider>
  );
};

export default ShowHoroscope;
