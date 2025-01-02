import {View, Text} from 'react-native';
import React from 'react';
import ChartComponent from './ChartComponent';
import {useState} from 'react';
import {useEffect} from 'react';
import axios from 'axios';
import { getChart } from '../../../config/apiService';
import MyLoader from '../../../components/MyLoader';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
const Sun = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState(null);
  const {t} = useTranslation();
  // useFocusEffect(
  //   React.useCallback(() => {
  //     test();
  //   }, [])
  // );

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
      const chartId = 'SUN';
      const data = {
        day: day,
        month: month,
        year: year,
        hour: hours,
        min: minutes,
        lat: props?.route?.params?.data?.latitude,
        lon: props?.route?.params?.data?.longitude,
        tzone: 5.5,
        lineColor:'#f4a261',
        signColor:"#fb8500",
        planetColor:'#ddd'
      };

      const header = {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language':t("lang")
        },
      }

      try {
        const chartData = await getChart(chartId, data,header);
        
        // Replace all <path> elements with the specified 'd' attribute
        const modifiedChartData = chartData.svg.replace(/<path[^>]*d="M340,175L340,340L257.5,257.5"[^>]*><\/path>/g, '');
        const chartData1 = modifiedChartData.replace('<Text allowFontScaling={false} font-size="15" x="158.5" y="179.95" style="fill: black;">','<Text allowFontScaling={false} font-size="15" x="148.5" y="179.95" style="fill: black;">');
        const newchart = chartData1.replace('</g>','<path d="M340,175L340,340L257.5,257.5" stroke="#f4a261" stroke-width="1" fill="none"></path></g>');
        
        // console.log(chartData1);
        setChartData(newchart);
        
      } catch (error) {
        console.error('Error:', error);
        // Handle the error appropriately
      }
    };

    fetchData();
  }, []); 

  return     <View style={{flex: 1}}>
  <MyLoader isVisible={isLoading} />
   <ChartComponent title='Sun' png={chartData} planetData={props.route.params.planetData} />
</View>
};

export default Sun