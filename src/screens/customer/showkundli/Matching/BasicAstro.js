import {
    View,
    Text,
    ScrollView,
    Dimensions,
    Image,
    TouchableOpacity,
  } from 'react-native';
  import React from 'react';
  import {useEffect} from 'react';
  
  import { colors, fonts } from '../../../../config/Constants1';
  import {StyleSheet} from 'react-native';
  import {useState,useRef} from 'react';
  import RNSpeedometer from 'react-native-speedometer';
import Modal from 'react-native-modal';
  import axios from 'axios';
  
  import MyLoader from '../../../../components/MyLoader';
  import moment from 'moment';
  import { useTranslation } from 'react-i18next';
import { getBasicAstro } from '../../../config/apiService';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { stat } from 'react-native-fs';
import { connect } from 'react-redux';
import * as KundliActions from '../../../../redux/actions/KundliActions';
import MyHeader from '../../../../components/MyHeader';
  
  const {width, height} = Dimensions.get('screen');
  
  const BasicAstro = ({props,dispatch, BasicAstroMatching, navigation}) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      dispatch(KundliActions.getMatchBasicAstro());
  },[]);

  console.log(BasicAstroMatching?.female_astro_details, 'datatat')

   
    
  
    return (
      <View style={{flex: 1, backgroundColor: colors.background_theme1}}>
        <MyLoader isVisible={isLoading} />
        <MyHeader title={'Basic Astro'} navigation={navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={{ width: '100%', marginTop: 20, padding: 15,backgroundColor:'white',alignSelf:'center' }}>
         
          <View style={{ flexDirection: 'row', backgroundColor: colors.background_theme2, borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 10, paddingBottom: 0 }}>
            <View style={styles.asht}>
              <Text style={{ ...styles.heading, color: 'white' }}>{t("male")}</Text>
            </View>
            <View style={styles.asht}>
              <Text style={{ ...styles.heading, color: 'white' }}>{t("astro_details")}</Text>
            </View>
            <View style={styles.asht}>
              <Text style={{ ...styles.heading, color: 'white' }}>{t("female")}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 10, paddingBottom: 0 , backgroundColor:colors.background_theme1, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, }}>
            
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{BasicAstroMatching?.male_astro_details?.Varna}</Text>
            </View>
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{t("varna")}</Text>
            </View>
            <View style={styles.asht}>
              <Text style={styles.heading}>{BasicAstroMatching?.female_astro_details?.Varna}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'lightgrey', padding: 10, paddingBottom: 0 }}>
            
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{BasicAstroMatching?.male_astro_details?.Vashya}</Text>
            </View>
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{t( "vashya")}</Text>
            </View>
            <View style={styles.asht}>
              <Text style={styles.heading}>{BasicAstroMatching?.female_astro_details?.Vashya}</Text>
            </View>
          </View>
          
          <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 10, paddingBottom: 0 }}>
            
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{BasicAstroMatching?.male_astro_details?.Yoni}</Text>
            </View>
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{t("yoni")}</Text>
            </View>
            <View style={styles.asht}>
              <Text style={styles.heading}>{BasicAstroMatching?.female_astro_details?.Yoni}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'lightgrey', padding: 10, paddingBottom: 0 }}>
            
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{BasicAstroMatching?.male_astro_details?.Gan}</Text>
            </View>
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{t("gan")}</Text>
            </View>
            <View style={styles.asht}>
              <Text style={styles.heading}>{BasicAstroMatching?.female_astro_details?.Gan}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 10, paddingBottom: 0 }}>
            
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{BasicAstroMatching?.male_astro_details?.Nadi}</Text>
            </View>
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{t("nadi")}</Text>
            </View>
            <View style={styles.asht}>
              <Text style={styles.heading}>{BasicAstroMatching?.female_astro_details?.Nadi}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'lightgrey', padding: 10, paddingBottom: 0 }}>
            
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{BasicAstroMatching?.male_astro_details?.SignLord}</Text>
            </View>
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{t("signlord")}</Text>
            </View>
            <View style={styles.asht}>
              <Text style={styles.heading}>{BasicAstroMatching?.female_astro_details?.SignLord}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 10, paddingBottom: 0 }}>
            
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{BasicAstroMatching?.male_astro_details?.sign}</Text>
            </View>
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{t("sign")}</Text>
            </View>
            <View style={styles.asht}>
              <Text style={styles.heading}>{BasicAstroMatching?.female_astro_details?.sign}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'lightgrey', padding: 10, paddingBottom: 0 }}>
            
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{BasicAstroMatching?.male_astro_details?.Naksahtra}</Text>
            </View>
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{t("naksahtra")}</Text>
            </View>
            <View style={styles.asht}>
              <Text style={styles.heading}>{BasicAstroMatching?.female_astro_details?.Naksahtra}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 10, paddingBottom: 0 }}>
            
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{BasicAstroMatching?.male_astro_details?.NaksahtraLord}</Text>
            </View>
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{t("naksahtralord")}</Text>
            </View>
            <View style={styles.asht}>
              <Text style={styles.heading}>{BasicAstroMatching?.female_astro_details?.NaksahtraLord}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'lightgrey', padding: 10, paddingBottom: 0 }}>
            
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{BasicAstroMatching?.male_astro_details?.Charan}</Text>
            </View>
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{t("charan")}</Text>
            </View>
            <View style={styles.asht}>
              <Text style={styles.heading}>{BasicAstroMatching?.female_astro_details?.Charan}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 10, paddingBottom: 0 }}>
            
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{BasicAstroMatching?.male_astro_details?.Yog}</Text>
            </View>
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{t("yog")}</Text>
            </View>
            <View style={styles.asht}>
              <Text style={styles.heading}>{BasicAstroMatching?.female_astro_details?.Yog}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'lightgrey', padding: 10, paddingBottom: 0 }}>
            
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{BasicAstroMatching?.male_astro_details?.Karan}</Text>
            </View>
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{t("karan")}</Text>
            </View>
            <View style={styles.asht}>
              <Text style={styles.heading}>{BasicAstroMatching?.female_astro_details?.Karan}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 10, paddingBottom: 0 }}>
            
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{BasicAstroMatching?.male_astro_details?.Tithi}</Text>
            </View>
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{t("tithi")}</Text>
            </View>
            <View style={styles.asht}>
              <Text style={styles.heading}>{BasicAstroMatching?.female_astro_details?.Tithi}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'lightgrey', padding: 10, paddingBottom: 0 }}>
            
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{BasicAstroMatching?.female_astro_details?.yunja}</Text>
            </View>
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{t("yunja")}</Text>
            </View>
            <View style={styles.asht}>
              <Text style={styles.heading}>{BasicAstroMatching?.male_astro_details?.yunja}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 10, paddingBottom: 0 }}>
            
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{BasicAstroMatching?.female_astro_details?.tatva}</Text>
            </View>
            <View style={styles.asht}>
              <Text
                style={styles.heading}>tatva</Text>
            </View>
            <View style={styles.asht}>
              <Text style={styles.heading}>{BasicAstroMatching?.female_astro_details?.tatva}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'lightgrey', padding: 10, paddingBottom: 0 }}>
            
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{BasicAstroMatching?.male_astro_details?.name_alphabet}</Text>
            </View>
            <View style={styles.asht}>
              <Text
                style={styles.heading}>Name alphabet</Text>
            </View>
            <View style={styles.asht}>
              <Text style={styles.heading}>{BasicAstroMatching?.female_astro_details?.name_alphabet}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 10, paddingBottom: 0 }}>
            
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{BasicAstroMatching?.male_astro_details?.paya}</Text>
            </View>
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{t("paya")}</Text>
            </View>
            <View style={styles.asht}>
              <Text style={styles.heading}>{BasicAstroMatching?.female_astro_details?.paya}</Text>
            </View>
          </View>
          
          
       </View>
      </ScrollView>
      </View>
    );
  };
  

  const mapStateToProps = state => ({
    basicDetails: state.kundli.basicDetails,
    birthDetailsData: state.kundli.birthDetailsData,
    maleKundliData:state.kundli.maleKundliData,
    femaleKundliData:state.kundli.femaleKundliData,
    BasicAstroMatching:state.kundli.BasicAstroMatching,
    MatchBasicDetails: state.kundli.MatchBasicDetails,
  })
  
  const mapDispatchToProps = dispatch => ({ dispatch })
  
  export default connect(mapStateToProps, mapDispatchToProps)(BasicAstro);
  
  const styles = StyleSheet.create({
    containerBox: {
      flex: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.background_theme3,
      borderRadius: 10,
      shadowColor: colors.black_color5,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      marginBottom: 15,
    },
    childContainerBox: {
      flex: 1,
      padding: 10,
    },
    heading: {
      fontSize: responsiveFontSize(1.6),
      color: colors.black_color,
      fontFamily: fonts.semi_bold,
      marginBottom: 15,
    },
    asht: {
      width: '34%',
      paddingLeft:35,
    },
    description: {
      fontSize: 13,
      color: colors.black_color,
      fontFamily: fonts.medium,
    },
    circle: {
      flex: 0,
      width: width * 0.2,
      height: width * 0.2,
      borderRadius: 1000,
      borderWidth: 8,
      borderColor: colors.green_color2,
      marginRight: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    circleText: {
      fontSize: 22,
      color: colors.green_color2,
      fontFamily: fonts.bold,
    },
  });
  
  