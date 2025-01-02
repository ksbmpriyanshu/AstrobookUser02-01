import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions } from "react-native";
import MyHeader from "../../components/MyHeader";
import { useTranslation } from "react-i18next";
import { colors, getFontSize } from "../../config/Constants1";
import NetInfo from '@react-native-community/netinfo';
import AutoScrolling from 'react-native-auto-scrolling';
import TextTicker from 'react-native-text-ticker'

const { width, height } = Dimensions.get('screen');



const Year = (props) => {


    const { t } = useTranslation();

    const data = [
        {
            id: '1',
            images: require('../../assets/images/icons_2024/1.png'),
            text: t("numerology"),
            name: 'numerology',
            type: 'NUMEROLOGY'
        },
        {
            id: '2',
            images: require('../../assets/images/icons_2024/2.png'),
            text: t("vivah"),
            name: 'vivah',
            type: 'VIVAH'
        },
        {
            id: '3',
            images: require('../../assets/images/icons_2024/23.png'),
            text: t("mundan"),
            name: 'mundan',
            type: 'MUNDAN'
        },
        {
            id: '4',
            images: require('../../assets/images/icons_2024/3.png'),
            text: t("annaprashan"),
            name: 'annaprashan',
            type: 'ANNAPRASHAN'
        },
        {
            id: '5',
            images: require('../../assets/images/icons_2024/4.png'),
            text: t("vidyarambh"),
            name: 'vidyarambh',
            type: 'VIDYARAMBH'
        },
        {
            id: '6',
            images: require('../../assets/images/icons_2024/6.png'),
            text: t("karnavedha"),
            name: 'karnavedha',
            type: 'KARNAVEDHA'
        },
        {
            id: '7',
            images: require('../../assets/images/icons_2024/5.png'),
            text: t("dev"),
            name: 'dev',
            type: 'DEV_PRATISHTHA'
        },
        {
            id: '8',
            images: require('../../assets/images/icons_2024/7.png'),
            text: t("griha"),
            name: 'griha',
            type: 'GRIHA_PRAVESH'
        },
        {
            id: '9',
            images: require('../../assets/images/icons_2024/8.png'),
            text: t("griha1"),
            name: 'griha_nivaran',
            type: 'GRAHA_ROG_NIVARAN'
        },
        {
            id: '10',
            images: require('../../assets/images/icons_2024/9.png'),
            text: t("solar"),
            name: 'sun_graha',
            type: 'SOLAR_ECLIPS'
        },
        {
            id: '11',
            images: require('../../assets/images/icons_2024/10.png'),
            text: t("lunar"),
            name: 'chandra_graha',
            type: 'LUNAR_ECLIPS'
        },
        {
            id: '12',
            images: require('../../assets/images/icons_2024/11.png'),
            text: t("rahu_kaal"),
            name: 'rahu_kal',
            type: 'RAHU_KAAL'
        },
        {
            id: '13',
            images: require('../../assets/images/icons_2024/12.png'),
            text: t("kaalsarpa"),
            name: 'kalsharp_dosha',
            type: 'KAALSARPA_DOSH'
        },
        {
            id: '14',
            images: require('../../assets/images/icons_2024/13.png'),
            text: t("learn_astrology"),
            name: 'astrologer',
            type: 'LEARN_ASTROLOGY'
        },
        {
            id: '15',
            images: require('../../assets/images/icons_2024/14.png'),
            text: t("astrokunj_prediction"),
            name: 'astrokunj_prediction',
            type: 'ASTROKUNJ_BHAVISHYAVANI'
        },
        {
            id: '16',
            images: require('../../assets/images/icons_2024/15.png'),
            text: t("nivesh"),
            name: 'nivesh',
            type: 'SHARE_MARKET'
        },
        {
            id: '17',
            images: require('../../assets/images/icons_2024/16.png'),
            text: t("pancha_deity"),
            name: 'pancha',
            type: 'PANCHA_DEVTA'
        },
        {
            id: '18',
            images: require('../../assets/images/icons_2024/17.png'),
            text: t("sri_harivishnu"),
            name: 'harivishnu',
            type: 'SHRI_HARIVISHNU',
        },
        {
            id: '19',
            images: require('../../assets/images/icons_2024/18.png'),
            text: t("ten_mahavidyas"),
            name: 'mahavidyas',
            type: 'MAHAVIDYAS',
        },
        {
            id: '20',
            images: require('../../assets/images/icons_2024/19.png'),
            text: t("mahamrityunjaya_shiva"),
            name: 'mahamrityunjaya_shiva',
            type: 'MAHAMRI',
        },
        {
            id: '21',
            images: require('../../assets/images/icons_2024/20.png'),
            text: t("brahma_vidya"),
            name: 'brahma_vidya',
            type: 'BRAHMA_VIDYA',
        },
        {
            id: '22',
            images: require('../../assets/images/icons_2024/21.png'),
            text: t("shri_hanumat_mahavir"),
            name: 'shri_hanumat_mahavir',
            type: 'SHRI_HANUMAT_MAHAVIR',
        },
        {
            id: '23',
            images: require('../../assets/images/icons_2024/22.png'),
            text: t("yog_M"),
            name: 'yog',
            type: 'YOG',
        },

    ];


    useEffect(() => {

        props.navigation.setOptions({
            header: () => (
                <MyHeader
                    title={t("astro_companion")}
                    socialIcons={false}
                    navigation={props.navigation}
                    statusBar={{
                        backgroundColor: colors.background_theme2,
                        barStyle: 'light-content',
                    }}
                />
            ),
        });

    }, []);

    useEffect(() => {
        const removeNetInfoSubscription = NetInfo.addEventListener(state => {
            const conn = state.isConnected; //boolean value whether internet connected or not
            console.log("Connection type", state.type); //gives the connection type
            !conn ? alert("No Internet Connection!") : null; //alert if internet not connected
        });

        return () => removeNetInfoSubscription();
    });

    const get_horoscope_data = (item) => {
        props.navigation.navigate('yeardocuments', { select: item?.name, head: item?.text, type: item?.type });
    }

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <FlatList
                    data={data}
                    keyExtractor={item => item.id.toString()}
                    numColumns={3}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => get_horoscope_data(item)} style={styles.button}>
                            <Image source={item.images} style={styles.imgage} />

                            <Text allowFontScaling={false}

                                style={styles.text}
                            >
                                {item.text}
                            </Text>

                        </TouchableOpacity>
                    )}
                />

            </View>
        </View>
    )
}


export default Year;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 4
    },
    row: {

        flex: 1,
        width: '95%',
        alignSelf: 'center',
        marginVertical: 20,
    },
    imgage: {
        width: width * 0.15,
        height: width * 0.15,
        resizeMode: 'contain',

    },
    button: {
        width: width * 0.28,
        height: width * 0.28,
        backgroundColor: colors.background_theme1,
        margin: width * 0.018,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        shadowColor: colors.black_color2,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        overflow: 'hidden'

    },
    text: {
        fontSize: getFontSize(1.4),
        fontWeight: '700',
        textAlign: 'center',
        width: '100%'
    },
    scrolling2: {



    },
})