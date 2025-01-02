import { View, FlatList, Text, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useEffect,useRef } from 'react';
import MyHeader from '../../../components/MyHeader';
import { colors, fonts,getFontSize } from '../../../config/Constants1';
import { useState } from 'react';
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
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';
import { Colors } from '../../../assets/style';


const DailyRashi = props => {
  const [horoscopeData] = useState(props.route.params.data);
  const [horoscopeName] = useState(props.route.params.items);
  const [isVisible, setIsVisible] = useState(false);

  const [visible, setVisible] = React.useState(false);
  const { t } = useTranslation();
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);


  useEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
      header: () => (
        
        <MyHeader
          title={props?.route?.params?.horoscope}
          navigation={props.navigation}
          statusBar={{
            backgroundColor: colors.background_theme2,
            barStyle: 'light-content',
          }}
        />
      ),
    });
  }, []);

 
 

  console.log(props?.route?.params?.horoscope,'adsfasdfasdfe3232323')

 

  

  return (
   <ScrollView >
    <View style={{backgroundColor:'#fafdf6', width:SCREEN_WIDTH*0.9,alignSelf:'center'}}>
      <Text style={{color:'black', fontWeight:'bold', marginVertical:5, fontSize:18}}>Emotions</Text>
      <Text style={{color:Colors.black, marginHorizontal:7, fontSize:16}}>
        {props?.route?.params?.data?.emotions}
      </Text>
      <Text style={{color:'black', fontWeight:'bold', marginVertical:5, fontSize:18}}>Health</Text>
      <Text style={{color:Colors.black, marginHorizontal:7, fontSize:16}}>
        {props?.route?.params?.data?.health}
      </Text>
      <Text style={{color:'black', fontWeight:'bold', marginVertical:5, fontSize:18}}>Luck</Text>
       <Text style={{color:Colors.black, marginHorizontal:7, fontSize:16}}>
        {props?.route?.params?.data?.luck}
      </Text>
      <Text style={{color:'black', fontWeight:'bold', marginVertical:5, fontSize:18}}>Personal Life</Text>
       <Text style={{color:Colors.black, marginHorizontal:7, fontSize:16}}>
        {props?.route?.params?.data?.personal_life}
      </Text>
      <Text style={{color:'black', fontWeight:'bold', marginVertical:5, fontSize:18}}>Profession</Text>
       <Text style={{color:Colors.black, marginHorizontal:7, fontSize:16}}>
        {props?.route?.params?.data?.profession}
      </Text>
      <Text style={{color:'black', fontWeight:'bold', marginVertical:5, fontSize:18}}>Travel</Text>
       <Text style={{color:Colors.black, marginHorizontal:7, fontSize:16}}>
        {props?.route?.params?.data?.travel}
      </Text>
      </View>
   </ScrollView>
  );
};

export default DailyRashi;
