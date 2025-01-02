import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, Platform, Image, ScrollView, TouchableOpacity, Modal, Button, Alert, PermissionsAndroid } from 'react-native';
import axios from 'axios';
import { colors } from '../../../config/Constants1';
import { getBasicPanchang } from '../../../config/apiService';
import { color } from 'react-native-reanimated';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Geolocation from '@react-native-community/geolocation';
import { PERMISSIONS, request } from 'react-native-permissions';
import { useTranslation } from 'react-i18next';
import MyHeader from '../../../components/MyHeader';
import DateTimePicker from '@react-native-community/datetimepicker';




const TommorowPanchang = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [Data1, setPanchangeData] = useState(null);
    const { t } = useTranslation();
    const [birthPlace, setBirthPlace] = useState(
        props.customerData?.place_of_birth,
    );
    const [latLong, setLatLong] = useState(null);
    const [date, setDate] = useState(null);

    const currentDate = new Date();
    const tomorrowDate = new Date(currentDate);
    tomorrowDate.setDate(tomorrowDate.getDate() + 1); // Increase the date by 1 day

    const tomorrowDay = tomorrowDate.getDate();
    const tomorrowMonth = tomorrowDate.getMonth() + 1;
    const tomorrowYear = tomorrowDate.getFullYear();
    const tomorrowHours = tomorrowDate.getHours();
    const tomorrowMinutes = tomorrowDate.getMinutes();
    const tomorrowSeconds = tomorrowDate.getSeconds();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const currentMonthName = monthNames[currentDate.getMonth()];


    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    useEffect(() => {
        const requestLocationPermission = async () => {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Permission',
                        message: 'This app needs access to your location',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    // Permission granted
                    getCurrentLocation();
                } else {
                    props.navigation.goBack();
                }
            } catch (err) {
                console.warn(err);
            }
        };

        requestLocationPermission();
        api_get();

        return () => {
            // Clean up the location listener when the component unmounts

        };
    }, []);
    useFocusEffect(
        useCallback(() => {
            api_get();
        }, [])
    );

      const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
          async(position) => {
            console.log('==========',position.coords);
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);

            const data = {
                day: tomorrowDay,
                month: tomorrowMonth,
                year: tomorrowYear,
                hour: tomorrowHours,
                min: tomorrowMinutes,
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                tzone: 5.5,
            };


            const data3 = await getBasicPanchang(data);
            setPanchangeData(data3);


          },
          error => {
            console.error(error.message);
          },
          { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
        );
      };

    const api_get = async () => {
        let url = 'https://json.astrologyapi.com/v1/advanced_panchang';

        Geolocation.getCurrentPosition(
            async (position) => {
                console.log('==========', position.coords);
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                let data = {
                    day: tomorrowDay,
                    month: tomorrowMonth,
                    year: tomorrowYear,
                    hour: tomorrowHours,
                    min: tomorrowMinutes,
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                    tzone: 5.5,
                };

                try {
                    const credentials = `${630051}:${'861bba6a92587a326a9b11ab9dfb9b7ca3492fab'}`;
                    const token = btoa(credentials);

                    const headers = new Headers();
                    headers.append('Content-Type', 'application/json');
                    headers.append('Authorization', `Basic ${token}`);

                    const response = await fetch(url,
                        {
                            method: 'POST',
                            headers: headers,
                            body: JSON.stringify(data)
                        });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const responseData = await response.json();
                    console.log(responseData?.sunrise, 'jhasdfj');
                    setPanchangeData(responseData)
                    return responseData;

                } catch (e) {
                    console.error(e);
                    return null;
                }

            },
        );
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };



    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <ScrollView >
                <View >
                    <View style={{ backgroundColor: '#305da6' }}>
                        <View style={{ padding: 10 }}></View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} >
                            <View style={{ width: "45%", backgroundColor: '#4670ab', flexDirection: 'row' }}>

                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10, padding: 18, borderRadius: 15 }}>
                                        <Text style={{ color: 'white', fontSize: 60, marginRight: 5 }}>{tomorrowDay}</Text>
                                        <View>
                                            <Text style={{ color: 'white', fontSize: 18 }}>{Data1?.day}</Text>
                                            <Text style={{ color: 'white', fontSize: 18 }}>{currentMonthName}</Text>
                                            <Text style={{ color: 'white', fontSize: 18 }}>{tomorrowYear}</Text>
                                        </View>
                                    </View>
                                    {/* <TouchableOpacity
                                            onPress={() => {
                                                props.navigation.navigate('placeOfBirth', {
                                                    set_place_of_birth: setBirthPlace,
                                                    set_lat_long: setLatLong,
                                                });
                                            }}
                                            style={{ alignItems: 'center', width: '100%' }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    color: 'white',


                                                }}>
                                                {birthPlace != null ? birthPlace : 'Current Location'}
                                            </Text>
                                        </TouchableOpacity> */}
                                    {/* Modal component */}

                                </View>

                            </View>

                            <View style={{ justifyContent: "center", alignItems: 'center' }}>
                                <Image source={require("../../../assets/images/Panchang/moonhalf.png")}
                                    style={{ width: 100, height: 100 }} />
                                {/* <Text style={{ color: 'white', fontSize: 16, marginHorizontal: 10 }}>Shukla Chaturthi\</Text> */}
                                <Text style={{ color: 'white', fontSize: 16, marginHorizontal: 10, marginTop: 4 }}>{Data1?.tithi?.details?.tithi_name} Tithi</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={{ color: 'white', fontSize: 16, marginHorizontal: 15, marginTop: 15 }}>{Data1?.ritu}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: 15, marginBottom: 10 }}>
                            <View style={{ alignItems: 'center' }}>
                                <Image source={require("../../../assets/images/Panchang/whitesunsrise.png")}
                                    style={{ width: 50, height: 50 }} />
                                <Text style={{ color: 'white', fontSize: 18, marginHorizontal: 10 }}>{Data1?.sunrise}</Text>
                                <Text style={{ color: 'white', fontSize: 12, marginHorizontal: 10 }}>Sunrise</Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Image source={require("../../../assets/images/Panchang/sunsetwhtie.png")}
                                    style={{ width: 50, height: 50 }} />
                                <Text style={{ color: 'white', fontSize: 18, marginHorizontal: 10 }}>{Data1?.sunset}</Text>
                                <Text style={{ color: 'white', fontSize: 12, marginHorizontal: 10 }}>Sunset</Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Image source={require("../../../assets/images/Panchang/moonrisewhtie.png")}
                                    style={{ width: 50, height: 50 }} />
                                <Text style={{ color: 'white', fontSize: 18, marginHorizontal: 10 }}>{Data1?.moonrise}</Text>
                                <Text style={{ color: 'white', fontSize: 12, marginHorizontal: 10 }}>Moonrise</Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Image source={require("../../../assets/images/Panchang/moonset.png")}
                                    style={{ width: 50, height: 50 }} />
                                <Text style={{ color: 'white', fontSize: 18, marginHorizontal: 10 }}>{Data1?.moonset}</Text>
                                <Text style={{ color: 'white', fontSize: 12, marginHorizontal: 10 }}>Moonset</Text>
                            </View>
                        </View>
                    </View>
                    {/* <View style={{ backgroundColor: colors.yellow_color3, padding: 10, alignItems: 'center' }}>
                        <Text style={{ fontSize: 17, fontweight: '600', marginLeft: 15, padding: 10, color: 'black' }}>Todays Festival</Text>
                        <Text style={{ fontSize: 17, fontweight: '900', marginLeft: 15, color: 'black' }}>\Rohini Virat, Vinayaaka Chaturthi\</Text>
                    </View> */}
                    <View style={{ backgroundColor: colors.yellow_color4, alignItems: 'center' }}>
                        <Text style={{ fontSize: 17, fontweight: '600', marginLeft: 15, padding: 10, color: 'black' }}>Nakshatra</Text>
                        <Text style={{ fontSize: 17, marginLeft: 15, color: 'black' }}>{Data1?.nakshatra?.details?.nak_name} upto to {Data1?.nakshatra?.end_time?.hour}:{Data1?.nakshatra?.end_time?.minute}:{Data1?.nakshatra?.end_time?.second}</Text>
                    </View>
                    <View style={{ backgroundColor: colors.yellow_color2, padding: 8, alignItems: 'center' }}>
                        <Text style={{ fontSize: 17, fontweight: 'bold', marginLeft: 15, padding: 10, color: 'black' }}>Yog</Text>
                        <Text style={{ fontSize: 17, marginLeft: 15, color: 'black' }}>{Data1?.yog?.details?.yog_name} upto to {Data1?.yog?.end_time?.hour}:{Data1?.yog?.end_time?.minute}:{Data1?.yog?.end_time?.second}</Text>
                    </View>
                    <View style={{ backgroundColor: colors.yellow_color4, padding: 10, alignItems: 'center' }}>
                        <Text style={{ fontSize: 17, fontweight: '600', marginLeft: 15, padding: 10, color: 'black' }}>Karan</Text>
                        <Text style={{ fontSize: 17, marginLeft: 15, color: 'black' }}> {Data1?.karan?.details?.karan_name} upto to {Data1?.karan?.end_time?.hour}:{Data1?.karan?.end_time?.minute}:{Data1?.karan?.end_time?.second}</Text>
                    </View>
                    <View style={{ backgroundColor: "white", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                        <View style={{ backgroundColor: 'lightgrey', marginVertical: 7, padding: 13, borderRadius: 15 }}>
                            <Text style={{ fontSize: 17, fontweight: '600', marginHorizontal: 15, marginVertical: 5, color: 'black' }}>Month Amanta</Text>
                            <Text style={{ fontSize: 17, fontweight: '600', marginHorizontal: 15, marginVertical: 5, color: 'black' }}>{Data1?.hindu_maah?.amanta}</Text>
                        </View>
                        <View style={{ backgroundColor: 'lightgrey', marginVertical: 7, padding: 13, borderRadius: 15 }}>
                            <Text style={{ fontSize: 17, fontweight: '600', marginHorizontal: 15, marginVertical: 5, color: 'black' }}>Month Purnimanta</Text>
                            <Text style={{ fontSize: 17, fontweight: '600', marginHorizontal: 15, marginVertical: 5, color: 'black' }}>{Data1?.hindu_maah?.purnimanta}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', backgroundColor: colors.yellow_color1, padding: 8, justifyContent: 'space-around', alignItems: 'center' }}>
                        <View>
                            <Text style={{ fontSize: 17, marginHorizontal: 15, color: 'black' }}>Sun Sign</Text>
                            <Text style={{ fontSize: 17, marginHorizontal: 15, color: 'black' }}>{Data1?.sun_sign}</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 17, marginHorizontal: 15, color: 'black' }}>Moon Sign</Text>
                            <Text style={{ fontSize: 17, marginHorizontal: 15, color: 'black' }}>{Data1?.moon_sign}</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: "white", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                        <View style={{ backgroundColor: 'lightgrey', marginVertical: 7, padding: 13, borderRadius: 15 }}>
                            <Text style={{ fontSize: 17, fontweight: '600', marginHorizontal: 15, marginVertical: 5, color: 'black' }}>Vikaram Samvat</Text>
                            <Text style={{ fontSize: 17, fontweight: '600', marginHorizontal: 15, marginVertical: 5, color: 'black' }}>{Data1?.vikram_samvat} - {Data1?.vkram_samvat_name}</Text>
                        </View>
                        <View style={{ backgroundColor: 'lightgrey', marginVertical: 7, padding: 13, borderRadius: 15 }}>
                            <Text style={{ fontSize: 17, fontweight: '600', marginHorizontal: 15, marginVertical: 5, color: 'black' }}>Sak Samvat</Text>
                            <Text style={{ fontSize: 17, fontweight: '600', marginHorizontal: 15, marginVertical: 5, color: 'black' }}>{Data1?.shaka_samvat} - {Data1?.shaka_samvat_name}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', backgroundColor: colors.yellow_color2, padding: 8, justifyContent: 'space-around', alignItems: 'center' }}>
                        <View>
                            <Text style={{ fontSize: 17, marginHorizontal: 15, color: 'black' }}>Season-Ritu</Text>
                            <Text style={{ fontSize: 17, marginHorizontal: 15, color: 'black' }}>{Data1?.ritu}</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 17, marginHorizontal: 15, color: 'black' }}>Ayana</Text>
                            <Text style={{ fontSize: 17, marginHorizontal: 15, color: 'black' }}>{Data1?.ayana}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', backgroundColor: colors.yellow_color1, padding: 8, justifyContent: 'space-around', alignItems: 'center' }}>
                        <View>
                            <Text style={{ fontSize: 17, marginHorizontal: 15, color: 'black' }}>Disha Shool</Text>
                            <Text style={{ fontSize: 17, marginHorizontal: 15, color: 'black' }}>{Data1?.disha_shool}</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 17, marginHorizontal: 15, color: 'black' }}>Moon Niwas</Text>
                            <Text style={{ fontSize: 17, marginHorizontal: 15, color: 'black' }}>{Data1?.moon_nivas}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontSize: 22, marginHorizontal: 15, fontweight: 'bold', marginTop: 8, color: 'black' }}>Auspicious Timing</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <View style={{
                            backgroundColor: colors.green_color2,
                            padding: 16, justifyContent: 'center',
                            width: "90%", alignItems: 'center', borderRadius: 15, marginVertical: 15
                        }}>
                            <Text style={{ fontSize: 17, marginHorizontal: 15, color: 'black' }}>Abhijit Muhurat</Text>
                            <Text style={{ fontSize: 17, marginHorizontal: 15, color: 'black' }}>{Data1?.abhijit_muhurta?.start} to {Data1?.abhijit_muhurta?.end}</Text>
                        </View>
                    </View>

                </View>
            </ScrollView>

        </View>


    );
};

