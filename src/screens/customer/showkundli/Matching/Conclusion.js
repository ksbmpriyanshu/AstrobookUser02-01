import {
    View,
    Text,
    ScrollView,
    Dimensions,
    Image,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback
} from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import { colors, fonts } from '../../../../config/Constants1';
import { StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useState, useRef } from 'react';
import axios from 'axios';
import MyLoader from '../../../../components/MyLoader';

import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../../../redux/actions/KundliActions'
import { stat } from 'react-native-fs';
import MyHeader from '../../../../components/MyHeader';
import { mainlogo } from '../../../../assets/images/Images';

const { width, height } = Dimensions.get('screen');

const Conclusion = ({ navigation, dispatch, ConclusionReport, maleKundliData }) => {

    useEffect(() => {
        dispatch(KundliActions.getMatchConclusionpoint());
    }, []);

    const { t } = useTranslation();

    const [isLoading, setIsLoading] = useState(false);
    const [MalemodalVisible, setMaleModalVisible] = useState(false);
    const [FemalemodalVisible, setFemaleModalVisible] = useState(false);


    return (
        <View style={{ flex: 1, backgroundColor: colors.black_color1 }}>
            <MyLoader isVisible={isLoading} />
            <MyHeader title={'Conclusion'} navigation={navigation} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ margin: 10 }}>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontFamily: fonts.bold,
                            fontSize: 22,
                            color: colors.black_color,
                            marginVertical: 20,
                        }}>
                        {t("manglik_r")}
                    </Text>
                    <View style={{ marginTop: 5, marginBottom: 20 }}>
                        <View style={{}}>
                            <Text style={{
                                backgroundColor: colors.background_theme2,
                                padding: 10, paddingBottom: 10, color: 'white', textAlign: 'center', fontSize: 20, borderTopLeftRadius: 10, borderTopRightRadius: 10
                            }}> Male Manglik Analysis</Text>
                        </View>

                        <View style={{ backgroundColor: '#fff', flexDirection: 'row', paddingTop: 10, paddingBottom: 10, alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 15, padding: 5 }}>Are You Manglik: </Text>
                            <View style={{ ...styles.circle, borderColor: '#d81159' }}>
                                <Text
                                    style={{
                                        ...styles.circleText,
                                        color: '#d81159',
                                        marginRight: 30
                                    }}>{ConclusionReport?.male?.is_present ? "Yes" : "No"}</Text>
                            </View>

                            <AnimatedCircularProgress
                                size={80}
                                width={8}
                                fill={ConclusionReport?.male?.percentage_manglik_present}
                                tintColor="#f87060"
                                backgroundColor="#adb5bd">
                                {
                                    (fill) => (
                                        <Text style={{ color: colors.black_color }}>
                                            {ConclusionReport?.male?.percentage_manglik_present}  %
                                        </Text>
                                    )
                                }
                            </AnimatedCircularProgress>

                        </View>

                        <View style={{ backgroundColor: '#9fffcb' }}>
                            <Text style={{ color: 'black', fontSize: 15, padding: 5 }}>{t("Manglik Report")}:{ConclusionReport?.male?.manglik_report} </Text>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => setMaleModalVisible(true)}
                            style={{ backgroundColor: '#0496ff', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }} >
                            <Text style={{ color: 'white', fontSize: 15, textAlign: 'center', padding: 4 }}>{t("View Detail Report")}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 5, marginBottom: 20 }}>
                        <View style={{}}>
                            <Text style={{
                                backgroundColor: colors.background_theme2,
                                padding: 10, paddingBottom: 10, color: 'white', textAlign: 'center', fontSize: 20, borderTopLeftRadius: 10, borderTopRightRadius: 10
                            }}> Female Manglik Analysis</Text>
                        </View>


                        <View style={{ backgroundColor: '#fff', flexDirection: 'row', paddingTop: 10, paddingBottom: 10, alignItems: 'center' }}>
                        <Text style={{ color: 'black', fontSize: 15, padding: 5 }}>Are You Manglik: </Text>
                            <View style={{ ...styles.circle, borderColor: '#d81159' }}>
                                <Text
                                    style={{
                                        ...styles.circleText,
                                        color: '#d81159',
                                        marginRight: 30
                                    }}>{ConclusionReport?.female?.is_present ? "Yes" : "No"}</Text>
                            </View>

                            <AnimatedCircularProgress
                                size={80}
                                width={8}
                                fill={ConclusionReport?.female?.percentage_manglik_present}
                                tintColor="#f87060"
                                backgroundColor="#adb5bd">
                                {
                                    (fill) => (
                                        <Text style={{ color: colors.black_color }}>
                                            {ConclusionReport?.female?.percentage_manglik_present}  %
                                        </Text>
                                    )
                                }
                            </AnimatedCircularProgress>

                        </View>

                        <View style={{ backgroundColor: '#9fffcb' }}>
                            <Text style={{ color: 'black', fontSize: 15, padding: 5 }}>{t("Manglik Report")}:{ConclusionReport?.female?.manglik_report}</Text>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => setFemaleModalVisible(true)}
                            style={{ backgroundColor: '#0496ff', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }} >
                            <Text style={{ color: 'white', fontSize: 15, textAlign: 'center', padding: 4 }}>{t("view_details_report")}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <View style={{ backgroundColor: colors.background_theme2, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                            <Text style={{ color: 'white', fontSize: 18, padding: 10, textAlign: 'center' }}>{t("Match Report Conclusion")}</Text>
                        </View>
                        <View style={{ backgroundColor: "#fff", borderBottomEndRadius: 20, borderBottomStartRadius: 20 }}>
                            <Text style={{ padding: 10 }}>{ConclusionReport?.conclusion?.report}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 30,
                        }}>
                        <View
                            style={{
                                flex: 0.4,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Image
                                source={mainlogo}
                                style={{
                                    marginTop:30,
                                    width: width * 0.2,
                                    height: width * 0.2,
                                    resizeMode: 'contain',
                                    borderRadius: 10
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: colors.black_color,
                                    fontFamily: fonts.semi_bold,
                                    marginTop: 10,
                                }}>

                            </Text>
                            {/* <Text
                style={{
                  fontSize: 14,
                  color: colors.red_color1,
                  fontFamily: fonts.medium,
                  marginTop: 5,
                }}>
                {t("manglik")}
              </Text> */}
                            {/* <TouchableOpacity
                                onPress={() => {
                                    dispatch(KundliActions.viewKundliFromKundliMatching('male'))
                                }}
                                style={{
                                    width: '80%',
                                    backgroundColor: colors.background_theme2,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingVertical: 5,
                                    borderRadius: 5,
                                    marginTop: 10,
                                }}>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: colors.white_color,
                                        fontFamily: fonts.semi_bold,
                                    }}>
                                    {t("view_kundli")}
                                </Text>
                            </TouchableOpacity> */}
                        </View>
                        <View
                            style={{
                                flex: 0.2,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Image
                                source={require('../../../../assets/images/shakehand.jpg')}
                                style={{
                                    width: width * 0.2,
                                    height: width * 0.2,
                                    resizeMode: 'contain',
                                }}
                            />
                        </View>
                        <View
                            style={{
                                flex: 0.4,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Image
                                source={mainlogo}
                                style={{
                                    marginTop:30,
                                    width: width * 0.2,
                                    height: width * 0.2,
                                    resizeMode: 'contain',
                                    borderRadius: 10
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: colors.black_color,
                                    fontFamily: fonts.semi_bold,
                                    marginTop: 10,
                                }}>

                            </Text>

                            {/* <TouchableOpacity
                                onPress={() => {
                                    dispatch(KundliActions.viewKundliFromKundliMatching('female'))
                                }}
                                style={{
                                    width: '80%',
                                    backgroundColor: colors.background_theme2,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingVertical: 5,
                                    borderRadius: 5,
                                    marginTop: 10,
                                }}>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: colors.white_color,
                                        fontFamily: fonts.semi_bold,
                                    }}>
                                    {t("view_kundli")}
                                </Text>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                    <Modal
                        visible={MalemodalVisible}
                        transparent={true}
                        deviceWidth={width}
                        deviceHeight={Dimensions.get('window').height}
                        onBackdropPress={() => setMaleModalVisible(false)}
                        onRequestClose={() => setMaleModalVisible(false)}>
                        <TouchableWithoutFeedback onPress={() => setMaleModalVisible(false)}>
                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: 'transparent',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 0,
                                    marginBottom: 80,
                                    margin: 20

                                    // opacity: 0.4
                                }}>
                                <View style={{ backgroundColor: 'white' }}>
                                    <View style={{ backgroundColor: colors.background_theme2, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                                        <Text style={{
                                            color: 'white', textAlign: 'center', padding: 10,
                                            fontSize: 20,
                                        }}>{t("Manglik Analysis")}</Text>
                                    </View>
                                    <View style={{ backgroundColor: '#d9dcd6' }}>
                                        <Text style={{ padding: 5, fontSize: 15, textAlign: 'justify', color: colors.black_color }}>{t("Aspect")}:-
                                            {ConclusionReport?.male?.manglik_present_rule?.based_on_aspect.map((aspect, index) => (
                                                <Text key={index}>{aspect}{"\n"}</Text>
                                            ))}

                                        </Text>

                                        {/* <Text style={{ padding: 5, fontSize: 15, textAlign: 'justify' }}>{t("house")}:{ConclusionReport?.female?.manglik_present_rule?.based_on_house.map((house, index) => (
                                            <Text key={index}>{house}{"\n"}</Text>
                                        ))}  </Text> */}
                                    </View>
                                    {/* <View style={{ backgroundColor: '#fff' }}>
                                        <Text style={{ color: 'black', fontSize: 15, padding: 5 }}>{t("manglik_cancel_rule")}:{ConclusionReport?.female?.manglik_cancel_rule}</Text>
                                    </View> */}
                                    <View style={{ backgroundColor: '#d9dcd6' }}>
                                        <Text style={{ color: 'black', fontSize: 15, padding: 5 }}>{t("Is mars manglik cancelled")}:{ConclusionReport?.male?.is_mars_manglik_cancelled ? "Yes" : "No"}</Text>
                                    </View>
                                    <View style={{ backgroundColor: '#fff' }}>
                                        <Text style={{ color: 'black', fontSize: 15, padding: 5 }}>{t("Manglik Status")}:{ConclusionReport?.male?.percentage_manglik_after_cancellation} </Text>
                                    </View>
                                    {/* <View style={{ backgroundColor: '#d9dcd6' }}>
                                        <Text style={{ color: 'black', fontSize: 15, padding: 5 }}>{t("percentage_manglik_after_cancellation")}: {ConclusionReport?.male?.percentage_manglik_after_cancellation}% </Text>
                                    </View> */}
                                    <View style={{ backgroundColor: "#fff", borderBottomEndRadius: 20, borderBottomStartRadius: 20 }}>
                                        <Text style={{ color: 'black', fontSize: 15, padding: 5 }}>{t("Is Present")}:{ConclusionReport?.male?.is_present == true ? 'Yes' : 'No'}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                    <Modal
                        visible={FemalemodalVisible}
                        transparent={true}
                        deviceWidth={width}
                        onBackdropPress={() => setFemaleModalVisible(false)}
                        onRequestClose={() => setFemaleModalVisible(false)}>
                        <TouchableWithoutFeedback onPress={() => setFemaleModalVisible(false)}>
                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: 'transparent',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 0,
                                    marginBottom: 80,
                                    margin: 20,
                                    // opacity: 0.4
                                }}>
                                <View style={{ backgroundColor: 'white' }}>
                                    <View style={{ backgroundColor: colors.background_theme2, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                                        <Text style={{
                                            color: 'white', textAlign: 'center', padding: 10,
                                            fontSize: 20,
                                        }}>Manglik Analysis</Text>
                                    </View>
                                    <View style={{ backgroundColor: '#d9dcd6' }}>
                                        <Text style={{ padding: 5, fontSize: 15, textAlign: 'justify', color: colors.black_color }}>{t("Aspect")}:- {ConclusionReport?.female?.manglik_present_rule?.based_on_aspect.map((aspect, index) => (
                                            <Text key={index}>{aspect}{"\n"}</Text>
                                        ))} </Text>

                                        {/* <Text style={{ padding: 5, fontSize: 15, textAlign: 'justify' }}>{t("house")}:</Text> */}
                                    </View>
                                    {/* <View style={{ backgroundColor: '#fff' }}>
                                        <Text style={{ color: 'black', fontSize: 15, padding: 5 }}>{t("Manglik Cancel Rule")}:</Text>
                                    </View> */}
                                    <View style={{ backgroundColor: '#d9dcd6' }}>
                                        <Text style={{ color: 'black', fontSize: 15, padding: 5 }}>{t("Is mars manglik cancelled")}:{ConclusionReport?.female?.is_mars_manglik_cancelled ? "Yes" : "No"}</Text>
                                    </View>
                                    <View style={{ backgroundColor: '#fff' }}>
                                        <Text style={{ color: 'black', fontSize: 15, padding: 5 }}>{t("Manglik Status")}:{ConclusionReport?.female?.percentage_manglik_after_cancellation}</Text>
                                    </View>
                                    {/* <View style={{ backgroundColor: '#d9dcd6' }}>
                                        <Text style={{ color: 'black', fontSize: 15, padding: 5 }}>{t("percentage_manglik_present")}:</Text>
                                    </View> */}
                                    <View style={{ backgroundColor: "#fff", borderBottomEndRadius: 20, borderBottomStartRadius: 20 }}>
                                        <Text style={{ color: 'black', fontSize: 15, padding: 5 }}>{t("Is Present")}:{ConclusionReport?.female?.is_present == true ? 'Yes' : 'No'}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </View>
            </ScrollView>
        </View>
    );
};

const mapStateToProps = state => ({
    matchingAshtakootPointsData: state.kundli.matchingAshtakootPointsData,
    maleKundliData: state.kundli.maleKundliData,
    femaleKundliData: state.kundli.femaleKundliData,
    ConclusionReport: state.kundli.ConclusionReport
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Conclusion);

const styles = StyleSheet.create({
    itmeContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    itemText: {
        flex: 0.5,
        fontSize: 14,
        color: colors.black_color8,
        fontFamily: fonts.medium,
    },
});
