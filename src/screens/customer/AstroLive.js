import {
    View,
    Text,
    ScrollView,
    Dimensions,
    StyleSheet,
    Touchable,
    TouchableOpacity,
    Image,
    RefreshControl,
    FlatList
  } from 'react-native';
  import React from 'react';
  import MyStatusBar from '../../components/MyStatusbar';
  import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
  import {api_url, base_url, blog, colors, fonts, get_live_list,getFontSize} from '../../config/Constants1';
  import {useEffect} from 'react';
  import HomeHeader from '../../components/HomeHeader';
  import MyHeader from '../../components/MyHeader';
  import {useState} from 'react';
  import axios from 'axios';
  import MyLoader from '../../components/MyLoader';
  import { connect } from 'react-redux';
  import LiveList from '../live/LiveList';
  import LiveSchedule from './LiveSchedule';
  import moment from 'moment/moment';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import { useFocusEffect } from '@react-navigation/native';
import { warnign_toast } from '../../components/MyToastMessage';
  import { useTranslation } from 'react-i18next';
  const {width, height} = Dimensions.get('screen');

  const Tab = createMaterialTopTabNavigator();
  
  const AstroLive = props => {
    const {t} = useTranslation();
    

    useEffect(() => {
      if (props?.route?.params?.data === 'home') {
        props.navigation.setOptions({
          header: () => (
            <MyHeader
              title={t("astrologer_live")}
              socialIcons={false}
              navigation={props.navigation}
              statusBar={{
                backgroundColor: colors.background_theme2,
                barStyle: 'light-content',
              }}
            />
          ),
        });
      } else {
        props.navigation.setOptions({
          headerShown: false,
        });
      }
    }, [props.navigation, props.route.params?.data]);
  
   
        
  
    return (
      <View style={{flex: 1, backgroundColor: colors.black_color1}}>
        <MyStatusBar
          backgroundColor={colors.background_theme2}
          barStyle="light-content"
        />
        {props?.route?.params?.data === 'home' ? (
          null
        ):(
          <HomeHeader navigation={props.navigation} />
        )}
        
        <Tab.Navigator>
      <Tab.Screen name="Live" component={LiveList}  />
      <Tab.Screen name="Schedule" component={LiveSchedule} />
    </Tab.Navigator>
       
      </View>
    );
  };

  const mapStateToProps = state => ({
    customerData: state.customer.customerData,
  });
  
  export default connect(mapStateToProps, null)(AstroLive);
  
  const styles = StyleSheet.create({
    noContentContainer: {
      flex: 0,
      height: height * 0.15,
      backgroundColor: colors.background_theme1,
      borderRadius: 10,
      borderColor: colors.black_color6,
      borderWidth: 1,
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    socialIcon: {
      width: width * 0.16,
      height: width * 0.16,
      resizeMode: 'cover',
      borderRadius: 1000,
    },
  });
  