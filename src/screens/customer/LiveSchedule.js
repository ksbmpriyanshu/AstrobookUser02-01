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
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { api_url, base_url, blog, colors, fonts, get_live_list, getFontSize, user_live_schedule } from '../../config/Constants1';
import { useEffect } from 'react';
import HomeHeader from '../../components/HomeHeader';
import MyHeader from '../../components/MyHeader';
import { useState } from 'react';
import axios from 'axios';
import MyLoader from '../../components/MyLoader';
import { connect } from 'react-redux';
import moment from 'moment/moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import { warnign_toast } from '../../components/MyToastMessage';
import { useTranslation } from 'react-i18next';
const { width, height } = Dimensions.get('screen');

const Tab = createMaterialTopTabNavigator();

const AstroLive = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [livelist, setLivelist] = useState(null);
    const { t } = useTranslation();


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



    useEffect(() => {
        console.log('heeee');
        get_blogs();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            get_blogs();
        }, [])
    );

    const get_blogs = async () => {

        setIsLoading(false);
        await axios({
            method: 'get',
            url: api_url + user_live_schedule,
        })
            .then(res => {

                setIsLoading(false);
                console.log(res.data.data);
                setLivelist(res.data.data);
            })
            .catch(err => {

                setIsLoading(false);
                console.log('das', err);
            });
    };

    const han = (liveId, astroId, data) => {

        if (props.customerData.username != null) {
            // props.navigation.navigate('goLive', {
            //     liveID: liveId,
            //     astro_id: astroId,
            //     userID: props.customerData.id,
            //     userName: props.customerData.username,
            //     astroData: data
            // })
        }
        else {
            warnign_toast("Please Update Customer Account.");
        }

    }

    const renderItems = ({ item, index }) => {
        console.log('aaa==', item.astro_name);
        <View style={{}}>
            <Text allowFontScaling={false} style={{ color: 'black' }}>asdfa</Text>
        </View>


    };

    const _listEmptyComponent = () => {
        return (
            <View style={{ alignSelf: 'center', marginTop: 50 }}>
                <Text allowFontScaling={false} style={{ color: '#000' }}>No Data Available</Text>
                {/* <Image  source={require('../../assets/images/icon/novideo.png')} 
                style={{width:300,height:300,borderRadius:20}}/> */}
            </View>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.black_color1 }}>
            <MyStatusBar
                backgroundColor={colors.background_theme2}
                barStyle="light-content"
            />
            <MyLoader isVisible={isLoading} />
            <View style={{ flex: 1 }}>

                {livelist && (
                    livelist.map((item, index) => (
                        <TouchableOpacity
                            activeOpacity={0.9} // Set the active opacity level here
                            onPress={() => han(item.live_id, item.user_id, item)}
                            key={index}
                            style={{
                                flex: 0,
                                width: width *0.9,
                                borderRadius: 5,
                                marginVertical: 10,
                                shadowColor: colors.black_color5,
                                shadowOffset: { width: 2, height: 1 },
                                shadowOpacity: 0.1,
                                shadowRadius: 10,
                                zIndex: 100,
                                marginHorizontal: 20,
                              
                            }}
                        >
                            <View style={{ borderRadius: 10, borderColor: '#ddd', backgroundColor: colors.background_theme2,  flexDirection:'row' }}>
                                <View style={{
                                    height: 150,
                                    alignItems: 'center'
                                }}>
                                    <Image
                                        source={{ uri: item.img_url }}
                                        style={{
                                            width: width * 0.25,
                                            height: width * 0.25,
                                            borderRadius: 100,
                                            borderWidth: 0.5,
                                            borderColor: colors.white_color,
                                            marginTop: 10
                                        }}
                                    />
                                    <View style={{}}>
                                        <Text allowFontScaling={false}
                                            style={{
                                                fontSize: getFontSize(1.6),
                                                color: colors.black_color9,
                                                fontFamily: fonts.semi_bold,
                                                paddingRight: 10,
                                                textAlign: 'center',
                                                fontWeight:'bold'
                                            }}
                                        >
                                            {item.astro_name}
                                        </Text>
                                        <View style={{
                                            flex: 0.9,
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            
                                        }}>


                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                )}

            </View>
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