export default TommorowPanchang;
const Styles = StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 5,
        justifyContent: 'space-around',
        height: 20,
        width: "85%",
        fontSize: 28
    },
    text: {
        color: 'black',
        marginHorizontal: 10,
        padding: 10,
        fontSize: 16,
        flex: 1
    },
    container1: {
        flex: 0,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 5,
        justifyContent: 'space-around',
        backgroundColor: colors.background_theme2,
        height: 20,
        width: "85%",
        fontSize: 28
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});

// <View style={{ backgroundColor: 'white', flex: 1,alignItems:'center',}}>
//     <View  style={[Styles.container1,{backgroundColor:"orange", marginTop:50 }]}>
//         <Text Style={Styles.text}>{t("day")}</Text>
//         <Text Style={Styles.text}>{Data1?.day}</Text>
//     </View>
//     <View style={Styles.container}>
//         <Text Style={Styles.text}>{t("tithi")}</Text>
//         <Text Style={Styles.text}>{Data1?.tithi}</Text>
//     </View>
//     <View  style={[Styles.container1,{backgroundColor:"lightgreen"}]}>
//         <Text Style={Styles.text}>{t("yog")}</Text>
//         <Text Style={Styles.text}>{Data1?.yog}</Text>
//     </View>
//     <View style={Styles.container}>
//         <Text Style={Styles.text}>{t("Nakshatra")}</Text>
//         <Text Style={Styles.text}>{Data1?.nakshatra}</Text>
//     </View>
//     <View  style={[Styles.container1,{backgroundColor:"skyblue"}]}>
//         <Text Style={Styles.text}>{t("karan")}</Text>
//         <Text Style={Styles.text}>{Data1?.karan}</Text>
//     </View>
//     <View style={Styles.container}>
//         <Text Style={Styles.text}>{t("sunrise")}</Text>
//         <Text Style={Styles.text}>{Data1?.sunrise}</Text>
//     </View>
//     <View  style={[Styles.container1,{backgroundColor:"lightblue"}]}>
//         <Text Style={Styles.text}>{t("sunset")}</Text>
//         <Text Style={Styles.text}>{Data1?.sunset}</Text>
//     </View>
// </View>