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


const WeeklyRashi = props => {
  const [horoscopeData] = useState(props.route.params.data);
  const [horoscopeName] = useState(props.route.params.items);
  const [isVisible, setIsVisible] = useState(false);

  const [visible, setVisible] = React.useState(false);
  const { t } = useTranslation();
 


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
   
    <View style={{ flex: 1, backgroundColor: colors.background_theme1 }}>
     
      
    </View>
   
  );
};

export default WeeklyRashi;
