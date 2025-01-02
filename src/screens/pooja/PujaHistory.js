import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import MyStatusBar from '../../components/MyStatusbar'
import { Colors, Sizes, Fonts } from '../../assets/style'
import MyHeader from '../../components/MyHeader'
import { FlatList } from 'react-native'
import { showNumber } from '../../utils/services'
import * as AstromallActions from '../../redux/actions/astromallActions'
import { colors, getFontSize } from '../../config/Constants1'
import { api_url, base_url, img_url } from '../../config/constants'
import * as PoojaActions from '../../redux/actions/PoojaActions';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
import Carousel from 'react-native-reanimated-carousel'
import * as HomeActions from '../../redux/actions/HomeActions'
import * as actionType from "../../redux/actionTypes"
import { useNavigation } from '@react-navigation/native'

const PujaHistory = ({ route, dispatch, newPoojaData, customerData, bookpujaHistoryData, HistorypoojaData }) => {

    const [toggle, setToggle] = useState(false);
    const poojaData = route?.params
    const navigation = useNavigation()
    console.log("poojaData22", bookpujaHistoryData)
    useEffect(() => {
        dispatch(HomeActions.getHomeData());
        dispatch(PoojaActions.getNewPoojaData())
        dispatch(PoojaActions.getBookPoojaHistory(customerData))
        dispatch(PoojaActions.setBookPoojaHistory())
        dispatch(PoojaActions.getHistoryPuja())
    }, [dispatch])

    console.log("HistorypoojaData", HistorypoojaData);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white, }}>
            <MyStatusBar backgroundColor={"#ddd"} barStyle={'dark-content'} />
            <MyHeader title={"Puja History"}  navigation={navigation}/>



            {PujaHistoryUi()}

        </View>
    )

    function PujaHistoryUi() {
        // const images = {
        //     samagri: require('../../assets/images/calendar.png'),

        // };

        // const DATA = [
        //     { id: '1', image: images.samagri, title: 'Samagri', },
        //     { id: '2', image: images.samagri, title: 'Flowers', },
        //     { id: '3', image: images.samagri, title: 'Heart', },
        //     { id: '4', image: images.samagri, title: 'Chocolates', },
        //     { id: '5', image: images.samagri, title: 'Clove', },
        //     { id: '6', image: images.samagri, title: 'Sweets', },
        // ];

        const renderItem = ({ item }) => {
            return (
                <View

                    style={{ borderWidth: 1, width: SCREEN_WIDTH * 0.95, borderRadius: 10, alignItems: "center", borderColor: '#DFDFDF', elevation1: 10, marginVertical: SCREEN_HEIGHT * 0.01, overflow: "hidden", margin: SCREEN_HEIGHT * 0.01 }}>

                    <View style={{ width: SCREEN_WIDTH * 0.95, height: SCREEN_HEIGHT * 0.2, alignItems: "center", justifyContent: "center" }}>
                        <Image
                            style={{ width: SCREEN_WIDTH * 0.95, height: SCREEN_HEIGHT * 0.2, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                            source={{ uri: img_url +  item?.pujaId?.image}}>

                        </Image>

                    </View>

                    <View style={{ paddingTop: SCREEN_HEIGHT * 0.01, width: SCREEN_WIDTH * 0.95, paddingHorizontal: SCREEN_WIDTH * 0.03, justifyContent: "center" }}>
                        <Text style={{ ...Fonts.black11InterMedium, fontSize: 13, color: colors.black_color9, }}>{item?.pujaId?.pujaName}</Text>
                        <Text style={{ ...Fonts.black11InterMedium, fontSize: 13, color: colors.black_color9, }}> {item?.pujaId?.message}</Text>
                    </View>


                    

                </View>


            )
        }
        return (
            <View >
                <FlatList
                    data={HistorypoojaData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id} />


            </View>
        )
    }

}



const styles = StyleSheet.create({
    header: {
        backgroundColor: "#F3604C",
        paddingVertical: SCREEN_HEIGHT * 0.02,
        flexDirection: "row",
        paddingHorizontal: SCREEN_WIDTH * 0.06
    },
    dt: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        borderBottomWidth: 1.9,
        borderBlockColor: "#D3D3D3",
        paddingRight: SCREEN_WIDTH * 0.03
    },
    button: {
        backgroundColor: "white",
        paddingHorizontal: SCREEN_WIDTH * 0.1,
        borderRadius: 100,
        paddingVertical: SCREEN_WIDTH * 0.016
    },
    list: {
        flex: 1,
        // alignItems: "center", 
        marginTop: "3%",
        gap: 18
    },
    banner: {
        marginBottom: 10,
        flexDirection: "row",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        // borderRadius: 10
    },
    carouselItem: {
        // marginHorizontal: 10,
        // borderRadius: 10,
        // overflow: 'hidden', 
    },
    box: {
        paddingVertical: SCREEN_HEIGHT * 0.03,
        paddingHorizontal: SCREEN_WIDTH * 0.08,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        backgroundColor: "#F3604C",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    btn: {
        backgroundColor: "white",
        paddingVertical: SCREEN_WIDTH * 0.016,
        paddingHorizontal: SCREEN_WIDTH * 0.03,
        borderRadius: 100
    }
})


const mapStateToProps = state => ({
    newPoojaData: state.pooja.newPoojaData,
    bookpujaHistoryData: state.pooja.newPoojaData,
    customerData: state.customer.customerData,
    bookpujaHistoryData: state.pooja.bookpujaHistoryData,
    HistorypoojaData: state.pooja.HistorypoojaData
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(PujaHistory);

