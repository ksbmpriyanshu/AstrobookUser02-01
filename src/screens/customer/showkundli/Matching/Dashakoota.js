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
  import { connect } from 'react-redux';
   import * as KundliActions from '../../../../redux/actions/KundliActions'
  
  import moment from 'moment';
  import { useTranslation } from 'react-i18next';
import MyHeader from '../../../../components/MyHeader';

  
  const {width, height,} = Dimensions.get('screen');
  
  const Dashakoota = ({props, dispatch,DashKootReport, navigation}) => {

    useEffect(() => {
      dispatch(KundliActions.getDaskootapoint());
  },[]);
  
  console.log(DashKootReport,'sdf')
    const { t } = useTranslation();

    
    const [isLoading, setIsLoading] = useState(false);
    const ref = useRef();


    
  
    return (
      <View style={{flex: 1, backgroundColor: colors.background_theme1}}>
        <MyLoader isVisible={isLoading} />
        <MyHeader title={'Dashakoota'} navigation={navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={{ width: '100%', marginTop: 20, padding: 15,backgroundColor:'white' }}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: fonts.semi_bold,
              fontSize: 18,
              color: colors.black_color8,
              marginBottom: 20,
            }}>
            {t("dashakoota_details")}
          </Text>
          <View style={{ flexDirection: 'row', backgroundColor: colors.background_theme2, borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 10, paddingBottom: 0 }}>
            <View style={styles.asht}>
              <Text style={{ ...styles.heading, color: 'white' }}>{t("Attributes")}</Text>
            </View>
            <View style={styles.asht}>
              <Text style={{ ...styles.heading, color: 'white' }}>{t("Total")}</Text>
            </View>
            <View style={styles.asht}>
              <Text style={{ ...styles.heading, color: 'white' }}>{t("Matched")}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 10, paddingBottom: 0 }}>
            <View style={styles.asht}>
              <Text style={styles.heading}>{t("Dina")}</Text>
            </View>
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{DashKootReport?.dina?.total_points}</Text>
            </View>
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{DashKootReport?.dina?.received_points}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: '#fb8500', padding: 10, paddingBottom: 0 }}>
            <View style={styles.asht}>
              <Text style={styles.heading}>Gana</Text>
            </View>
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{DashKootReport?.gana?.total_points}</Text>
            </View>
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{DashKootReport?.gana?.received_points}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 10, paddingBottom: 0 }}>
            <View style={styles.asht}>
              <Text style={styles.heading}>{t("Yoni")}</Text>
            </View>

            <View style={styles.asht}>
              <Text
                style={styles.heading}>{DashKootReport?.yoni?.total_points}</Text>
            </View>
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{DashKootReport?.yoni?.received_points}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: '#06d6a0', padding: 10, paddingBottom: 0 }}>
            <View style={styles.asht}>
              <Text style={styles.heading}>{t("Rashi")}</Text>
            </View>

            <View style={styles.asht}>
              <Text
                style={styles.heading}>{DashKootReport?.rashi?.total_points}</Text>
            </View>
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{DashKootReport?.rashi?.received_points}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 10, paddingBottom: 0 }}>
            <View style={styles.asht}>
              <Text style={styles.heading}>{t("Rasyadhipati")}</Text>
            </View>

            <View style={styles.asht}>
              <Text
                style={styles.heading}>{DashKootReport?.rasyadhipati?.total_points}</Text>
            </View>
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{DashKootReport?.rasyadhipati?.received_points}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: '#ccdbfd', padding: 10, paddingBottom: 0 }}>
            <View style={styles.asht}>
              <Text style={styles.heading}>{t("Rajju")}</Text>
            </View>

            <View style={styles.asht}>
              <Text
                style={styles.heading}>{DashKootReport?.rajju?.total_points}</Text>
            </View>
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{DashKootReport?.rajju?.received_points}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 10, paddingBottom: 0 }}>
            <View style={styles.asht}>
              <Text style={styles.heading}>{t("Vedha")}</Text>
            </View>
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{DashKootReport?.vedha?.total_points}</Text>
            </View>
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{DashKootReport?.vedha?.received_points}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: '#f7c59f', padding: 10, paddingBottom: 0 }}>
            <View style={styles.asht}>
              <Text style={styles.heading}>{t("Vashya")}</Text>
            </View>

            <View style={styles.asht}>
              <Text
                style={styles.heading}>{DashKootReport?.vashya?.total_points}</Text>
            </View>
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{DashKootReport?.vashya?.received_points}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: '#fff', padding: 10, paddingBottom: 0 }}>
            <View style={styles.asht}>
              <Text style={styles.heading}>{t("Mahendra")}</Text>
            </View>

            <View style={styles.asht}>
              <Text
                style={styles.heading}>{DashKootReport?.mahendra?.total_points}</Text>
            </View>
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{DashKootReport?.mahendra?.received_points}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: '#219ebc', padding: 10, paddingBottom: 0 }}>
            <View style={styles.asht}>
              <Text style={styles.heading}>{t("StreeDeergha")}</Text>
            </View>

            <View style={styles.asht}>
              <Text
                style={styles.heading}>{DashKootReport?.streeDeergha?.total_points}</Text>
            </View>
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{DashKootReport?.streeDeergha?.received_points}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 10, paddingBottom: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
            <View style={styles.asht}>
              <Text style={styles.heading}>{t("Total")}</Text>
            </View>
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{DashKootReport?.total?.total_points}</Text>
            </View>
            <View style={styles.asht}>
              <Text
                style={styles.heading}>{DashKootReport?.total?.received_points}</Text>
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
    matchingAshtakootPointsData: state.kundli.matchingAshtakootPointsData,
    MatchBasicDetails: state.kundli.MatchBasicDetails,
    DashKootReport: state.kundli.DashKootReport
  })
  
  const mapDispatchToProps = dispatch => ({ dispatch })
  
  export default connect(mapStateToProps, mapDispatchToProps)(Dashakoota);
  
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
      fontSize: 16,
      color: colors.black_color,
      fontFamily: fonts.semi_bold,
      marginBottom: 15,
    },
    asht: {
      width: '40%'
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
  
  