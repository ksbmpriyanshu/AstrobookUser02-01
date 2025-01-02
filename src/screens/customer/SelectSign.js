import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
  Alert
} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import MyHeader from '../../components/MyHeader';
import {api_url, colors, fonts, get_rashi_report} from '../../config/Constants1';
import SignData, { signData } from '../../config/data';
import {useState} from 'react';
import axios from 'axios';
import MyLoader from '../../components/MyLoader';
import { useTranslation } from 'react-i18next';
import { horoscopename } from '../../config/apiService';

const {width, height} = Dimensions.get('screen');

const SelectSign = props => {
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    props.navigation.setOptions({
      header: () => (
        <MyHeader
          title={t('select_your_sign')}
          navigation={props.navigation}
          statusBar={{
            backgroundColor: colors.background_theme2,
            barStyle: 'light-content',
          }}
        />
      ),
    });
  }, []);

 

  const get_horoscope_data = async (horoscope,images) => {
    let data;

    switch (horoscope) {
      case "मेष राशि":
        data = "Aries";
        break;
      case "वृषभ राशि":
        data = "Taurus";
        break;
      case "मिथुन राशि":
        data = "Gemini";
        break;
      case "कर्क राशि":
        data = "Cancer";
        break;
      case "सिंह राशि":
        data = "Leo";
        break;
      case "कन्या राशि":
        data = "Virgo";
        break;
      case "तुला राशि":
        data = "Libra";
        break;
      case "वृश्चिक राशि":
        data = "Scorpio";
        break;
      case "धनु राशि":
        data = "Sagittarius";
        break;
      case "मकर राशि":
        data = "Capricorn";
        break;
      case "कुंभ राशि":
        data = "Aquarius";
        break;
      case "मीन राशि":
        data = "Pisces";
        break;
      default:
        data = horoscope;
    }
    
   const response = await horoscopename({timezone: 5.5},data)
        console.log('hoo',response);
        props.navigation.navigate('dailyhoro', {data: response?.prediction,items: images,horoscope});
  };
  

  return (
    <View style={{flex: 1, backgroundColor: colors.black_color1}}>
      <MyLoader isVisible={isLoading} />
      <View
        style={{
          flex: 1,
          width: '95%',
          alignSelf: 'center',
          marginVertical: 20,
        }}>
        <FlatList
        data={signData()} // Call the signData function to retrieve the array
        keyExtractor={item => item.id.toString()} // Ensure key is string
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => get_horoscope_data(item.text.toLocaleLowerCase(), item.img)} style={styles.button}>
            <Image source={item.img} style={styles.imgage} />
            <Text allowFontScaling={false} style={styles.text}>{item.text}</Text>
          </TouchableOpacity>
        )}
      />
      </View>
    </View>
  );
};

export default SelectSign;

const styles = StyleSheet.create({
  button: {
    width: width * 0.28,
    height: width * 0.28,
    backgroundColor: colors.background_theme1,
    margin: width * 0.018,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: colors.black_color2,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  imgage: {
    width: width * 0.15,
    height: width * 0.15,
    resizeMode: 'contain',
    
  },
  text: {
    fontSize: 14,
    color: colors.black_color6,
    fontFamily: fonts.semi_bold,
  },
});
