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
import { colors, fonts, getFontSize } from '../../../../config/Constants1';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import MyLoader from '../../../../components/MyLoader';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions  from '../../../../redux/actions/KundliActions'
import MyHeader from '../../../../components/MyHeader';

const { width, height } = Dimensions.get('screen');

const ShowPachang = ({dispatch, MatchAscedentReport, navigation}) => {
    const { t } = useTranslation();

    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState('1');
  
    useEffect(() => {
        const payload ={
            lang: t('lang')
          }
        dispatch(KundliActions.getMatchAscedentReport(payload));
    },[]);
     console.log(MatchAscedentReport?.AscedentReportM)


    return (
        <View style={{ flex: 1, backgroundColor: colors.black_color1 }}>
            <MyLoader isVisible={isLoading} />
            <MyHeader title={'Ascedent'} navigation={navigation} />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                <TouchableOpacity onPress={() => setShow(1)}
                    style={{ backgroundColor: show == 1 ? 
                    colors.background_theme2 : colors.background_theme1, margin: 10, padding: 10, borderRadius: 5,borderWidth: show == 1 ? 0 : 1 }}>
                    <Text style={{ color: show == 1 ? 'white' : 'black' }}>{t("male")}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShow(2)}
                    style={{ backgroundColor: show == 2 ? 
                        colors.background_theme2 : colors.background_theme1, margin: 10, padding: 10, borderRadius: 5,borderWidth: show == 2 ? 0 : 1 }}>
                    <Text style={{  color: show == 2 ? 'white' : 'black' }}>{t("female")}</Text>
                </TouchableOpacity>
            </View>
            {show == 1 ? (
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
                                <Text style={styles.itemText}>{MatchAscedentReport?.AscedentReportM?.asc_report?.ascendant}</Text>
                                <View>
                                    <Text style={{ color: 'black', padding: 10, fontSize: getFontSize(1.7), textAlign: 'justify' }}>
                                        {MatchAscedentReport?.AscedentReportM?.asc_report?.report}
                                    </Text>
                                </View>
                            </View>
                    



                    </View>

                </ScrollView>
            ) : (
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
                                <Text style={styles.itemText}>{MatchAscedentReport?.AscedentReporF?.asc_report?.ascendant}</Text>
                                <View>
                                    <Text style={{ color: 'black', padding: 10, fontSize: getFontSize(1.7), textAlign: 'justify' }}>
                                       {MatchAscedentReport?.AscedentReporF?.asc_report?.report}
                                    </Text>
                                </View>
                            </View>
                    </View>

                </ScrollView>
            )}

        </View>
    );
};

const mapStateToProps = state => ({
    basicDetails: state.kundli.basicDetails,
    birthDetailsData: state.kundli.birthDetailsData,
    maleKundliData:state.kundli.maleKundliData,
    femaleKundliData:state.kundli.femaleKundliData,
    MatchAscedentReport:state.kundli.MatchAscedentReport,
    MatchBasicDetails: state.kundli.MatchBasicDetails,
  })
  
  const mapDispatchToProps = dispatch => ({ dispatch })
  
  export default connect(mapStateToProps, mapDispatchToProps)(ShowPachang);

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,

        alignItems: 'center',
        padding: 15,
        alignSelf: 'center'
    },
    itemText: {

        fontSize: getFontSize(2),
        color: 'red',
        fontFamily: fonts.medium,
        fontWeight: 'bold',
        textAlign: 'center'
    },
});
