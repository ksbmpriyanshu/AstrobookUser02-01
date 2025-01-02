import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';
import React from 'react';
import {colors, fonts,getFontSize} from '../../../config/Constants1';
import {useState} from 'react';
import MyLoader from '../../../components/MyLoader';
import SvgSimmer from '../../../components/SvgSimmer';
import { SvgUri,SvgCssUri, SvgWithCss } from 'react-native-svg/css';
import { WebView } from 'react-native-webview';
import { useTranslation } from 'react-i18next';



const {width, height} = Dimensions.get('screen');

const ChartComponent = ({svg,png, title, planetData}) => {
  const [planet] = useState(planetData.planets_assoc);
  const [nakshatra] = useState(planetData.planets_details);
  const [isPlanet, setIsPlanet] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  
  const {t} = useTranslation();
  return (
    <View style={{flex: 1,backgroundColor:colors.white_color}}>
      
       
        
           {png && (
          <SvgWithCss xml={png} width={350} height={350} />
      //       <WebView
      //   source={{ html: png }}
      //   javaScriptEnabled={false}
      //   domStorageEnabled={false}
      //   scalesPageToFit={true}
      //   style={styles.webview}
      // />
           )} 
   
    </View>
  );
};

export default ChartComponent;

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    width:getFontSize(110),
    
  },
 
  
});
