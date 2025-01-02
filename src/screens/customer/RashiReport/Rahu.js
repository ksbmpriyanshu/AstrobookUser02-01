import {
    View,
    Text,
    ScrollView,
    Dimensions,
    Image,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import { api_astrolist1, api_url, colors, fonts, get_astro_details,getFontSize } from '../../../config/Constants1';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import { getBirthChart } from '../../../config/apiService';
import MyLoader from '../../../components/MyLoader';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
const { width, height } = Dimensions.get('screen');
import RenderHTML from 'react-native-render-html';
const RahuRashi = props => {
    // console.log('pppp', props?.route?.params?.data);
    const [isLoading, setIsLoading] = useState(false);
    const[dat,setdata] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        props.navigation.setOptions({

        });
    }, []);

    const [randomNumber, setRandomNumber] = useState(null);

   
      const dob = props?.route?.params?.data?.dob;
      const tob = props?.route?.params?.data?.tob;
      const birthDate = new Date(dob);
    
    // Extract day, month, and year
      const day = birthDate.getDate(); // 29
      const month = birthDate.getMonth() + 1; // Months are zero-based, so add 1
      const year = birthDate.getFullYear();
    
      
      const [hours, minutes, seconds] = tob.split(":").map(Number);
    
    
    
      useEffect(() => {
        const fetchData = async () => {
          
          const data = {
            day: day,
            month: month,
            year: year,
            hour: hours,
            min: minutes,
            lat: props?.route?.params?.data?.latitude,
            lon: props?.route?.params?.data?.longitude,
            tzone: 5.5,
            
          };

          console.log(data);
    
          try {
            const chartData = await getBirthChart(data);
            
                const targetPlanetSmall = "Ra ";
                // console.log(chartData);
                

                const foundIndex = chartData.findIndex(sign => sign.planet_small.includes(targetPlanetSmall));

                if (foundIndex !== -1) {
                    console.log("Index of array with 'Ra':", foundIndex);
                    setdata(foundIndex);
                    console.log("Found sign:", chartData[foundIndex].sign_name);
                    console.log("Associated planet:", chartData[foundIndex].planet.join(", "));
                } else {
                    console.log("No sign found with the specified planet_small value.");
                }

                
            
          } catch (error) {
            console.error('Error:', error);
            
          }
        };
    
        fetchData();
      }, []); 

    const renderContent = () => {
        const numbner = dat + 1;
        switch (numbner) {
            case 1:
                return <Text allowFontScaling={false}>{t("rahu_rashi_1")}</Text>;
            case 2:
                return <Text allowFontScaling={false}>{t("rahu_rashi_2")}</Text>;
            case 3:
                return <Text allowFontScaling={false}>{t("rahu_rashi_3")}</Text>;
            case 4:
                return <Text allowFontScaling={false}>{t("rahu_rashi_4")}</Text>;
            case 5:
                return <Text allowFontScaling={false}>{t("rahu_rashi_5")}</Text>;
            case 6:
                return <Text allowFontScaling={false}>{t("rahu_rashi_6")}</Text>;
            case 7:
                return <Text allowFontScaling={false}>{t("rahu_rashi_7")}</Text>;
            case 8:
                return <Text allowFontScaling={false}>{t("rahu_rashi_8")}</Text>;
            case 9:
                return <Text allowFontScaling={false}>{t("rahu_rashi_9")}</Text>;
            case 10:
                return <Text allowFontScaling={false}>{t("rahu_rashi_10")}</Text>;
            case 11:
                return <Text allowFontScaling={false}>{t("rahu_rashi_11")}</Text>;
            case 12:
                return <Text allowFontScaling={false}>{t("rahu_rashi_12")}</Text>;
            // Add cases for 3 through 12 as needed
            default:
                return <Text allowFontScaling={false}>No content for this case</Text>;
        }
    };



    return (
        <View style={{ flex: 1, backgroundColor: colors.black_color1 }}>
            <MyLoader isVisible={isLoading} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        flex: 0,
                        width: '95%',
                        alignSelf: 'center',
                        backgroundColor: '#fafdf6',
                        marginVertical: 10,
                        borderRadius: 15,
                        shadowColor: colors.black_color5,
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.3,
                        shadowRadius: 5,
                        elevation: 6
                    }}>

                    <View style={styles.itemContainer}>
                        <Text allowFontScaling={false} style={styles.itemText}>{t("rahu")}</Text>
                        <View>
                            <Text allowFontScaling={false} style={{ color: 'black', padding: 10, fontSize: getFontSize(1.8), textAlign: 'justify' }}>
                                {renderContent()}
                            </Text>
                        </View>
                    </View>




                </View>

            </ScrollView>
        </View>
    );
};

export default RahuRashi;

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,

        alignItems: 'center',
        padding: 15,
        alignSelf: 'center'
    },
    itemText: {

        fontSize: getFontSize(1.8),
        color: 'red',
        fontFamily: fonts.medium,
        fontWeight: 'bold',
        textAlign: 'center'
    },
});
