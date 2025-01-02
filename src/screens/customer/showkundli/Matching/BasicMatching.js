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
import { colors, fonts } from '../../../../config/Constants1';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import MyLoader from '../../../../components/MyLoader';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import * as KundliActions from '../../../../redux/actions/KundliActions';
import { Colors, Fonts, Sizes } from '../../../../assets/style';
import { SCREEN_WIDTH } from '../../../../config/Screen';
import MyHeader from '../../../../components/MyHeader';


const { width, height } = Dimensions.get('screen');

const BasicMatching = ({ dispatch, MatchBasicDetails, femaleKundliData, maleKundliData, navigation }) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        dispatch(KundliActions.getKundliMatchingAshtakootPoints());
    }, []);
    console.log(MatchBasicDetails?.female_astro_details, 'Bascis match')
    return (
        <View style={{ flex: 1, backgroundColor: colors.black_color1 }}>
            <MyLoader isVisible={isLoading} />
            <MyHeader title={'Match  Report'} navigation={navigation} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        flex: 0,
                        width: '95%',
                        alignSelf: 'center',
                        backgroundColor: colors.background_theme1,
                        marginVertical: 10,
                        borderRadius: 15,
                        shadowColor: colors.black_color5,
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.3,
                        shadowRadius: 5,
                    }}>
                    <View style={styles.itmeContainer}>
                        <Text style={styles.itemText}>
                            {femaleKundliData?.name}
                        </Text>
                        <Text style={styles.itemText}>{t("name")}</Text>
                        <Text style={styles.itemText}>
                            {maleKundliData?.name}
                        </Text>
                    </View>
                    <View
                        style={{
                            ...styles.itmeContainer,
                            backgroundColor: colors.background_theme2,
                        }}>
                        <Text style={{ ...styles.itemText, color: colors.background_theme1 }}>
                            {MatchBasicDetails?.female_astro_details?.day}:{MatchBasicDetails?.female_astro_details?.month}:{MatchBasicDetails?.female_astro_details?.year}
                        </Text>
                        <Text style={{ ...styles.itemText, color: colors.background_theme1 }}>
                            {t("Date")}
                        </Text>
                        <Text style={{ ...styles.itemText, color: colors.background_theme1 }}>
                            {MatchBasicDetails?.male_astro_details?.day}:{MatchBasicDetails?.male_astro_details?.month}:{MatchBasicDetails?.male_astro_details?.year}
                        </Text>
                    </View>
                    <View style={styles.itmeContainer}>
                        <Text style={styles.itemText}>
                            {MatchBasicDetails?.female_astro_details?.hour}:{MatchBasicDetails?.female_astro_details?.minute}
                        </Text>
                        <Text style={styles.itemText}>{t("time")}</Text>
                        <Text style={styles.itemText}>
                            {MatchBasicDetails?.male_astro_details?.hour}:{MatchBasicDetails?.male_astro_details?.minute}
                        </Text>
                    </View>
                    <View
                        style={{
                            ...styles.itmeContainer,
                            backgroundColor: colors.background_theme2,
                        }}>
                        <Text style={{ ...styles.itemText, color: colors.background_theme1 }}>
                            {femaleKundliData?.place}
                        </Text>
                        <Text style={{ ...styles.itemText, color: colors.background_theme1 }}>
                            {t("place")}
                        </Text>
                        <Text style={{ ...styles.itemText, color: colors.background_theme1 }}>
                            {maleKundliData?.place}
                        </Text>
                    </View>
                    <View style={styles.itmeContainer}>
                        <Text style={styles.itemText}>
                            {MatchBasicDetails?.female_astro_details?.latitude}
                        </Text>
                        <Text style={styles.itemText}>{t("lat")}</Text>
                        <Text style={styles.itemText}>
                            {MatchBasicDetails?.male_astro_details?.latitude}
                        </Text>
                    </View>
                    <View
                        style={{
                            ...styles.itmeContainer,
                            backgroundColor: colors.background_theme2,
                        }}>
                        <Text style={{ ...styles.itemText, color: colors.background_theme1 }}>
                            {MatchBasicDetails?.female_astro_details?.longitude}
                        </Text>
                        <Text style={{ ...styles.itemText, color: colors.background_theme1 }}>
                            {t("long")}
                        </Text>
                        <Text style={{ ...styles.itemText, color: colors.background_theme1 }}>
                            {MatchBasicDetails?.male_astro_details?.longitude}
                        </Text>
                    </View>
                    {/* <View style={styles.itmeContainer}>
                    <Text style={styles.itemText}>GMT+05:30</Text>
                        <Text style={styles.itemText}>{t("time_zone")}</Text>
                        <Text style={styles.itemText}>GMT+05:30</Text>
                    </View> */}
                    <View
                        style={{
                            ...styles.itmeContainer,
                            backgroundColor: colors.white_color,
                        }}>
                        <Text style={{ ...styles.itemText, color: colors.black_color }}>
                            {MatchBasicDetails?.female_astro_details?.ayanamsha}
                        </Text>
                        <Text style={{ ...styles.itemText, color: colors.black_color }}>
                            Ayanamsha
                        </Text>
                        <Text style={{ ...styles.itemText, color: colors.black_color }}>
                            {MatchBasicDetails?.male_astro_details?.ayanamsha}
                        </Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: Sizes.fixPadding, justifyContent: 'space-between' }}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('basciAstro')} style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Basic Astro</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('kundliMatch')} style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Kundli Matching</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('matchAsc')} style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Asdecent</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('chart')} style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Chart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('dashakoota')} style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Dashakoota</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('conclusion')} style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Conclusion</Text>
                    </TouchableOpacity>



                </View>


            </ScrollView>
        </View>
    );
};



const mapStateToProps = state => ({
    basicDetails: state.kundli.basicDetails,
    birthDetailsData: state.kundli.birthDetailsData,
    maleKundliData: state.kundli.maleKundliData,
    femaleKundliData: state.kundli.femaleKundliData,
    matchingAshtakootPointsData: state.kundli.matchingAshtakootPointsData,
    MatchBasicDetails: state.kundli.MatchBasicDetails,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(BasicMatching);

const styles = StyleSheet.create({
    itmeContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        justifyContent: 'space-between'
    },
    itemText: {
        flex: 0.5,
        fontSize: 12,
        color: colors.black_color8,
        fontFamily: fonts.medium,
        paddingLeft: 20,
        paddingRight: 20,
    },
    buttonContainer: {
        width: '45%',
        backgroundColor: colors.background_theme2,
        borderRadius: Sizes.fixPadding,
        height: SCREEN_WIDTH * 0.3,
        justifyContent: 'center', alignItems: 'center',
        marginBottom: Sizes.fixPadding * 2
    },
    buttonText: {
        ...Fonts.white16RobotoMedium,
        textAlign: 'center'
    },
});
