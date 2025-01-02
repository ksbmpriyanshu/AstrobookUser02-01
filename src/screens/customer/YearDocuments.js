import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, Image, Linking } from "react-native";
import axios from "axios";
import { api_url, app_year, colors, img_url_page, getFontSize } from "../../config/Constants1";
import { useTranslation } from "react-i18next";
import MyHeader from "../../components/MyHeader";
import MyLoader from "../../components/MyLoader";
import Carousel from 'react-native-reanimated-carousel';
import * as HomeActions from '../../redux/actions/HomeActions'
import { connect } from "react-redux";
import { base_url } from "../../config/constants";
import { Colors, Sizes, Fonts } from "../../assets/style";
import RenderHtml from 'react-native-render-html';
import { SCREEN_WIDTH } from "../../config/Screen";
import { useFocusEffect } from "@react-navigation/native";

const { width, height } = Dimensions.get('screen');

const YearDoucments = ({ route, navigation, dispatch, companionData, isLoading }) => {

    const { t } = useTranslation();

    useEffect(() => {
        dispatch(HomeActions.getAstroCompanionData(route?.params?.type))
    }, [dispatch]);

    useFocusEffect(
        React.useCallback(() => {
            return () => dispatch(HomeActions.setAstroCompanionData(null)); // Or set to initial state
        }, [])
    );


    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.button} key={index}>
                <Text allowFontScaling={false}

                    style={{
                        textAlign: 'center',
                        fontSize: 24,
                        color: 'black',
                        fontWeight: 'bold',
                        padding: 6,
                        borderRadius: 10
                    }}>{item.title}</Text>
                <Text allowFontScaling={false}

                    style={{ color: 'black', fontSize: 16, textAlign: 'justify' }}>
                    {item.description}
                </Text>

            </View>
        )
    };

    const banner_redirect = (item) => {
        console.log('asdfas', item)
        if (item?.youtube != null) {
            Linking.openURL(item.youtube);
        }
    }

    return (
        <View style={{ backgroundColor: Colors.white, flex: 1 }} >
            <MyLoader isVisible={isLoading} />
            <MyHeader title={route.params?.head} navigation={navigation} />
            <View style={{ flex: 1 }}>
                <FlatList ListHeaderComponent={<>
                    {companionData && bnnnerInfo()}
                    {companionData && titleAndDescriptionInfo()}
                </>} />
            </View>
        </View>
    )

    function titleAndDescriptionInfo() {
        return (
            <View style={styles.button}>
                <Text allowFontScaling={false}

                    style={{
                        ...Fonts.black18RobotoMedium
                    }}>{companionData?.title}</Text>
                <RenderHtml
                    contentWidth={SCREEN_WIDTH}
                    source={{
                        html: `<div style="color: black; max-width: 320px;">${companionData?.description}</div>`,
                    }}
                />
            </View>
        )
    }

    function bnnnerInfo() {
        const rednerItem = ({ index, item }) => {
            return (
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => banner_redirect(item)}
                    style={{
                        flex: 1,
                        // borderWidth: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Image
                        source={{ uri: base_url + item }}
                        style={{ width: width * 0.95, height: width / 3.5, borderRadius: 10 }}
                        resizeMode="stretch"
                    />
                </TouchableOpacity>
            );
        };
        return (
            <View style={{ marginTop: Sizes.fixPadding }}>
                <Carousel
                    loop
                    width={width}
                    height={width / 3.6}
                    autoPlay={true}
                    data={companionData?.images}
                    scrollAnimationDuration={1500}
                    autoPlayInterval={5000}
                    // onSnapToItem={index => console.log('current index:', index)}
                    renderItem={rednerItem}
                />
            </View>
        )
    }

};

const mapStateToProps = state => ({
    companionData: state.home.companionData,
    isLoading: state.setting.isLoading
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(YearDoucments);

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
        width: width * 0.9,
        padding: 5,
        backgroundColor: colors.background_theme1,
        margin: 1,
        borderRadius: 5,
        shadowColor: colors.black_color2,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
})